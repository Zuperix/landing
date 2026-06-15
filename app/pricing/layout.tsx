import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zuperix Pricing – Flexible Plans for AI-Powered DAM',
  description: 'Find the perfect plan for your digital asset management needs. Choose from flexible AI-powered plans designed for growing teams.',
  openGraph: {
    title: 'Zuperix Pricing – Flexible Plans for AI-Powered DAM',
    description: 'Find the perfect plan for your digital asset management needs. Choose from flexible AI-powered plans designed for growing teams.',
    url: 'https://zuperix.com/pricing',
  },
  twitter: {
    title: 'Zuperix Pricing – Flexible Plans for AI-Powered DAM',
    description: 'Find the perfect plan for your digital asset management needs. Choose from flexible AI-powered plans designed for growing teams.',
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
          "name": "Do you offer a free trial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer a 14-day free trial on all plans so you can test all the AI-powered features."
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
