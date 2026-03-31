import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://zuperix.com'),
  title: 'Zuperix – AI-Powered Digital Asset Management',
  description: 'Search, tag, and manage images, videos, and files using AI-powered natural language. Fully open-source DAM platform under the GNU AGPL v3.',
  keywords: ['digital asset management', 'DAM', 'AI', 'open source', 'AGPL', 'self-hosted', 'asset management', 'image tagging', 'OCR', 'face recognition', 'natural language search'],
  authors: [{ name: 'Zuperix Team' }],
  icons: {
    icon: [
      { url: '/logo_transparant.png', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zuperix.com',
    siteName: 'Zuperix',
    title: 'Zuperix – AI-Powered Digital Asset Management',
    description: 'Search, tag, and manage images, videos, and files using AI-powered natural language. Open-source, self-hostable, developer-first.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zuperix - AI-Powered Digital Asset Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zuperix – AI-Powered Digital Asset Management',
    description: 'Search, tag, and manage images, videos, and files using AI-powered natural language.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zuperix",
    "url": "https://zuperix.com",
    "logo": "https://zuperix.com/logo_transparant.png",
    "sameAs": [
      "https://github.com/zuperix/zuperix"
    ]
  }

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
