/**
 * The corporate site's own copy: who we are, how we work, the standards and
 * the Group. The range, prices, services and contact details come from the
 * store (lib/store.ts) — only what the store doesn't publish lives here.
 */

export const NAV = [
  { href: "/about/", label: "About" },
  { href: "/departments/", label: "Departments" },
  { href: "/services/", label: "Hire & services" },
  { href: "/trade/", label: "Trade & projects" },
  { href: "/partners/", label: "Partners" },
  { href: "/faq/", label: "FAQ" },
  { href: "/contact/", label: "Contact" },
] as const;

export const ABOUT = {
  lede: "Aggregated Aggregates is a specialised operating division of Besbpo Group. We started with graded sub-base, crushed stone, sand and crusher run, and have grown into one platform for the whole build, from the foundations to the roof and the finishes.",
  name: "The name carries two meanings: aggregated, one supplier consolidating a fragmented trade, and aggregates, the product we started with. Every layer of every build starts with what we deliver.",
  model:
    "We work as a broker and network. Approved partner suppliers across South Africa supply the material, and vetted partners supply the machines and trucks. You deal with one platform, one order and one point of contact.",
  pillars: [
    { title: "Graded to standard", body: "Every graded product is supplied against a stated grading and specification, shown on its product page." },
    { title: "Consistent supply", body: "Bulk volumes and dependable quarry-to-site logistics from the approved supplier nearest your site." },
    { title: "The whole build", body: "From G1 base course and ready-mix to roof sheeting, windows, plumbing and paint, on one order." },
    { title: "First link in the chain", body: "The material input for the Group's earthworks, concrete and building divisions." },
  ],
};

/** What the old single-line aggregates business grew into, in build order. */
export const BUSINESS_LINES = [
  {
    key: "materials",
    eyebrow: "Materials",
    title: "Aggregates, cement and concrete",
    body: "Sub-base, crushed stone, sand and crusher run by the ton, cube or bag; bagged and bulk cement; ready-mix by the mixer truck with pumps on request.",
    storePath: "/products",
  },
  {
    key: "structure",
    eyebrow: "Structure",
    title: "Steel, bricks, blocks and roofing",
    body: "Rebar, mesh and structural sections with cut & bend; bricks, blocks and lintels; paving and drainage; roof sheeting, tiles and structural timber.",
    storePath: "/departments",
  },
  {
    key: "supplies",
    eyebrow: "Building supplies",
    title: "Everything that finishes the job",
    body: "Doors and windows, fencing, plumbing, bathrooms and kitchens, electrical and solar, ceilings, tiles and flooring, hardware, boards and formwork, tools, PPE and paint.",
    storePath: "/departments",
  },
  {
    key: "hire",
    eyebrow: "Hire & services",
    title: "Plant hire and site services",
    body: "Wet-hire TLBs, excavators, tippers and rollers with operator, fuel and PPE, plus haulage, rubble removal, skips and steel fixing.",
    storePath: "/plant-hire",
  },
  {
    key: "design",
    eyebrow: "Design",
    title: "Architecture and engineering",
    body: "Plans, council submissions, structural and civil engineering and quantities through the Group's design partners.",
    storePath: "/design",
  },
  {
    key: "planning",
    eyebrow: "Planning",
    title: "Estimator, job packs and project lists",
    body: "Size a job in volume, weight and truck loads, order it as a job pack, or plan the whole build stage by stage and order it in one go.",
    storePath: "/estimator",
  },
] as const;

/** The project tools on the store, as its Trade Accounts page and Terms describe them. */
export const PROJECT_TOOLS = [
  {
    title: "Upload your bill of quantities",
    body: "Send the BOQ as Excel or CSV. Each line is matched to the catalogue; you check the matches, and it becomes one quote request.",
    storePath: "/quote/boq",
    cta: "Upload a BOQ",
  },
  {
    title: "Trade credit on account",
    body: "Approved trade companies can order on account with 7, 14, 30 or 60-day terms, up to their credit limit.",
    storePath: "/trade-accounts#trade-credit",
    cta: "How trade credit works",
  },
  {
    title: "Deliver in stages",
    body: "Split one order into deliveries on the dates the build needs them; each date is confirmed with the supplier.",
    storePath: "/trade-accounts#deliveries",
    cta: "Phased deliveries",
  },
  {
    title: "Signed proof of delivery",
    body: "The person receiving on site can sign on the driver's phone and note any shortage or damage, with a photo of the load.",
    storePath: "/trade-accounts#deliveries",
    cta: "Proof of delivery",
  },
  {
    title: "Deposits, payment links and lay-by",
    body: "Secure a large order with a deposit, settle by payment link with a proforma, or spread the cost on lay-by.",
    storePath: "/ways-to-pay",
    cta: "Ways to pay",
  },
  {
    title: "Lead times up front",
    body: "Where suppliers have confirmed them, the usual lead times show on the product page, in the cart and at checkout.",
    storePath: "/delivery-areas",
    cta: "Delivery areas",
  },
] as const;

export const HOW_IT_WORKS = {
  materials: [
    { title: "Choose or estimate", body: "Shop the departments, upload a bill of quantities, or size the job with the calculators and estimator." },
    { title: "Order, quote or pay on account", body: "Pay online in full or by deposit, request a quote for volume, or order on account with approved trade credit." },
    { title: "We arrange supply", body: "The approved supplier nearest your site confirms the load and the date, by tipper, flatbed or mixer truck." },
    { title: "Delivered, and signed for", body: "In one drop or in stages that follow the build, with a signed proof of delivery for your records." },
  ],
  hire: [
    { title: "Book and pay", body: "Book the machine or service and pay on the platform before dispatch." },
    { title: "Partner matched", body: "The nearest vetted partner has 30 minutes to accept the job." },
    { title: "Arrival confirmed", body: "A one-time code confirms the crew is on site." },
    { title: "Sign off", body: "The partner is paid after you sign the job off and the 48-hour dispute window closes." },
  ],
};

export const STANDARDS = [
  { code: "SANS 1200", body: "Standardised specification for civil engineering construction, including gravel layers." },
  { code: "SANS 1083", body: "Aggregates from natural sources for concrete and construction use." },
  { code: "COLTO / TRH14", body: "Road construction specifications for graded crushed stone and crusher run." },
  { code: "SANS 878", body: "Ready-mixed concrete." },
  { code: "SANS 920", body: "Steel bars for concrete reinforcement." },
  { code: "SANS 1024", body: "Welded steel fabric for reinforcement." },
] as const;

export const SEGMENTS = ["Civil", "Commercial", "Industrial", "Residential"] as const;

export const AUDIENCES = [
  { title: "Construction companies", body: "Bulk materials by the load, trade pricing, credit on account and phased deliveries that follow the programme." },
  { title: "Property developers", body: "One supplier from earthworks to finishes, with BOQ quotes, design partners and signed proof of every delivery." },
  { title: "Hardware stores and merchants", body: "Volume and civil-bulk pricing on aggregates, cement, steel and building supplies to restock the yard." },
  { title: "Homeowners and builders", body: "Order online at list price, bagged or bulk, delivered from the supplier nearest the site." },
] as const;

/** Besbpo Group divisions that work alongside us (as in the original corporate site, plus Finishes Construction from the store). */
export const GROUP_DIVISIONS = [
  { name: "Precast Direct", body: "Ready-mix and precast concrete." },
  { name: "Besfleet", body: "Trucking and delivery capacity." },
  { name: "Garlaws", body: "Landscaping and civil works." },
  { name: "Shiptub", body: "Diesel depot and truck stop logistics." },
  { name: "Affiliated Builders", body: "Building construction, from the ground up." },
  { name: "Finishes Construction", body: "Plastering, tiling, painting and finishing work." },
  { name: "Roofsteel", body: "Steel roofing and structural materials." },
] as const;

export const DEPARTMENT_ICONS: Record<string, string> = {
  aggregates: "Mountain",
  "cement-concrete": "Container",
  steel: "Grid3x3",
  walling: "BrickWall",
  paving: "LayoutGrid",
  drainage: "Waves",
  roofing: "House",
  timber: "TreePine",
  "doors-windows": "DoorOpen",
  "fencing-security": "Fence",
  "water-plumbing": "Droplets",
  "ceilings-drywall": "PanelTop",
  "tools-ppe": "HardHat",
  "paint-waterproofing": "PaintRoller",
  electrical: "Zap",
  "tiles-flooring": "Grid2x2",
  "bathroom-kitchen": "Bath",
  "hardware-fasteners": "Wrench",
  "boards-formwork": "Layers",
};

/** Department groups, the way the build goes up. */
export const DEPARTMENT_GROUPS = [
  { label: "Ground & structure", slugs: ["aggregates", "cement-concrete", "steel", "walling", "paving", "drainage"] },
  { label: "Roof", slugs: ["roofing", "timber"] },
  { label: "Building supplies", slugs: ["doors-windows", "fencing-security", "water-plumbing", "ceilings-drywall", "tools-ppe", "paint-waterproofing"] },
  { label: "Services & fit-out", slugs: ["electrical", "tiles-flooring", "bathroom-kitchen", "hardware-fasteners", "boards-formwork"] },
] as const;

/** Photography used only on the corporate site, credited like the store's. */
export const EXTRA_IMAGES = [
  {
    id: "rebar-cage",
    url: "/media/rebar-cage.webp",
    alt: "Looking down the length of a reinforcing-steel cage on a construction site, against a blue sky",
    credit: "Ermell / Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Baustelle-H%C3%B6lzla-Rebar-6228085.jpg",
  },
] as const;
