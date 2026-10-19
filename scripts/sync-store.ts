/**
 * Pulls what the corporate site says about the store from the store's own
 * source, so the two never drift: departments and categories with live
 * product counts, plant hire and services, job packs, design services,
 * customer tiers, payment methods, FAQs, contact details and the licensed
 * hero photography. Writes src/data/store.json, which the site builds from.
 *
 *   npm run sync:store                      # store checked out next to this repo
 *   STORE_DIR=/path/to/store npm run sync:store
 *
 * Only public storefront data is read (the store's apps/web data files,
 * which already have pricing research stripped). Run it after every store
 * release that changes the range, then commit src/data/store.json.
 */
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";

const STORE_DIR = path.resolve(process.env.STORE_DIR ?? path.join(__dirname, "../../BESBPO-Aggregated-Aggregates-E-commerce-Platform"));
const WEB = path.join(STORE_DIR, "apps/web/src");
const load = async <T>(file: string): Promise<T> => (await import(path.join(WEB, file))) as T;

type Department = { slug: string; name: string; shortName: string; blurb: string; href: string; categorySlugs: string[] };

async function main() {
  const { DEPARTMENTS } = await load<{ DEPARTMENTS: Department[] }>("data/departments.ts");
  const { CATEGORIES } = await load<{ CATEGORIES: { slug: string; name: string; description: string; catalogueGroup: string }[] }>("data/categories.ts");
  const { PRODUCT_INDEX } = await load<{ PRODUCT_INDEX: { sku: string; categorySlug: string; departmentSlug: string | null; fromPrice: number | null }[] }>("lib/product-index.ts");
  const { PLANT, SERVICES, PLANT_CLASS_LABEL, HIRE_REGIONS } = await load<any>("data/plant-services.ts");
  const { JOB_PACKS } = await load<any>("data/job-packs.ts");
  const { DESIGN_SERVICES, DISCIPLINES } = await load<any>("data/design-services.ts");
  const { CUSTOMER_TIERS } = await load<any>("data/catalogue.ts");
  const { PAYMENT_METHODS } = await load<any>("data/payment-methods.ts");
  const { FAQS, PROJECT_FAQS } = await load<any>("data/faqs.ts");
  const { HIRE_FAQS } = await load<any>("data/hire-faqs.ts");
  const { INDUSTRIES } = await load<any>("data/industries.ts");
  const { EXPRESS } = await load<any>("data/express.ts");
  const { COVERAGE_TOWNS } = await load<any>("data/coverage-towns.ts");
  const { GROUP_COMPANIES } = await load<any>("data/group-companies.ts");
  const { SOURCING_BADGES } = await load<any>("data/badges.ts");
  const { HERO_SLIDESHOW_IMAGES } = await load<any>("data/media.ts");
  const social = await load<any>("data/social.ts");
  const contact = await load<any>("data/corporate-contact.ts");
  const { LIVE_SITE_URL } = await load<any>("lib/site.ts");

  const count = (filter: (p: (typeof PRODUCT_INDEX)[number]) => boolean) => {
    const products = PRODUCT_INDEX.filter(filter);
    const priced = products.filter((p) => p.fromPrice !== null);
    return { products: products.length, buyOnline: priced.length, fromPrice: priced.length ? Math.min(...priced.map((p) => p.fromPrice!)) : null };
  };

  const departments = DEPARTMENTS.map((d) => ({
    slug: d.slug,
    name: d.name,
    shortName: d.shortName,
    blurb: d.blurb,
    storePath: d.href,
    ...count((p) => p.departmentSlug === d.slug),
    categories: d.categorySlugs.map((slug) => {
      const c = CATEGORIES.find((x) => x.slug === slug);
      return { slug, name: c?.name ?? slug, description: c?.description ?? "", storePath: `/products?category=${slug}`, ...count((p) => p.categorySlug === slug) };
    }),
  }));

  let storeCommit: string | null = null;
  try {
    storeCommit = execSync("git rev-parse --short HEAD", { cwd: STORE_DIR }).toString().trim();
  } catch {
    storeCommit = null;
  }

  const snapshot = {
    generatedAt: new Date().toISOString().slice(0, 10),
    storeCommit,
    storeUrl: LIVE_SITE_URL,
    totals: {
      ...count(() => true),
      departments: departments.length,
      categories: departments.reduce((n, d) => n + d.categories.length, 0),
      plant: PLANT.length,
      services: SERVICES.length,
      coverageTowns: COVERAGE_TOWNS.length,
      provinces: new Set(COVERAGE_TOWNS.map((t: { province: string }) => t.province)).size,
    },
    departments,
    plant: PLANT.map((p: any) => ({ name: p.name, class: PLANT_CLASS_LABEL[p.plantClass] ?? p.plantClass })),
    hireRegions: HIRE_REGIONS,
    services: SERVICES.map((s: any) => ({ name: s.name, description: s.description ?? "" })),
    jobPacks: JOB_PACKS.map((j: any) => ({ slug: j.slug, name: j.name, summary: j.summary, lines: j.lines.length })),
    design: {
      disciplines: Object.entries(DISCIPLINES).map(([key, v]: [string, any]) => ({ key, name: v.name, blurb: v.blurb })),
      services: DESIGN_SERVICES.map((s: any) => ({ slug: s.slug, name: s.name, discipline: s.discipline })),
    },
    tiers: CUSTOMER_TIERS.map((t: any) => ({ name: t.name, label: t.label, discountPercent: Math.round(t.discount * 100), definition: t.definition })),
    paymentMethods: PAYMENT_METHODS.map((m: any) => ({ name: m.displayName, category: m.category, tradeOnly: m.tradeOnly })),
    express: { name: EXPRESS.name, promiseMinutes: EXPRESS.promiseMinutes, radiusKm: EXPRESS.radiusKm, hours: EXPRESS.hours },
    industries: INDUSTRIES.map((i: any) => ({ slug: i.slug, name: i.name, description: i.description })),
    groupCompanies: GROUP_COMPANIES.map((g: any) => ({ name: g.name, url: g.url, tagline: g.tagline, services: g.services })),
    sourcingBodies: SOURCING_BADGES.map((b: any) => ({ name: b.name, fullName: b.fullName, eyebrow: b.eyebrow, description: b.description })),
    faqs: { materials: FAQS, projects: PROJECT_FAQS, hire: HIRE_FAQS },
    heroImages: HERO_SLIDESHOW_IMAGES.filter((i: any) => i.url.startsWith("https://")).map((i: any) => ({ id: i.id, url: i.url, alt: i.alt, credit: i.credit, sourceUrl: i.sourceUrl ?? null })),
    contact: {
      phones: contact.PHONE_LINES.filter((p: any) => p.status === "live").map((p: any) => ({ label: p.label, number: p.number, tel: p.tel })),
      whatsapp: social.WHATSAPP_NUMBER,
      salesEmail: contact.CORPORATE_EMAILS.sales,
      partnersEmail: contact.CORPORATE_EMAILS.partners,
      address: contact.REGISTERED_ADDRESS,
      social: social.SOCIAL_LINKS.filter((s: any) => s.status === "live").map((s: any) => ({ platform: s.platform, url: s.url })),
      corporateSiteUrl: social.CORPORATE_SITE_URL,
      groupSiteUrl: social.GROUP_SITE_URL,
      legalEntity: social.LEGAL_ENTITY,
    },
  };

  const out = path.join(__dirname, "../src/data/store.json");
  writeFileSync(out, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(
    `Synced from the store${storeCommit ? ` @ ${storeCommit}` : ""}: ${snapshot.totals.products} products in ${snapshot.totals.departments} departments and ${snapshot.totals.categories} categories → ${path.relative(process.cwd(), out)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
