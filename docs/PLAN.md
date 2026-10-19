# Rebuild plan (October 2026)

## Where we started

The first corporate site was one hand-written `index.html` (in this repo's
first commit). It described the business as it was early on: 18 categories
(aggregates, cement, ready-mix, steel, plant hire, site services), 51
aggregate products, a launch in KwaZulu-Natal and Gauteng, and the old
`sales@aggregates.store` address and `aggregates.besbpo.co.za` domain.

The store has since grown to 14 departments, 40 categories and 1,122 products
(including six building-supplies departments), national delivery to all nine
provinces, trade credit, BOQ upload, phased deliveries, proof of delivery,
deposits, payment links and lay-by, AA 60/120 express delivery, and design
services.

## Decisions

1. **Two codebases, one workspace.** The corporate site stays its own repo and
   its own deploy (GitHub Pages), separate from the store (Render). The store
   is checked out next to it, and `npm run sync:store` pulls the store's
   public data into `src/data/store.json`, so the two can't drift.
2. **Static Next.js.** `output: "export"` with trailing slashes, so GitHub Pages
   serves `/about/index.html` for `/about/`. There's no server, so the contact
   form composes an email in the visitor's mail app instead of posting.
3. **Launch Store everywhere.** In the header (desktop and mobile), the hero, the
   mobile menu, the footer, department pages and the closing band of each page.
4. **Domain.** `aggregated.besbpo.co.za`, the corporate domain the store already
   links to (`CORPORATE_SITE_URL`) and that the store's rules record as
   client-confirmed. The old `aggregates.besbpo.co.za` CNAME is replaced.
5. **Content from the store, word for word.** Department and category names,
   descriptions and counts, plant, services, job packs, design disciplines,
   tiers, payment methods, FAQs, contact details, social links and the
   licensed photography come from the store. Legal pages link to the store's.
6. **Kept from the original site.** The brand artwork (logos, favicon and the
   cross-section category illustrations, used on the matching categories), the
   standards list, the hire process, and the Group divisions — with Finishes
   Construction added from the store.

## To review

- The Group divisions list (Precast Direct, Besfleet, Garlaws, Shiptub,
  Affiliated Builders, Finishes Construction, Roofsteel) — confirm the
  one-line descriptions with each division.
- Some store category descriptions predate the October range-depth work
  (e.g. Windows & Window Frames still describes only F7 steel and bronze
  aluminium windows). They show here as the store has them; updating them in
  the store's `apps/web/src/data/categories.ts` and re-syncing fixes both.
