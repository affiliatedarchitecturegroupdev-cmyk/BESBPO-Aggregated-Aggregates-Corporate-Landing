import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LaunchStoreButton } from "@/components/ui";
import { NAV } from "@/data/site";
import { STORE, formatAddress, storeLink, whatsappLink } from "@/lib/store";

const { contact } = STORE;

const STORE_LINKS = [
  { path: "/departments", label: "All departments" },
  { path: "/buy-online", label: "Buy online" },
  { path: "/quote", label: "Request a quote" },
  { path: "/quote/boq", label: "Upload a bill of quantities" },
  { path: "/trade-accounts", label: "Trade accounts & credit" },
  { path: "/plant-hire", label: "Plant hire" },
  { path: "/aa-60-120", label: "AA 60/120 express" },
  { path: "/coverage", label: "Where we deliver" },
];

const LEGAL_LINKS = [
  { path: "/legal/privacy-policy", label: "Privacy policy" },
  { path: "/legal/terms-and-conditions", label: "Terms & conditions" },
  { path: "/legal/popia-notice", label: "POPIA notice" },
  { path: "/legal/paia-manual", label: "PAIA manual" },
  { path: "/legal/cookie-policy", label: "Cookie policy" },
];

export function Footer() {
  return (
    <footer className="bg-basalt text-limestone">
      <div className="strata h-10 opacity-70" aria-hidden />
      <div className="container-site grid gap-12 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-limestone/70">
            Every layer starts here. A specialised operating division of{" "}
            <a href={contact.groupSiteUrl} className="text-limestone underline-offset-4 hover:underline">
              Besbpo Group
            </a>
            , supplying the whole build from the approved partner supplier nearest your site.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-limestone/80">
            {contact.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="flex items-center gap-2 hover:text-ochre-gold">
                  <Phone className="h-4 w-4 text-ochre-gold" aria-hidden /> {p.number}
                </a>
              </li>
            ))}
            <li>
              <a href={whatsappLink()} className="flex items-center gap-2 hover:text-ochre-gold">
                <MessageCircle className="h-4 w-4 text-ochre-gold" aria-hidden /> WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.salesEmail}`} className="flex items-center gap-2 hover:text-ochre-gold">
                <Mail className="h-4 w-4 text-ochre-gold" aria-hidden /> {contact.salesEmail}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ochre-gold" aria-hidden /> {formatAddress()}
            </li>
          </ul>
          <LaunchStoreButton placement="footer" className="mt-7" />
        </div>
        <FooterColumn title="Explore">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-ochre-gold">{item.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/credits/" className="hover:text-ochre-gold">Photo credits</Link>
          </li>
        </FooterColumn>
        <FooterColumn title="On the store">
          {STORE_LINKS.map((l) => (
            <li key={l.path}>
              <a href={storeLink(l.path, "footer")} className="hover:text-ochre-gold">{l.label}</a>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title="Legal">
          {LEGAL_LINKS.map((l) => (
            <li key={l.path}>
              <a href={storeLink(l.path, "footer_legal")} className="hover:text-ochre-gold">{l.label}</a>
            </li>
          ))}
          <li className="pt-4">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-limestone/50">Follow Besbpo Group</p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {contact.social
                .filter((s) => s.platform !== "WhatsApp")
                .map((s) => (
                  <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-ochre-gold">
                    {s.platform}
                  </a>
                ))}
            </div>
          </li>
        </FooterColumn>
      </div>
      <div className="border-t border-limestone/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-limestone/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {contact.legalEntity.name} T/A {contact.legalEntity.tradingAs}. Registration number {contact.legalEntity.registrationNumber}.
          </p>
          <p>Registered office: {formatAddress()}.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-display text-sm font-semibold text-ochre-gold">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm text-limestone/75">{children}</ul>
    </div>
  );
}
