import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { LaunchStoreButton, SectionHeading, StoreLink } from "@/components/ui";
import { HOW_IT_WORKS, PROJECT_TOOLS } from "@/data/site";
import { image } from "@/lib/images";
import { STORE } from "@/lib/store";

export const metadata: Metadata = {
  title: "Trade accounts & projects",
  description: "Trade and volume pricing, trade credit on account, BOQ quotes, phased deliveries, signed proof of delivery and every way to pay large orders.",
  alternates: { canonical: "/trade/" },
};

const PAYMENT_GROUPS: Record<string, string> = {
  card: "Card",
  eft: "Bank & EFT",
  wallet: "Wallets",
  qr: "QR",
  store: "Pay in store",
  bnpl: "Pay later",
  b2b: "Trade",
  manual: "Invoice",
};

export default function TradePage() {
  const groups = Object.entries(PAYMENT_GROUPS)
    .map(([key, label]) => ({ label, methods: STORE.paymentMethods.filter((m) => m.category === key) }))
    .filter((g) => g.methods.length > 0);
  return (
    <>
      <PageHero
        eyebrow="Trade & projects"
        title="Built for projects, not just orders."
        lede="Trade pricing, credit on account, quotes from your bill of quantities, and deliveries that follow the build. Construction companies, developers and merchants run whole jobs through one supplier."
        image={image("tipper-truck-transit")}
      >
        <LaunchStoreButton placement="trade_hero" path="/account/apply" size="lg" label="Open a trade account" />
        <StoreLink placement="trade_hero" path="/quote/boq" variant="outline-light">
          Upload a BOQ
        </StoreLink>
      </PageHero>

      <section className="container-site py-20">
        <SectionHeading eyebrow="Customer tiers" title="Three tiers, one list price." lede="Every price comes off the same list. Register your company to see trade pricing applied across the catalogue and at checkout." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {STORE.tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06} className={`rounded-sm border bg-white p-7 ${t.name === "CONTRACTOR_TRADE" ? "border-seam-blue" : "border-basalt/10"}`}>
              <p className="font-display text-lg font-semibold">{t.label}</p>
              <p className="mt-2 font-display text-4xl font-bold text-seam-blue">{t.discountPercent > 0 ? `Up to ${t.discountPercent}% off` : "List price"}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate">{t.definition}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-20">
          <SectionHeading eyebrow="Project tools" title="From the BOQ to the last delivery." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECT_TOOLS.map((tool, i) => (
              <Reveal key={tool.title} delay={(i % 3) * 0.06} className="flex flex-col rounded-sm border border-basalt/10 bg-limestone p-6">
                <span className="font-mono text-xs text-ochre-gold">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{tool.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{tool.body}</p>
                <StoreLink placement="trade_tools" path={tool.storePath} variant="text" className="mt-5">{tool.cta}</StoreLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 py-20 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Ordering" title="From enquiry to delivery." />
          <ol className="mt-8 space-y-6">
            {HOW_IT_WORKS.materials.map((step, i) => (
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
        <div className="rounded-sm bg-basalt p-8 text-limestone">
          <p className="eyebrow text-ochre-gold">{STORE.express.name}</p>
          <h3 className="mt-3 font-display text-2xl font-bold">Need it on site today?</h3>
          <p className="mt-3 text-sm leading-relaxed text-limestone/75">
            Eligible bagged and small-load materials delivered within {STORE.express.promiseMinutes} minutes when your site is within {STORE.express.radiusKm} km of one of
            our partner suppliers for every material in the order — {STORE.express.hours.charAt(0).toLowerCase() + STORE.express.hours.slice(1)}.
          </p>
          <StoreLink placement="trade_express" path="/aa-60-120" variant="text-light" className="mt-5">How {STORE.express.name} works</StoreLink>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-20">
          <SectionHeading eyebrow="Ways to pay" title={`${STORE.paymentMethods.length} ways to pay.`} lede="The methods offered depend on the order value and your account tier. Instalment terms are the providers' own.">
            <StoreLink placement="trade_payments" path="/ways-to-pay">Every method and its terms</StoreLink>
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((g) => (
              <div key={g.label} className="rounded-sm border border-basalt/10 bg-limestone p-5">
                <p className="eyebrow text-seam-blue">{g.label}</p>
                <ul className="mt-3 space-y-1 text-sm">
                  {g.methods.map((m) => (
                    <li key={m.name}>
                      {m.name}
                      {m.tradeOnly && <span className="ml-1 text-xs text-slate">(trade)</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand placement="trade_cta" title="Open a trade account today." body="Create an account and tell us about your company; we review applications within one business day. You trade at list price until approved." />
    </>
  );
}
