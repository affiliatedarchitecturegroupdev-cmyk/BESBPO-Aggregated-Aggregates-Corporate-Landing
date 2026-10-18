import clsx from "clsx";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import type { ReactNode } from "react";
import { storeLink } from "@/lib/store";

export function Eyebrow({ children, tone = "blue", className }: { children: ReactNode; tone?: "blue" | "gold" | "light"; className?: string }) {
  return (
    <p className={clsx("eyebrow", tone === "blue" && "text-seam-blue", tone === "gold" && "text-ochre-gold", tone === "light" && "text-limestone/70", className)}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "dark",
  align = "left",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  children?: ReactNode;
}) {
  return (
    <div className={clsx("flex flex-wrap items-end justify-between gap-6", align === "center" && "flex-col items-center text-center")}>
      <div className={clsx("max-w-3xl", align === "center" && "mx-auto")}>
        <Eyebrow tone={tone === "light" ? "gold" : "blue"}>{eyebrow}</Eyebrow>
        <h2 className={clsx("mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl", tone === "light" ? "text-limestone" : "text-basalt")}>{title}</h2>
        {lede && <p className={clsx("mt-4 text-base leading-relaxed md:text-lg", tone === "light" ? "text-limestone/75" : "text-slate")}>{lede}</p>}
      </div>
      {children}
    </div>
  );
}

/** The primary call to action everywhere: open the e-commerce store. */
export function LaunchStoreButton({
  placement,
  path = "/",
  label = "Launch Store",
  size = "md",
  className,
}: {
  placement: string;
  path?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <a
      href={storeLink(path, placement)}
      className={clsx(
        "group inline-flex items-center justify-center gap-2 rounded-sm bg-ochre-gold font-body font-semibold text-basalt shadow-[0_8px_24px_-12px_rgba(192,138,52,0.9)] transition hover:-translate-y-0.5 hover:bg-[#cf9a43]",
        size === "sm" && "px-3.5 py-2 text-sm",
        size === "md" && "px-5 py-2.5 text-sm",
        size === "lg" && "px-7 py-3.5 text-base",
        className,
      )}
    >
      <ShoppingCart className={clsx(size === "lg" ? "h-5 w-5" : "h-4 w-4")} aria-hidden />
      {label}
      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </a>
  );
}

export function StoreLink({
  placement,
  path,
  children,
  variant = "outline",
  className,
}: {
  placement: string;
  path: string;
  children: ReactNode;
  variant?: "outline" | "outline-light" | "text" | "text-light";
  className?: string;
}) {
  return (
    <a
      href={storeLink(path, placement)}
      className={clsx(
        "group inline-flex items-center gap-1.5 font-body text-sm font-semibold transition",
        variant === "outline" && "rounded-sm border border-basalt/20 px-5 py-2.5 text-basalt hover:border-seam-blue hover:text-seam-blue",
        variant === "outline-light" && "rounded-sm border border-limestone/40 px-5 py-2.5 text-limestone hover:border-ochre-gold hover:text-ochre-gold",
        variant === "text" && "text-seam-blue hover:text-basalt",
        variant === "text-light" && "text-ochre-gold hover:text-limestone",
        className,
      )}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </a>
  );
}
