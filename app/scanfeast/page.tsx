import type { Metadata } from 'next';
import ScanfeastCaseStudy from "@/components/scanfeast/ScanfeastCaseStudy";

export const metadata: Metadata = {
  title: 'ScanFeast — Smart Contactless Restaurant Ordering System',
  description: 'ScanFeast is a real-time contactless restaurant ordering platform connecting diners, kitchens, and restaurant management through web technology. Built by Majin Studios.',
  alternates: {
    canonical: '/scanfeast/',
  },
  openGraph: {
    title: 'ScanFeast — Smart Contactless Restaurant Ordering System',
    description: 'ScanFeast is a real-time contactless restaurant ordering platform connecting diners, kitchens, and restaurant management through web technology. Built by Majin Studios.',
    url: 'https://www.majinstudios.tech/scanfeast/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ScanFeast — Smart Contactless Restaurant Ordering System',
      },
    ],
  },
};

export default function ScanfeastPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'ScanFeast — Smart Contactless Restaurant Ordering System',
    description: 'ScanFeast is a real-time contactless restaurant ordering platform connecting diners, kitchens, and restaurant management through web technology. Built by Majin Studios.',
    url: 'https://www.majinstudios.tech/scanfeast/',
    isPartOf: {
      '@id': 'https://www.majinstudios.tech/#website',
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'ScanFeast',
      applicationCategory: 'BusinessApplication',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScanfeastCaseStudy />
    </>
  );
}
