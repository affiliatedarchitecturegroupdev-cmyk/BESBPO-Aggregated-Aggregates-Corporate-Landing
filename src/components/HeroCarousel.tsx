"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { LaunchStoreButton } from "@/components/ui";
import type { SiteImage } from "@/lib/images";

export type HeroSlide = {
  eyebrow: string;
  title: string;
  body: string;
  image: SiteImage;
  storePath?: string;
  secondary: { label: string; href: string };
};

const INTERVAL_MS = 7000;

export function HeroCarousel({ slides, stats }: { slides: HeroSlide[]; stats: { value: string; label: string }[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((next: number) => setIndex((next + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduce, go]);

  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Aggregated Aggregates at a glance"
      className="relative isolate overflow-hidden bg-basalt text-limestone"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.image.id}
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image.url}
            alt=""
            className={clsx("h-full w-full object-cover", !reduce && "animate-drift")}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-basalt via-basalt/80 to-basalt/20" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-basalt to-transparent" aria-hidden />

      <div className="container-site relative flex min-h-[620px] flex-col justify-center py-20 md:min-h-[680px]">
        <div className="max-w-2xl" aria-live={paused ? "polite" : "off"}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow text-ochre-gold">{slide.eyebrow}</p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">{slide.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-limestone/80 md:text-lg">{slide.body}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LaunchStoreButton placement={`hero_${index + 1}`} path={slide.storePath} size="lg" />
            {slide.secondary.href.startsWith("http") ? (
              <a href={slide.secondary.href} className="rounded-sm border border-limestone/40 px-6 py-3.5 font-semibold text-limestone transition hover:border-ochre-gold hover:text-ochre-gold">
                {slide.secondary.label}
              </a>
            ) : (
              <Link href={slide.secondary.href} className="rounded-sm border border-limestone/40 px-6 py-3.5 font-semibold text-limestone transition hover:border-ochre-gold hover:text-ochre-gold">
                {slide.secondary.label}
              </Link>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => go(index - 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-limestone/30 hover:border-ochre-gold hover:text-ochre-gold">
              <span className="sr-only">Previous slide</span>
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button type="button" onClick={() => go(index + 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-limestone/30 hover:border-ochre-gold hover:text-ochre-gold">
              <span className="sr-only">Next slide</span>
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
            <button type="button" onClick={() => setPaused((p) => !p)} className="flex h-10 w-10 items-center justify-center rounded-full border border-limestone/30 hover:border-ochre-gold hover:text-ochre-gold">
              <span className="sr-only">{paused ? "Play slideshow" : "Pause slideshow"}</span>
              {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
            </button>
            <div className="ml-3 flex items-center gap-1.5" role="tablist" aria-label="Choose a slide">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                  onClick={() => go(i)}
                  className="relative h-1.5 w-8 overflow-hidden rounded-full bg-limestone/25"
                >
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-ochre-gold"
                      initial={{ width: paused || reduce ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused || reduce ? 0 : INTERVAL_MS / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-limestone/50">Photo: {slide.image.credit}</p>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-limestone/10 bg-limestone/10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-basalt/70 px-5 py-4 backdrop-blur-sm">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-limestone/60">{s.label}</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-limestone">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
