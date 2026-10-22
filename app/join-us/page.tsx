import type { Metadata } from 'next';
import { Navigation, Footer } from '@/components/sections';
import { CustomCursor, ScrollProgress } from '@/components/ui';
import { CareersSection } from '@/components/join/CareersSection';

export const metadata: Metadata = {
  title: 'Join Us — Careers & Open Internships',
  description:
    'Explore open remote internship and career opportunities at Majin Studios. Work directly with our founding team on digital marketing, business development, sales, and AI solutions.',
  alternates: {
    canonical: '/join-us/',
  },
  openGraph: {
    title: 'Join Us — Careers & Internships | Majin Studios',
    description:
      'Explore open remote internship opportunities at Majin Studios in Marketing, Growth, and Sales. Work directly with founders and build intelligent systems.',
    url: 'https://www.majinstudios.tech/join-us/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Join Us — Careers at Majin Studios',
      },
    ],
  },
};

export default function JoinUsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Join Us — Careers & Internships at Majin Studios',
    description:
      'Explore open remote internship and career opportunities at Majin Studios in Marketing, Business Development, and Sales.',
    url: 'https://www.majinstudios.tech/join-us/',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <main className="min-h-screen bg-universe">
        <CareersSection />
      </main>
      <Footer />
    </>
  );
}
