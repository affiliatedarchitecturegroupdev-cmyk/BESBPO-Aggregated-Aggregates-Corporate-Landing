import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui";
import type { SiteImage } from "@/lib/images";

/** The header band for inner pages: a photo (optional), breadcrumb-style eyebrow, title and lede. */
export function PageHero({ eyebrow, title, lede, image, children }: { eyebrow: string; title: ReactNode; lede?: ReactNode; image?: SiteImage; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-basalt text-limestone">
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.url} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-basalt via-basalt/85 to-basalt/40" aria-hidden />
        </>
      )}
      <div className="container-site py-16 md:py-24">
        <Eyebrow tone="gold">{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">{title}</h1>
        {lede && <p className="mt-5 max-w-2xl text-base leading-relaxed text-limestone/75 md:text-lg">{lede}</p>}
        {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
        {image && <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-limestone/45">Photo: {image.credit}</p>}
      </div>
      <div className="strata h-8 opacity-80" aria-hidden />
    </section>
  );
}
