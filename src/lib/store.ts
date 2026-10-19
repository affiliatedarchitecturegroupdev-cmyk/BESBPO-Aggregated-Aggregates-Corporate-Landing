import snapshot from "@/data/store.json";

/**
 * Everything the corporate site says about the store's range and services
 * comes from src/data/store.json, generated from the store's own source by
 * scripts/sync-store.ts. Nothing here is typed in by hand.
 */
export const STORE = snapshot;
export type Department = (typeof snapshot.departments)[number];
export type DepartmentCategory = Department["categories"][number];

export const STORE_URL = snapshot.storeUrl.replace(/\/+$/, "");
export const SITE_URL = snapshot.contact.corporateSiteUrl.replace(/\/+$/, "");

/**
 * A link into the store, tagged so the store's analytics can tell which
 * corporate page sent the visit (the same UTM convention the store uses for
 * its Group cross-sell links).
 */
export function storeLink(path = "/", placement = "site"): string {
  const url = new URL(path, `${STORE_URL}/`);
  url.searchParams.set("utm_source", "aggregated.besbpo.co.za");
  url.searchParams.set("utm_medium", "corporate_site");
  url.searchParams.set("utm_campaign", placement);
  return url.toString();
}

export function findDepartment(slug: string) {
  return snapshot.departments.find((d) => d.slug === slug);
}

// Formatted by hand, not with Intl: Node and browsers disagree on South African
// separators, which would make the static HTML and the hydrated page differ.
const group = (digits: string) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const formatNumber = (n: number) => group(String(Math.round(n)));

export const formatZAR = (n: number) => {
  const [rands, cents] = n.toFixed(2).split(".");
  return `R${group(rands)}.${cents}`;
};

export const whatsappLink = (text?: string) => `https://wa.me/${snapshot.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export function formatAddress() {
  const a = snapshot.contact.address;
  return `${a.line1}, ${a.line2}, ${a.city}, ${a.province}, ${a.postalCode}`;
}
