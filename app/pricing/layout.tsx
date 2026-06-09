import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zuperix Pricing – Flexible Plans for AI-Powered DAM',
  description: 'Find the perfect plan for your digital asset management needs. From self-hosted open-source to fully managed AI-powered cloud plans.',
  openGraph: {
    title: 'Zuperix Pricing – Flexible Plans for AI-Powered DAM',
    description: 'Find the perfect plan for your digital asset management needs. From self-hosted open-source to fully managed AI-powered cloud plans.',
    url: 'https://zuperix.com/pricing',
  },
  twitter: {
    title: 'Zuperix Pricing – Flexible Plans for AI-Powered DAM',
    description: 'Find the perfect plan for your digital asset management needs. From self-hosted open-source to fully managed AI-powered cloud plans.',
  }
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Zuperix Pricing",
    "description": "Find the perfect plan for your digital asset management needs.",
    "url": "https://zuperix.com/pricing",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the GNU AGPL v3?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The GNU Affero General Public License (AGPL) is a strong copyleft license. It ensures Zuperix is fully open source and any modifications made to the software for network use must be shared back with the community."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use Zuperix for free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Zuperix is free to download, modify, and self-host under the AGPLv3. Our Cloud plans are for those who want a managed, optimized experience without the ops overhead."
          }
        },
        {
          "@type": "Question",
          "name": "Is our data secure in Zuperix?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We implement enterprise-grade security protocols, including AES-256-GCM encryption for sensitive data, secure OAuth authentication, and granular role-based access controls."
          }
        }
      ]
    }
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Zuperix Cloud",
    "description": "AI-Powered Digital Asset Management Cloud Plans",
    "image": "https://zuperix.com/logo_transparant.png",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "10",
      "highPrice": "99",
      "offerCount": "3",
      "offers": [
        {
          "@type": "Offer",
          "name": "Bronze Plan",
          "price": "10",
          "priceCurrency": "USD",
          "url": "https://zuperix.com/pricing"
        },
        {
          "@type": "Offer",
          "name": "Silver Plan",
          "price": "25",
          "priceCurrency": "USD",
          "url": "https://zuperix.com/pricing"
        },
        {
          "@type": "Offer",
          "name": "Gold Plan",
          "price": "99",
          "priceCurrency": "USD",
          "url": "https://zuperix.com/pricing"
        }
      ]
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {children}
    </>
  )
}
