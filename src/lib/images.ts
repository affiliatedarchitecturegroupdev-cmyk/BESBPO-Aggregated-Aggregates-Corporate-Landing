import { EXTRA_IMAGES } from "@/data/site";
import { STORE } from "@/lib/store";

export type SiteImage = { id: string; url: string; alt: string; credit: string; sourceUrl: string | null };

/** Every photo the site uses: the store's licensed library, plus the corporate site's own. */
export const IMAGES: SiteImage[] = [...STORE.heroImages, ...EXTRA_IMAGES];

export function image(id: string): SiteImage {
  return IMAGES.find((i) => i.id === id) ?? IMAGES[0];
}
