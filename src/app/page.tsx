import { ArrowRight, Building2, Factory, HardHat, Home as HomeIcon } from "lucide-react";
import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { CtaBand } from "@/components/CtaBand";
import { DepartmentCard } from "@/components/DepartmentCard";
import { FaqList } from "@/components/FaqList";
import { HeroCarousel, type HeroSlide } from "@/components/HeroCarousel";
import { Reveal } from "@/components/Reveal";
import { LaunchStoreButton, SectionHeading, StoreLink } from "@/components/ui";
import { ABOUT, AUDIENCES, BUSINESS_LINES, DEPARTMENT_GROUPS, GROUP_DIVISIONS, HOW_IT_WORKS, PROJECT_TOOLS, STANDARDS } from "@/data/site";
import { image } from "@/lib/images";
import { STORE, formatNumber } from "@/lib/store";

const { totals } = STORE;

const SLIDES: HeroSlide[] = [
  {
    eyebrow: "Foundations to roof · SANS graded",
    title: "Every Layer Starts Here.",
    body: `Aggregates and sand, cement and ready-mix, steel, bricks and blocks, paving, drainage, roofing, timber and building supplies — ${formatNumber(totals.products)} products, delivered from the approved partner supplier nearest your site.`,
    image: image("quarry-vehicle"),
    secondary: { label: "Explore the departments", href: "/departments/" },
  },
  {
    eyebrow: "Cement, ready-mix & steel",
    title: "Cement, concrete and steel on one order.",
    body: "Bagged and bulk cement, SANS 878 ready-mix by the mixer truck with pumps on request, and reinforcing and structural steel with cut & bend to your schedule.",
    image: image("rebar-cage"),
    storePath: "/ready-mix",
    secondary: { label: "Cement & concrete", href: "/departments/cement-concrete/" },
  },
  {
    eyebrow: "Building supplies",
    title: "Finish the build with the same order.",
    body: "Doors and windows, fencing, plumbing, bathrooms and kitchens, electrical and solar, ceilings, tiles and flooring, hardware, boards and formwork.",
    image: image("sand-pile-construction"),
    storePath: "/departments",
    secondary: { label: "See building supplies", href: "/departments/#building-supplies" },
  },
  {
    eyebrow: "Contractors, developers & trade",
    title: "Built for projects, not just orders.",
    body: "Upload a bill of quantities, order on account with trade credit, and have one order delivered in stages that follow the build — each drop signed for on site.",
    image: image("tipper-truck-transit"),
    storePath: "/trade-accounts",
    secondary: { label: "Trade & projects", href: "/trade/" },
  },
  {
    eyebrow: "Plant hire & site services",
    title: "Machines, operators and haulage on the same platform.",
    body: "Wet-hire TLBs, excavators, tippers and rollers with operator, fuel and PPE, plus haulage, rubble removal and skips. Partners are paid after you sign the job off.",
    image: image("excavator-yellow"),
    storePath: "/plant-hire",
    secondary: { label: "Hire & services", href: "/services/" },
  },
];

const AUDIENCE_ICONS = [HardHat, Building2, Factory, HomeIcon];

export default function HomePage() {
  const faqs = [...STORE.faqs.materials.slice(0, 3), ...STORE.faqs.projects.slice(0, 3)];
  return (
    <>
      <HeroCarousel
        slides={SLIDES}
        stats={[
          { value: formatNumber(totals.products), label: "Products" },
          { value: String(totals.departments), label: "Departments" },
          { value: formatNumber(totals.buyOnline), label: "Priced to buy online" },
          { value: String(totals.provinces), label: "Provinces delivered" },
        ]}
      />

      {/* Who we supply */}
      <section className="container-site py-20">
        <SectionHeading
          eyebrow="Who we supply"
          title="One supplier for everyone who builds."
          lede="From a contractor pricing a civil job to a homeowner finishing an extension, the same range, the same delivery network and the pricing that fits how you buy."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((a, i) => {
            const Icon = AUDIENCE_ICONS[i];
            return (
              <Reveal key={a.title} delay={i * 0.06} className="rounded-sm border border-basalt/10 bg-white p-6">
                <Icon className="h-6 w-6 text-ochre-gold" aria-hidden strokeWidth={1.6} />
                <h3 className="mt-4 font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{a.body}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section className="bg-white">
        <div className="container-site grid gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <SectionHeading eyebrow="About us" title="The first link in the build chain." lede={ABOUT.lede} />
            <p className="mt-4 text-base leading-relaxed text-slate">{ABOUT.model}</p>
            <Link href="/about/" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-seam-blue hover:text-basalt">
              More about us <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-basalt/10 bg-basalt/10">
            {[
              { value: totals.products, label: "Products in the range" },
              { value: totals.categories, label: "Product categories" },
              { value: totals.plant + totals.services, label: "Hire machines & site services" },
              { value: totals.coverageTowns, label: "Towns and cities served" },
            ].map((s) => (
              <div key={s.label} className="bg-limestone p-6 md:p-8">
                <dd className="font-display text-4xl font-bold text-seam-blue md:text-5xl">
                  <CountUp value={s.value} />
                </dd>
                <dt className="mt-2 text-sm text-slate">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Departments */}
      <section className="container-site py-20">
        <SectionHeading
          eyebrow="The range"
          title={`${totals.departments} departments, from the ground up.`}
          lede="Each department lists what's priced to buy online and what we quote. The counts come straight from the store."
        >
          <LaunchStoreButton placement="home_departments" path="/departments" label="Shop all departments" />
        </SectionHeading>
        {DEPARTMENT_GROUPS.map((group) => (
          <div key={group.label} className="mt-12">
            <p className="eyebrow flex items-center gap-3 text-slate">
              <span className="h-px w-8 bg-ochre-gold" aria-hidden />
              {group.label}
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.slugs.map((slug, i) => {
                const d = STORE.departments.find((x) => x.slug === slug);
                return d ? (
                  <Reveal key={slug} delay={(i % 3) * 0.06}>
                    <DepartmentCard department={d} />
                  </Reveal>
                ) : null;
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Business lines */}
      <section className="bg-basalt text-limestone">
        <div className="container-site py-20">
          <SectionHeading tone="light" eyebrow="What we do" title="One platform for the whole build." lede="Order online, send a bill of quantities, or book the machines — materials, hire, services and design under one account." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-limestone/10 sm:grid-cols-2 lg:grid-cols-3">
            {BUSINESS_LINES.map((line, i) => (
              <Reveal key={line.key} delay={(i % 3) * 0.06} className="flex flex-col bg-basalt p-7">
                <p className="eyebrow text-ochre-gold">{line.eyebrow}</p>
                <h3 className="mt-3 font-display text-xl font-semibold">{line.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-limestone/70">{line.body}</p>
                <StoreLink placement={`home_line_${line.key}`} path={line.storePath} variant="text-light" className="mt-6">
                  Open on the store
                </StoreLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Project tools */}
      <section className="container-site py-20">
        <SectionHeading
          eyebrow="Contractors, developers and trade"
          title="Built for projects, not just orders."
          lede="From the bill of quantities to the last signed delivery, run the whole job's materials through one supplier."
        >
          <Link href="/trade/" className="inline-flex items-center gap-1.5 font-semibold text-seam-blue hover:text-basalt">
            Trade & projects <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </SectionHeading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_TOOLS.map((tool, i) => (
            <Reveal key={tool.title} delay={(i % 3) * 0.06} className="flex flex-col rounded-sm border border-basalt/10 bg-white p-6">
              <span className="font-mono text-xs text-ochre-gold">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{tool.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{tool.body}</p>
              <StoreLink placement="home_project_tools" path={tool.storePath} variant="text" className="mt-5">
                {tool.cta}
              </StoreLink>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-basalt/10 bg-white">
        <div className="container-site grid gap-14 py-20 lg:grid-cols-2">
          {(
            [
              ["Materials", "From enquiry to delivery", HOW_IT_WORKS.materials],
              ["Plant hire & site services", "From booking to sign-off", HOW_IT_WORKS.hire],
            ] as const
          ).map(([eyebrow, title, steps]) => (
            <div key={eyebrow}>
              <SectionHeading eyebrow={eyebrow} title={title} />
              <ol className="mt-8 space-y-6">
                {steps.map((step, i) => (
                  <Reveal as="li" key={step.title} delay={i * 0.05} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-seam-blue/40 font-mono text-sm text-seam-blue">{i + 1}</span>
                    <div>
                      <p className="font-display font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate">{step.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Standards */}
      <section className="container-site py-20">
        <SectionHeading
          eyebrow="Standards"
          title="Supplied against a stated specification."
          lede="Every graded product page states its grading and specification. These are the standards our range is specified to."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STANDARDS.map((s, i) => (
            <Reveal key={s.code} delay={(i % 3) * 0.05} className="rounded-sm border-l-4 border-ochre-gold bg-white p-6">
              <p className="font-display text-xl font-bold text-seam-blue">{s.code}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{s.body}</p>
            </Reveal>
          ))}
        </div>
        <Link href="/partners/#sourcing" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-seam-blue hover:text-basalt">
          How we vet our suppliers <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>

      {/* Group */}
      <section className="bg-seam-blue text-limestone">
        <div className="container-site grid gap-10 py-20 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading
            tone="light"
            eyebrow="Besbpo Group"
            title="Part of a built-environment group."
            lede="Aggregated Aggregates sits with sister divisions that use the same material, machines and trucks."
          />
          <ul className="grid gap-px overflow-hidden rounded-sm bg-limestone/15 sm:grid-cols-2">
            {GROUP_DIVISIONS.map((g) => (
              <li key={g.name} className="bg-seam-blue p-5">
                <p className="font-display font-semibold">{g.name}</p>
                <p className="mt-1 text-sm text-limestone/70">{g.body}</p>
              </li>
            ))}
            <li className="bg-seam-blue p-5">
              <a href={STORE.contact.groupSiteUrl} className="group block h-full">
                <p className="font-display font-semibold text-ochre-gold">Besbpo Group</p>
                <p className="mt-1 text-sm text-limestone/70 group-hover:text-limestone">Visit the Group site →</p>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-site grid gap-10 py-20 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeading eyebrow="FAQ" title="Common questions." lede="The answers the store gives, word for word." />
          <Link href="/faq/" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-seam-blue hover:text-basalt">
            All questions <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <FaqList faqs={faqs} />
      </section>

      <CtaBand placement="home_cta" />
    </>
  );
}
