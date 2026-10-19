import Link from "next/link";
import { LaunchStoreButton } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-basalt text-limestone">
      <div className="container-site flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="eyebrow text-ochre-gold">404</p>
        <h1 className="mt-4 font-display text-5xl font-bold">This layer isn&apos;t here.</h1>
        <p className="mt-4 max-w-lg text-limestone/75">The page you wanted doesn&apos;t exist. Head back home, or go straight to the store.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-sm border border-limestone/40 px-6 py-3.5 font-semibold hover:border-ochre-gold hover:text-ochre-gold">
            Back to home
          </Link>
          <LaunchStoreButton placement="not_found" size="lg" />
        </div>
      </div>
      <div className="strata h-10" aria-hidden />
    </section>
  );
}
