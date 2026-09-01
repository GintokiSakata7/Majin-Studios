import React from 'react';
import { QuantumArena } from '@/components/productpages/QuantumArena';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum Arena — Event Operations Platform',
  description: 'Quantum Arena is an end-to-end digital infrastructure and event operations platform supporting large-scale participant workflows, verification, and judging. Built by Majin Studios.',
  alternates: {
    canonical: '/quantumarena/',
  },
  openGraph: {
    title: 'Quantum Arena — Event Operations Platform',
    description: 'Quantum Arena is an end-to-end digital infrastructure and event operations platform supporting large-scale participant workflows, verification, and judging. Built by Majin Studios.',
    url: 'https://www.majinstudios.tech/quantumarena/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Quantum Arena — Event Operations Platform',
      },
    ],
  },
};

export default function QuantumArenaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Quantum Arena — Event Operations Platform',
    description: 'Quantum Arena is an end-to-end digital infrastructure and event operations platform supporting large-scale participant workflows, verification, and judging. Built by Majin Studios.',
    url: 'https://www.majinstudios.tech/quantumarena/',
    isPartOf: {
      '@id': 'https://www.majinstudios.tech/#website',
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Quantum Arena',
      applicationCategory: 'BusinessApplication',
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QuantumArena />
    </main>
  );
}
