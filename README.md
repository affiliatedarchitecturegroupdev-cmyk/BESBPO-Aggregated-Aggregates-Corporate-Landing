# Aggregated Aggregates — corporate website

The corporate site for Aggregated Aggregates, a Besbpo Group division, at
**https://aggregated.besbpo.co.za**. It introduces the business and sends
buyers to the e-commerce store (**https://aaggregates.store**) — every page
has a **Launch Store** button.

- **Next.js 15 (App Router), React 19, TypeScript**, exported as a fully static
  site (`output: "export"`) — no server.
- **Tailwind CSS** with the store's brand system (Basalt, Limestone, Slate,
  Seam Blue, Ochre Gold; Space Grotesk / Inter / IBM Plex Mono).
- **Framer Motion** for the hero carousel and menu; a small CSS +
  IntersectionObserver reveal for scroll animation (content stays visible
  without JavaScript, and motion is off for reduced-motion users).
- **lucide-react** icons.
- Hosted on **GitHub Pages**, deployed by `.github/workflows/deploy.yml` on
  every push to `main`.

## Pages

| Path | What it covers |
|---|---|
| `/` | Hero carousel, who we supply, about, the 14 departments, business lines, project tools, how it works, standards, the Group, FAQ |
| `/about/` | The business, how the broker model works, who we serve, the Group |
| `/departments/` and `/departments/<slug>/` | Every department and its categories, with live product counts and "from" prices, linking into the store |
| `/services/` | Plant hire, site services, job packs and design |
| `/trade/` | Customer tiers, trade credit, BOQ upload, phased deliveries, proof of delivery, AA 60/120, ways to pay |
| `/partners/` | Supplier network, plant partners, supplier portal, responsible sourcing |
| `/faq/`, `/contact/`, `/credits/` | FAQ (the store's own answers), contact, photo credits |

## Staying in step with the store

The store is the source of truth for the range, prices, services, FAQs,
contact details and photography. `scripts/sync-store.ts` reads them from the
store's source and writes `src/data/store.json`, which the site builds from.

```bash
# with the store checked out next to this repo:
#   ../BESBPO-Aggregated-Aggregates-E-commerce-Platform
npm run sync:store
# or point at it explicitly
STORE_DIR=/path/to/store npm run sync:store
```

Run it after every store release that changes departments, categories,
products, services, FAQs or contact details, check the diff of
`src/data/store.json`, and commit it. Only the corporate site's own copy
(about, how it works, standards, the Group) lives in `src/data/site.ts`.

Every link into the store goes through `storeLink()` (`src/lib/store.ts`),
which tags it `utm_source=aggregated.besbpo.co.za&utm_medium=corporate_site`
so the store's analytics can see which page sent the visit.

## Develop

```bash
npm ci
npm run dev        # http://localhost:3100
npm run typecheck
npm run build      # writes ./out
npm start          # serves ./out on :3100
```

## Hosting

- `public/CNAME` holds the custom domain (`aggregated.besbpo.co.za`).
- In the repository's **Settings → Pages**, the source must be **GitHub
  Actions**, and the custom domain `aggregated.besbpo.co.za` with HTTPS
  enforced.
- DNS: a `CNAME` record for `aggregated` in the `besbpo.co.za` zone pointing to
  `affiliatedarchitecturegroupdev-cmyk.github.io`.

See `docs/PLAN.md` for how the old single-page site was rebuilt.
