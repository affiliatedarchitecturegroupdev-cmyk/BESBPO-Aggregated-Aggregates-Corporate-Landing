import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { DepartmentIcon } from "@/components/DepartmentIcon";
import { Reveal } from "@/components/Reveal";
import { LaunchStoreButton, StoreLink } from "@/components/ui";
import { DEPARTMENT_GROUPS } from "@/data/site";
import { STORE, findDepartment, formatNumber, formatZAR, storeLink } from "@/lib/store";

/** Category illustrations from the original corporate site (cross-sections; the gold layer is the category's own). */
const CATEGORY_ART = new Set([
  "agricultural-industrial", "ballast-rail", "cement-hydraulic-binders", "crushed-stone", "crusher-run-road-building", "decorative-landscaping",
  "drainage-filter", "mesh-brickforce", "mortars-grouts-admixtures", "ready-mix-concrete", "recycled-sustainable", "reinforcing-bar",
  "sand-fine-aggregates", "steel-fixing-accessories", "structural-steel", "sub-base-base-course",
]);

export const dynamicParams = false;

export function generateStaticParams() {
  return STORE.departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = findDepartment((await params).slug);
  if (!d) return {};
  return { title: d.name, description: d.blurb, alternates: { canonical: `/departments/${d.slug}/` } };
}

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = findDepartment((await params).slug);
  if (!d) notFound();
  const group = DEPARTMENT_GROUPS.find((g) => (g.slugs as readonly string[]).includes(d.slug));
  const siblings = STORE.departments.filter((x) => x.slug !== d.slug && (group?.slugs as readonly string[] | undefined)?.includes(x.slug));

  return (
    <>
      <section className="relative overflow-hidden bg-basalt text-limestone">
        <div className="grain absolute inset-0 opacity-10" aria-hidden />
        <div className="container-site relative py-16 md:py-20">
          <Link href="/departments/" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-limestone/60 hover:text-ochre-gold">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All departments{group ? ` · ${group.label}` : ""}
          </Link>
          <div className="mt-6 flex items-start gap-5">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-ochre-gold text-basalt sm:flex">
              <DepartmentIcon slug={d.slug} className="h-7 w-7" />
            </span>
            <div>
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">{d.name}</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-limestone/75 md:text-lg">{d.blurb}</p>
            </div>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <Stat label="Products" value={formatNumber(d.products)} />
            <Stat label="Categories" value={String(d.categories.length)} />
            <Stat label="Priced to buy online" value={formatNumber(d.buyOnline)} />
            {d.fromPrice !== null && <Stat label="From" value={formatZAR(d.fromPrice)} />}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <LaunchStoreButton placement={`department_${d.slug}`} path={d.storePath} size="lg" label={`Shop ${d.shortName}`} />
            <StoreLink placement={`department_${d.slug}_quote`} path="/quote" variant="outline-light">
              Request a quote
            </StoreLink>
          </div>
        </div>
        <div className="strata h-8 opacity-80" aria-hidden />
      </section>

      <section className="container-site py-16">
        <p className="eyebrow text-seam-blue">{d.categories.length} categories</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {d.categories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 0.06}>
              <a
                href={storeLink(c.storePath, `department_${d.slug}_category`)}
                className="group flex h-full overflow-hidden rounded-sm border border-basalt/10 bg-white transition hover:border-seam-blue/40 hover:shadow-[0_18px_40px_-24px_rgba(28,27,26,0.45)]"
              >
                {CATEGORY_ART.has(c.slug) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/assets/category-art/${c.slug}.svg`} alt="" className="hidden w-40 shrink-0 object-cover sm:block" loading="lazy" />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-lg font-semibold group-hover:text-seam-blue">{c.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{c.description}</p>
                  <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-seam-blue">
                    {formatNumber(c.products)} products
                    {c.buyOnline > 0 ? ` · ${c.buyOnline} online` : " · on quote"}
                    {c.fromPrice !== null && ` · from ${formatZAR(c.fromPrice)}`}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate">
          Prices shown are the store&apos;s retail list prices including VAT; trade and volume accounts pay less. Products without a confirmed price are quoted with the
          supplier.
        </p>
      </section>

      {siblings.length > 0 && (
        <section className="border-t border-basalt/10 bg-white">
          <div className="container-site py-14">
            <p className="eyebrow text-seam-blue">Also in {group?.label}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {siblings.map((s) => (
                <Link key={s.slug} href={`/departments/${s.slug}/`} className="inline-flex items-center gap-2 rounded-full border border-basalt/15 px-4 py-2 text-sm hover:border-seam-blue hover:text-seam-blue">
                  <DepartmentIcon slug={s.slug} className="h-4 w-4" /> {s.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand placement={`department_${d.slug}_cta`} />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-limestone/55">{label}</dt>
      <dd className="mt-1 font-display text-3xl font-bold">{value}</dd>
    </div>
  );
}
