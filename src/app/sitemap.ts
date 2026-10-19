import type { MetadataRoute } from "next";
import { SITE_URL, STORE } from "@/lib/store";

export const dynamic = "force-static";

const PAGES = ["", "about/", "departments/", "services/", "trade/", "partners/", "faq/", "contact/", "credits/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = STORE.generatedAt;
  return [
    ...PAGES.map((p) => ({ url: `${SITE_URL}/${p}`, lastModified })),
    ...STORE.departments.map((d) => ({ url: `${SITE_URL}/departments/${d.slug}/`, lastModified })),
  ];
}
