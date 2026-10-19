import Link from "next/link";
import { LaunchStoreButton } from "@/components/ui";
import { STORE, formatNumber } from "@/lib/store";

/** The closing call to action on every page: open the store, or talk to the team. */
export function CtaBand({ placement, title, body }: { placement: string; title?: string; body?: string }) {
  return (
    <section className="container-site py-16 md:py-20">
      <div className="relative overflow-hidden rounded-sm bg-seam-blue px-6 py-12 text-limestone md:px-12">
        <div className="grain absolute inset-0 opacity-20" aria-hidden />
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-ochre-gold">Ready to order?</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">{title ?? "The whole build, on one order."}</h2>
            <p className="mt-3 text-limestone/80">
              {body ??
                `${formatNumber(STORE.totals.products)} products across ${STORE.totals.departments} departments, priced online where we have a confirmed price and quoted fast where we don't.`}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LaunchStoreButton placement={placement} size="lg" />
            <Link href="/contact/" className="rounded-sm border border-limestone/40 px-6 py-3.5 font-semibold text-limestone transition hover:border-ochre-gold hover:text-ochre-gold">
              Talk to the team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
