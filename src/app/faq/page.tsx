import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/ui";
import { STORE } from "@/lib/store";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Delivery, pricing tiers, payment, trade credit, BOQ quotes, phased deliveries, compliance documents, plant hire and site services — answered.",
  alternates: { canonical: "/faq/" },
};

const SECTIONS = [
  { id: "materials", title: "Materials, delivery & payment", faqs: STORE.faqs.materials },
  { id: "trade-projects", title: "Trade credit, projects & deliveries", faqs: STORE.faqs.projects },
  { id: "plant-hire", title: "Plant hire & site services", faqs: STORE.faqs.hire },
];

export default function FaqPage() {
  const structured = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SECTIONS.flatMap((s) => s.faqs).map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
      <PageHero eyebrow="FAQ" title="Frequently asked questions." lede="The same answers the store gives, kept in step with it." />
      <div className="container-site space-y-16 py-20">
        <nav aria-label="FAQ sections" className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full border border-basalt/15 px-4 py-2 text-sm hover:border-seam-blue hover:text-seam-blue">
              {s.title}
            </a>
          ))}
        </nav>
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-28">
            <SectionHeading eyebrow={`${s.faqs.length} questions`} title={s.title} />
            <div className="mt-8">
              <FaqList faqs={s.faqs} />
            </div>
          </section>
        ))}
      </div>
      <CtaBand placement="faq_cta" title="Still have a question?" body="Call, WhatsApp or email our sales team, or browse and order on the store now." />
    </>
  );
}
