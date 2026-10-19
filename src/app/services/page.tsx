import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { LaunchStoreButton, SectionHeading, StoreLink } from "@/components/ui";
import { HOW_IT_WORKS } from "@/data/site";
import { image } from "@/lib/images";
import { STORE } from "@/lib/store";

export const metadata: Metadata = {
  title: "Plant hire, site services & design",
  description: "Wet-hire plant with operator, fuel and PPE; haulage, rubble removal, skips and steel fixing; job packs and architecture and engineering services.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  const classes = Array.from(new Set(STORE.plant.map((p) => p.class)));
  return (
    <>
      <PageHero
        eyebrow="Hire & services"
        title="Machines, operators and haulage on the same platform."
        lede="Wet hire with operator, fuel and PPE from vetted partners near your site, plus the services that keep a site moving. You pay on the platform; partners are paid after you sign the job off."
        image={image("excavator-yellow")}
      >
        <LaunchStoreButton placement="services_hero" path="/plant-hire" size="lg" label="Book plant hire" />
        <StoreLink placement="services_hero" path="/plant-hire/how-it-works" variant="outline-light">
          How hire bookings work
        </StoreLink>
      </PageHero>

      <section className="container-site py-20">
        <SectionHeading eyebrow={`${STORE.plant.length} machines`} title="Plant hire." lede={`Available through partners in all ${STORE.hireRegions.length} provinces, by the day, with an operator.`}>
          <StoreLink placement="services_plant" path="/plant-hire">See rates and book</StoreLink>
        </SectionHeading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((cls, i) => (
            <Reveal key={cls} delay={(i % 4) * 0.05} className="rounded-sm border border-basalt/10 bg-white p-5">
              <p className="font-display text-lg font-semibold">{cls}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate">
                {STORE.plant
                  .filter((p) => p.class === cls)
                  .map((p) => (
                    <li key={p.name}>{p.name}</li>
                  ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-20">
          <SectionHeading eyebrow={`${STORE.services.length} services`} title="Site services." lede="Haulage, rubble removal, skip bins, site clearing, demolition, waste management and steel fixing through vetted partners.">
            <StoreLink placement="services_site" path="/services">See site services</StoreLink>
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STORE.services.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 0.05} className="rounded-sm border border-basalt/10 bg-limestone p-5">
                <p className="font-display font-semibold">{s.name}</p>
                {s.description && <p className="mt-1.5 text-sm leading-relaxed text-slate">{s.description}</p>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20">
        <SectionHeading eyebrow="Booking" title="From booking to sign-off." />
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {HOW_IT_WORKS.hire.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.06} className="rounded-sm border-t-4 border-seam-blue bg-white p-6">
              <span className="font-mono text-sm text-ochre-gold">0{i + 1}</span>
              <p className="mt-2 font-display font-semibold">{step.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-basalt text-limestone">
        <div className="container-site grid gap-12 py-20 lg:grid-cols-2">
          <div>
            <SectionHeading tone="light" eyebrow="Job packs" title="Size the job. Order the whole job." lede="Bundles of materials, plant and haulage for the jobs builders do most, with the estimator to size them in volume, weight and truck loads." />
            <ul className="mt-8 space-y-3">
              {STORE.jobPacks.map((j) => (
                <li key={j.slug} className="rounded-sm border border-limestone/10 p-4">
                  <p className="font-display font-semibold">{j.name}</p>
                  <p className="mt-1 text-sm text-limestone/70">{j.summary}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-4">
              <StoreLink placement="services_jobpacks" path="/job-packs" variant="text-light">View job packs</StoreLink>
              <StoreLink placement="services_estimator" path="/estimator" variant="text-light">Open the estimator</StoreLink>
            </div>
          </div>
          <div>
            <SectionHeading tone="light" eyebrow="Design" title="Architecture and engineering." lede={`${STORE.design.services.length} design services across ${STORE.design.disciplines.length} disciplines, from plans and council submissions to engineering sign-off.`} />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {STORE.design.disciplines.map((d) => (
                <li key={d.key} className="rounded-sm border border-limestone/10 p-4">
                  <p className="font-display font-semibold">{d.name}</p>
                  <p className="mt-1 text-sm text-limestone/70">{d.blurb}</p>
                </li>
              ))}
            </ul>
            <StoreLink placement="services_design" path="/design" variant="text-light" className="mt-6">Design services</StoreLink>
          </div>
        </div>
      </section>

      <CtaBand placement="services_cta" title="Materials, machines and the crew, together." />
    </>
  );
}
