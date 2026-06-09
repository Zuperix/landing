import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zuperix Product Roadmap – What\'s Next',
  description: 'Follow our journey and upcoming features for Zuperix. Check out what features are already live and our structured timeline of upcoming releases.',
  openGraph: {
    title: 'Zuperix Product Roadmap – What\'s Next',
    description: 'Follow our journey and upcoming features for Zuperix. Check out what features are already live and our structured timeline of upcoming releases.',
    url: 'https://zuperix.com/roadmap',
  },
  twitter: {
    title: 'Zuperix Product Roadmap – What\'s Next',
    description: 'Follow our journey and upcoming features for Zuperix. Check out what features are already live and our structured timeline of upcoming releases.',
  }
}

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Zuperix Product Roadmap",
    "description": "Follow our journey and upcoming features for Zuperix.",
    "url": "https://zuperix.com/roadmap"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
