import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { LaunchStoreButton, SectionHeading } from "@/components/ui";
import { ABOUT, AUDIENCES, GROUP_DIVISIONS, SEGMENTS } from "@/data/site";
import { image } from "@/lib/images";
import { STORE, formatNumber } from "@/lib/store";

export const metadata: Metadata = {
  title: "About us",
  description: "Aggregated Aggregates is a specialised operating division of Besbpo Group: one platform for the whole build, supplied through an approved partner network across South Africa.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  const { totals } = STORE;
  return (
    <>
      <PageHero eyebrow="About us" title="The first link in the build chain." lede={ABOUT.lede} image={image("stone-fragments")}>
        <LaunchStoreButton placement="about_hero" size="lg" />
      </PageHero>

      <section className="container-site grid gap-12 py-20 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="Our name" title="Aggregated, and aggregates." />
          <p className="mt-5 text-base leading-relaxed text-slate">{ABOUT.name}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionHeading eyebrow="How we work" title="A broker and a network." />
          <p className="mt-5 text-base leading-relaxed text-slate">{ABOUT.model}</p>
          <p className="mt-4 text-base leading-relaxed text-slate">
            Today that network covers {formatNumber(totals.products)} products in {totals.departments} departments, {totals.plant} hire machines and {totals.services} site
            services, delivered to {formatNumber(totals.coverageTowns)} towns and cities in all {totals.provinces} provinces.
          </p>
        </Reveal>
      </section>

      <section className="bg-white">
        <div className="container-site py-20">
          <SectionHeading eyebrow="What we stand for" title="Four things we hold to." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="rounded-sm border-t-4 border-ochre-gold bg-limestone p-6">
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 py-20 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading eyebrow="Who we serve" title="Built for people who buy on specification." />
          <div className="mt-6 flex flex-wrap gap-2">
            {SEGMENTS.map((s) => (
              <span key={s} className="rounded-full border border-seam-blue/30 px-3 py-1 text-sm text-seam-blue">{s}</span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {AUDIENCES.map((a) => (
            <div key={a.title} className="rounded-sm border border-basalt/10 bg-white p-5">
              <h3 className="font-display font-semibold">{a.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{a.body}</p>
            </div>
          ))}
          {STORE.industries.map((i) => (
            <div key={i.slug} className="rounded-sm border border-basalt/10 bg-white p-5">
              <h3 className="font-display font-semibold">{i.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{i.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-basalt text-limestone">
        <div className="container-site py-20">
          <SectionHeading tone="light" eyebrow="Besbpo Group" title="Part of a built-environment group." lede="Sister divisions that use the same material, machines and trucks." />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-sm bg-limestone/10 sm:grid-cols-2 lg:grid-cols-4">
            {GROUP_DIVISIONS.map((g) => (
              <li key={g.name} className="bg-basalt p-6">
                <p className="font-display text-lg font-semibold">{g.name}</p>
                <p className="mt-1.5 text-sm text-limestone/70">{g.body}</p>
              </li>
            ))}
            <li className="bg-basalt p-6">
              <a href={STORE.contact.groupSiteUrl} className="group block h-full">
                <p className="font-display text-lg font-semibold text-ochre-gold">Besbpo Group</p>
                <p className="mt-1.5 text-sm text-limestone/70 group-hover:text-limestone">Visit the Group site →</p>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand placement="about_cta" />
    </>
  );
}
