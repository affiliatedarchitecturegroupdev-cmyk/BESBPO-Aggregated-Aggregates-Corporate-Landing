import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE_URL, STORE, STORE_URL } from "@/lib/store";
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-space-grotesk" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-ibm-plex-mono" });

const description = `Aggregated Aggregates supplies the whole build — aggregates, cement and ready-mix, steel, bricks and blocks, paving, drainage, roofing, timber and building supplies — plus plant hire and site services across South Africa. A specialised operating division of Besbpo Group.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Aggregated Aggregates | Every Layer Starts Here", template: "%s | Aggregated Aggregates" },
  description,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: "Aggregated Aggregates",
    title: "Aggregated Aggregates | Every Layer Starts Here",
    description,
    url: "/",
    locale: "en_ZA",
    images: [{ url: STORE.heroImages[0].url, width: 1600, height: 1067, alt: STORE.heroImages[0].alt }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#1C1B1A", width: "device-width", initialScale: 1, viewportFit: "cover" };

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aggregated Aggregates",
  legalName: STORE.contact.legalEntity.name,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/aggregated-aggregates-icon.svg`,
  email: STORE.contact.salesEmail,
  telephone: STORE.contact.phones[0]?.tel,
  parentOrganization: { "@type": "Organization", name: "Besbpo Group", url: STORE.contact.groupSiteUrl },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${STORE.contact.address.line1}, ${STORE.contact.address.line2}`,
    addressLocality: STORE.contact.address.city,
    addressRegion: STORE.contact.address.province,
    postalCode: STORE.contact.address.postalCode,
    addressCountry: "ZA",
  },
  sameAs: [STORE_URL, ...STORE.contact.social.map((s) => s.url)],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets the scroll-reveal CSS hide content for its animation only when JavaScript runs. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-ochre-gold focus:px-4 focus:py-2 focus:text-basalt">
          Skip to main content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION).replace(/</g, "\\u003c") }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
