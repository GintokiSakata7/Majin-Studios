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

  icons: {
    icon: [
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },

  manifest: '/manifest.webmanifest',

  openGraph: {
    type: 'website',

    locale: 'en_IN',

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

  applicationName: 'Majin Studios',
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
      alternateName: 'Majin',
      url: 'https://www.majinstudios.tech/',
      publisher: {
        '@id': 'https://www.majinstudios.tech/#organization',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://www.majinstudios.tech/#organization',
      name: 'Majin Studios',
      url: 'https://www.majinstudios.tech/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.majinstudios.tech/logo.jpg',
        width: 1024,
        height: 1024,
      },
      image: 'https://www.majinstudios.tech/logo.jpg',
      description: 'Majin Studios is a product engineering studio based in Hyderabad, India that builds AI systems, intelligent agents, full-stack applications, and custom software around real-world problems.',
      email: 'hello@majin.studio',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressCountry: 'India'
      },
      sameAs: [
        'https://www.linkedin.com/company/majin-studios',
        'https://www.instagram.com/majin_studios/',
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