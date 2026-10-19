import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DepartmentIcon } from "@/components/DepartmentIcon";
import { formatNumber, formatZAR, type Department } from "@/lib/store";

export function DepartmentCard({ department }: { department: Department }) {
  const d = department;
  return (
    <Link
      href={`/departments/${d.slug}/`}
      className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-basalt/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-seam-blue/40 hover:shadow-[0_18px_40px_-24px_rgba(28,27,26,0.45)]"
    >
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-ochre-gold transition duration-500 group-hover:scale-x-100" aria-hidden />
      <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-limestone text-seam-blue transition group-hover:bg-seam-blue group-hover:text-limestone">
        <DepartmentIcon slug={d.slug} className="h-5 w-5" />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold text-basalt">{d.name}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate">{d.blurb}</p>
      <p className="mt-auto flex items-end justify-between gap-3 pt-6">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-seam-blue">
          {formatNumber(d.products)} products
          {d.buyOnline > 0 && <> · {d.buyOnline} online</>}
          {d.fromPrice !== null && <> · from {formatZAR(d.fromPrice)}</>}
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 text-seam-blue transition group-hover:translate-x-1" aria-hidden />
      </p>
    </Link>
  );
}
