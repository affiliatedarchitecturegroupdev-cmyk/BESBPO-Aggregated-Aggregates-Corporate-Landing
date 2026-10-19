import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactComposer } from "@/components/ContactComposer";
import { PageHero } from "@/components/PageHero";
import { LaunchStoreButton, SectionHeading, StoreLink } from "@/components/ui";
import { STORE, formatAddress, whatsappLink } from "@/lib/store";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the Aggregated Aggregates team: phone, WhatsApp, email, or request a quote and upload a bill of quantities on the store.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const { contact } = STORE;
  const channels = [
    ...contact.phones.map((p) => ({ Icon: Phone, label: p.label, value: p.number, href: `tel:${p.tel}` })),
    { Icon: MessageCircle, label: "WhatsApp", value: "Chat with sales", href: whatsappLink("Hi Aggregated Aggregates, I'd like help with an order.") },
    { Icon: Mail, label: "Sales", value: contact.salesEmail, href: `mailto:${contact.salesEmail}` },
    { Icon: Mail, label: "Partners & suppliers", value: contact.partnersEmail, href: `mailto:${contact.partnersEmail}` },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to the team." lede="Send a bill of quantities, describe the job, or ask about an order. For prices, stock and delivery to your site, the store is the quickest route.">
        <LaunchStoreButton placement="contact_hero" path="/quote" size="lg" label="Request a quote" />
        <StoreLink placement="contact_hero" path="/quote/boq" variant="outline-light">
          Upload a BOQ
        </StoreLink>
      </PageHero>
      <section className="container-site grid gap-12 py-20 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="Reach us" title="Phone, WhatsApp or email." />
          <ul className="mt-8 space-y-3">
            {channels.map(({ Icon, label, value, href }) => (
              <li key={label + value}>
                <a href={href} className="group flex items-center gap-4 rounded-sm border border-basalt/10 bg-white p-4 transition hover:border-seam-blue">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-limestone text-seam-blue group-hover:bg-seam-blue group-hover:text-limestone">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate">{label}</span>
                    <span className="font-display font-semibold">{value}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-start gap-4 rounded-sm border border-basalt/10 bg-white p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-limestone text-seam-blue">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate">Registered office</span>
                <span className="font-display font-semibold">{formatAddress()}</span>
              </span>
            </li>
          </ul>
        </div>
        <div>
          <SectionHeading eyebrow="Write to us" title="Send the team a message." lede="This opens your email app with the message ready to send to our sales team." />
          <ContactComposer email={contact.salesEmail} />
        </div>
      </section>
    </>
  );
}
