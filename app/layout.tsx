import type {
  Metadata,
  Viewport,
} from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default:
      'Majin Studios — Intelligent Digital Products',

    template:
      '%s | Majin Studios',
  },

  description:
    'Majin Studios builds AI systems, intelligent agents, full-stack applications, and custom software around real-world problems.',

  keywords: [
    'Majin Studios',
    'AI Systems',
    'AI Agents',
    'LLM Applications',
    'Agentic AI',
    'Full-Stack Development',
    'Digital Products',
    'Custom Software',
    'Software Engineering',
    'Product Studio',
  ],

  authors: [
    {
      name: 'Majin Studios',
    },
  ],

  creator: 'Majin Studios',

  metadataBase: new URL(
    'https://www.majinstudios.tech'
  ),

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',

    locale: 'en_US',

    url: 'https://www.majinstudios.tech',

    title:
      'Majin Studios — Intelligent Digital Products',

    description:
      'AI systems, intelligent agents, full-stack applications, and custom software engineered around real-world problems.',

    siteName: 'Majin Studios',

    images: [
      {
        url: '/og-image.png',

        width: 1200,

        height: 630,

        alt:
          'Majin Studios — Intelligent Digital Products',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title:
      'Majin Studios — Intelligent Digital Products',

    description:
      'We build AI systems, intelligent agents, digital products, and custom software.',

    images: [
      '/og-image.png',
    ],
  },

  robots: {
    index: true,

    follow: true,

    googleBot: {
      index: true,

      follow: true,

      'max-video-preview': -1,

      'max-image-preview':
        'large',

      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export const viewport: Viewport = {
  themeColor: '#050607',

  width: 'device-width',

  initialScale: 1,

  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://www.majinstudios.tech/#website',
      name: 'Majin Studios',
      url: 'https://www.majinstudios.tech/',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://www.majinstudios.tech/#organization',
      name: 'Majin Studios',
      url: 'https://www.majinstudios.tech/',
      logo: 'https://www.majinstudios.tech/logo.jpg',
      sameAs: [
        'https://in.linkedin.com/company/majin-studios',
        'https://www.instagram.com/majin_studios/',
        'https://x.com/Majin_Studios',
      ],
    },
  ];

  return (
    <html
      lang="en"
      data-accent="monochrome"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
