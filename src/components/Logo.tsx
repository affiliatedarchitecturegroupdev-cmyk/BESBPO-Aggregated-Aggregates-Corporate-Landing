import clsx from "clsx";

/** The brand mark (the strata pyramid from the logo files) with the wordmark set in the display face. */
export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const layer = tone === "light" ? "#F2EFE9" : "#2C4A5E";
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 140 120" className="h-8 w-9 shrink-0" aria-hidden>
        <rect x="6" y="100" width="128" height="15" rx="2" fill={layer} />
        <rect x="18" y="80" width="104" height="15" rx="2" fill={layer} opacity=".9" />
        <rect x="30" y="60" width="80" height="15" rx="2" fill={layer} opacity=".8" />
        <rect x="42" y="40" width="56" height="15" rx="2" fill={layer} opacity=".7" />
        <rect x="54" y="20" width="32" height="15" rx="2" fill="#C08A34" />
      </svg>
      <span className={clsx("font-display text-[15px] font-bold uppercase leading-[1.05] tracking-wide", tone === "light" ? "text-limestone" : "text-basalt")}>
        Aggregated
        <br />
        Aggregates
      </span>
    </span>
  );
}
