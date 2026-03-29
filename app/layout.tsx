import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import PWA from "@/components/PWA";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://magicasro.cloud"),
  title: {
    default: "MA.GI.CA — Enterprise PWA Engineering & Cybersecurity",
    template: "%s | MA.GI.CA Enterprise",
  },
  description: "Produkčné PWA aplikácie a kybernetická bezpečnosť pre najnáročnejších klientov. Enterprise-grade riešenia s WAF, DNSSEC, audit logmi a hardened infraštruktúrou.",
  manifest: "/manifest.json",
  keywords: [
    "PWA", "cybersecurity", "enterprise", "web application firewall",
    "government-safe", "DNSSEC", "hardened infrastructure", "audit",
    "progressive web app", "kybernetická bezpečnosť", "enterprise riešenia",
    "MA.GI.CA", "webová bezpečnosť", "WAF Slovensko",
  ],
  authors: [{ name: "MA.GI.CA s.r.o.", url: "https://magicasro.cloud" }],
  creator: "MA.GI.CA s.r.o.",
  publisher: "MA.GI.CA s.r.o.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: "https://magicasro.cloud",
    siteName: "MA.GI.CA Enterprise",
    title: "MA.GI.CA — Enterprise PWA Engineering & Cybersecurity",
    description: "Produkčné PWA aplikácie a kybernetická bezpečnosť pre najnáročnejších klientov.",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "MA.GI.CA Enterprise PWA & Cybersecurity Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MA.GI.CA — Enterprise PWA & Cybersecurity",
    description: "Produkčné PWA aplikácie a kybernetická bezpečnosť pre najnáročnejších klientov.",
    images: ["/hero.png"],
  },
  alternates: {
    canonical: "https://magicasro.cloud",
  },
  category: "technology",
  other: {
    "geo.region": "SK",
    "geo.placename": "Žiar nad Hronom",
    "geo.position": "48.5917;18.8544",
    "ICBM": "48.5917, 18.8544",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://magicasro.cloud/#organization",
      name: "MA.GI.CA s.r.o.",
      url: "https://magicasro.cloud",
      logo: {
        "@type": "ImageObject",
        url: "https://magicasro.cloud/icons/icon-512x512.png",
        width: 512,
        height: 512,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+421917488903",
        email: "magicasro@hotmail.com",
        contactType: "customer service",
        areaServed: "SK",
        availableLanguage: ["Slovak", "English"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Partizánska 101/45",
        addressLocality: "Žiar nad Hronom",
        postalCode: "96501",
        addressCountry: "SK",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://magicasro.cloud/#website",
      url: "https://magicasro.cloud",
      name: "MA.GI.CA Enterprise",
      publisher: { "@id": "https://magicasro.cloud/#organization" },
      inLanguage: "sk",
    },
    {
      "@type": "WebPage",
      "@id": "https://magicasro.cloud/#webpage",
      url: "https://magicasro.cloud",
      name: "MA.GI.CA — Enterprise PWA Engineering & Cybersecurity",
      isPartOf: { "@id": "https://magicasro.cloud/#website" },
      about: { "@id": "https://magicasro.cloud/#organization" },
      description: "Produkčné PWA aplikácie a kybernetická bezpečnosť pre najnáročnejších klientov.",
      inLanguage: "sk",
    },
    {
      "@type": "Service",
      name: "Enterprise PWA Development",
      provider: { "@id": "https://magicasro.cloud/#organization" },
      description: "Vývoj produkčných progresívnych webových aplikácií s offline režimom, failover a hardened nasadením.",
      areaServed: "SK",
      serviceType: "Web Development",
    },
    {
      "@type": "Service",
      name: "Cybersecurity & Compliance",
      provider: { "@id": "https://magicasro.cloud/#organization" },
      description: "WAF, DNSSEC, Security headers, MFA, audit logy — riešenia pripravené pre štátny aj korporátny sektor.",
      areaServed: "SK",
      serviceType: "Cybersecurity",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Performance: Preconnect & DNS Prefetch */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://image.pollinations.ai" />
        <link rel="preconnect" href="https://jxxzszwsxazcisgidziy.supabase.co" />

        {/* Preload LCP image */}
        <link rel="preload" as="image" href="/hero.png" />
      </head>
      <body className={`${outfit.variable} font-body antialiased bg-[#fcfcfc] mesh-gradient`}>
        <PWA />
        {children}
      </body>
    </html>
  );
}
