"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { LaunchStoreButton } from "@/components/ui";
import { NAV } from "@/data/site";
import { STORE, storeLink } from "@/lib/store";

const phone = STORE.contact.phones[0];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-[#141312] text-limestone/70 md:block">
        <div className="container-site flex h-8 items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.18em]">
          <span>A Besbpo Group division · Delivering nationwide</span>
          <span className="flex items-center gap-5">
            {phone && (
              <a href={`tel:${phone.tel}`} className="flex items-center gap-1.5 hover:text-ochre-gold">
                <Phone className="h-3 w-3" aria-hidden /> {phone.number}
              </a>
            )}
            <a href={storeLink("/quote", "topbar")} className="hover:text-ochre-gold">Request a quote</a>
          </span>
        </div>
      </div>
      <div className={clsx("border-b transition-colors duration-300", scrolled || open ? "border-limestone/10 bg-basalt/95 backdrop-blur-md" : "border-transparent bg-basalt")}>
        <div className="container-site flex h-16 items-center justify-between gap-4 md:h-[72px]">
          <Link href="/" aria-label="Aggregated Aggregates — home" className="shrink-0">
            <Logo />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = `${pathname ?? ""}/`.replace(/\/+$/, "/").startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "relative rounded-sm px-3 py-2 text-sm text-limestone/80 transition hover:text-limestone",
                    active && "text-limestone after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:bg-ochre-gold",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <LaunchStoreButton placement="header" size="sm" className="hidden sm:inline-flex" />
            <LaunchStoreButton placement="header_mobile" size="sm" label="Store" className="sm:hidden" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-limestone/20 text-limestone lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-limestone/10 lg:hidden"
            >
              <ul className="container-site space-y-1 py-4">
                {NAV.map((item, i) => (
                  <motion.li key={item.href} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.04 * i }}>
                    <Link href={item.href} className="block rounded-sm px-2 py-3 font-display text-lg text-limestone hover:bg-limestone/5">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <li className="pt-3">
                  <LaunchStoreButton placement="mobile_menu" size="lg" className="w-full" />
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
