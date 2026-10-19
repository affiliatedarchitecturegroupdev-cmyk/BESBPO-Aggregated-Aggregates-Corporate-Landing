import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, StoreLink } from "@/components/ui";
import { image } from "@/lib/images";
import { STORE } from "@/lib/store";

export const metadata: Metadata = {
  title: "Partners & suppliers",
  description: "Quarries, cement, ready-mix, steel and building-supply merchants can join the approved supplier network; plant and tipper owners can list their fleet.",
  alternates: { canonical: "/partners/" },
};

const TRACKS = [
  {
    eyebrow: "Supply us",
    title: "Approved supplier network",
    body: "Quarries and sand pits, cement and ready-mix producers, steel merchants, brickyards and building-supply merchants supply the orders nearest them. We bring the customers, the payments and the delivery planning.",
    links: [
      { label: "See the partner network", path: "/suppliers" },
      { label: "Supplier portal", path: "/suppliers/portal" },
    ],
  },
  {
    eyebrow: "Work with us",
    title: "Plant and haulage partners",
    body: "Owners of TLBs, excavators, tippers, rollers and skips list their fleet and receive paid-up jobs near them. Accept within 30 minutes; you're paid after the customer signs the job off.",
    links: [
      { label: "Become a partner", path: "/partners" },
      { label: "Partner onboarding", path: "/partners/onboarding" },
    ],
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Supply us, or work with us."
        lede="The material comes from approved partner suppliers, and the machines and trucks from vetted partners. Join the network and receive work from contractors and builders near you."
        image={image("yellow-loader")}
      />

      <section className="container-site grid gap-6 py-20 lg:grid-cols-2">
        {TRACKS.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.08} className="flex flex-col rounded-sm border border-basalt/10 bg-white p-8">
            <p className="eyebrow text-seam-blue">{t.eyebrow}</p>
            <h2 className="mt-3 font-display text-2xl font-bold">{t.title}</h2>
            <p className="mt-3 flex-1 text-base leading-relaxed text-slate">{t.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {t.links.map((l, j) => (
                <StoreLink key={l.path} placement="partners_tracks" path={l.path} variant={j === 0 ? "outline" : "text"}>
                  {l.label}
                </StoreLink>
              ))}
            </div>
          </Reveal>
        ))}
      </section>

      <section id="sourcing" className="scroll-mt-28 bg-white">
        <div className="container-site py-20">
          <SectionHeading
            eyebrow="Responsible sourcing"
            title="What we ask of our suppliers."
            lede="The bodies whose standards, registrations and credentials we expect partner suppliers to hold where they apply. Each belongs to its body; none is an Aggregated Aggregates certification."
          >
            <StoreLink placement="partners_sourcing" path="/responsible-sourcing">Responsible sourcing</StoreLink>
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STORE.sourcingBodies.map((b, i) => (
              <Reveal key={b.name} delay={(i % 4) * 0.05} className="rounded-sm border border-basalt/10 bg-limestone p-5">
                <p className="eyebrow text-slate">{b.eyebrow}</p>
                <p className="mt-2 font-display text-lg font-bold text-seam-blue">{b.name}</p>
                <p className="text-xs text-slate">{b.fullName}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate">{b.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-20">
        <div className="rounded-sm bg-basalt p-8 text-limestone md:p-10">
          <p className="eyebrow text-ochre-gold">Partner enquiries</p>
          <h2 className="mt-3 font-display text-2xl font-bold">Talk to the partnerships team</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-limestone/75">
            We ask for company and tax details, insurance, the relevant certificates, an equipment or product list and written rates.
          </p>
          <a href={`mailto:${STORE.contact.partnersEmail}?subject=${encodeURIComponent("Partner enquiry — Aggregated Aggregates")}`} className="mt-6 inline-block rounded-sm bg-ochre-gold px-6 py-3 font-semibold text-basalt hover:bg-limestone">
            {STORE.contact.partnersEmail}
          </a>
        </div>
      </section>

      <CtaBand placement="partners_cta" />
    </>
  );
}
