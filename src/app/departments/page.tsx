import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { DepartmentCard } from "@/components/DepartmentCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { LaunchStoreButton, SectionHeading } from "@/components/ui";
import { DEPARTMENT_GROUPS } from "@/data/site";
import { image } from "@/lib/images";
import { STORE, formatNumber } from "@/lib/store";

export const metadata: Metadata = {
  title: "Departments",
  description: `${STORE.totals.departments} departments and ${STORE.totals.categories} categories: aggregates, cement and concrete, steel, walling, paving, drainage, roofing, timber and building supplies.`,
  alternates: { canonical: "/departments/" },
};

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-");

export default function DepartmentsPage() {
  const { totals } = STORE;
  return (
    <>
      <PageHero
        eyebrow="The range"
        title={`${totals.departments} departments, ${totals.categories} categories, ${formatNumber(totals.products)} products.`}
        lede="Laid out the way a build goes up: the ground and structure, the roof, then the supplies that finish the job. Every count on this page comes from the store."
        image={image("gravel-surface")}
      >
        <LaunchStoreButton placement="departments_hero" path="/departments" size="lg" label="Shop on the store" />
      </PageHero>
      {DEPARTMENT_GROUPS.map((group) => (
        <section key={group.label} id={slugify(group.label)} className="container-site scroll-mt-28 py-14 first-of-type:pt-20">
          <SectionHeading eyebrow={`${group.slugs.length} departments`} title={group.label} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.slugs.map((slug, i) => {
              const d = STORE.departments.find((x) => x.slug === slug);
              return d ? (
                <Reveal key={slug} delay={(i % 3) * 0.06}>
                  <DepartmentCard department={d} />
                </Reveal>
              ) : null;
            })}
          </div>
        </section>
      ))}
      <CtaBand placement="departments_cta" />
    </>
  );
}
