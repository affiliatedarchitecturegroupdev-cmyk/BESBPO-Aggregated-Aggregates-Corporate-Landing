import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = { title: "Photo credits", description: "The photographers whose work appears on this site.", alternates: { canonical: "/credits/" } };

export default function CreditsPage() {
  return (
    <>
      <PageHero eyebrow="Photo credits" title="The photography on this site." lede="Licensed photography, credited to each photographer. Category illustrations are our own." />
      <section className="container-site py-16">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {IMAGES.map((img) => (
            <li key={img.id} className="overflow-hidden rounded-sm border border-basalt/10 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url.replace("w=1600", "w=640")} alt={img.alt} className="aspect-[3/2] w-full object-cover" loading="lazy" />
              <div className="p-4">
                <p className="text-sm">{img.alt}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
                  {img.sourceUrl ? (
                    <a href={img.sourceUrl} className="hover:text-seam-blue">{img.credit}</a>
                  ) : (
                    img.credit
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
