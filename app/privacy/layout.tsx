import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy – Zuperix',
  description: 'Read the privacy policy for Zuperix. We are committed to protecting your personal information and your right to privacy.',
  openGraph: {
    title: 'Privacy Policy – Zuperix',
    description: 'Read the privacy policy for Zuperix. We are committed to protecting your personal information and your right to privacy.',
    url: 'https://zuperix.com/privacy',
  },
  twitter: {
    title: 'Privacy Policy – Zuperix',
    description: 'Read the privacy policy for Zuperix. We are committed to protecting your personal information and your right to privacy.',
  }
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Zuperix Privacy Policy",
    "description": "Read the privacy policy for Zuperix. We are committed to protecting your personal information and your right to privacy.",
    "url": "https://zuperix.com/privacy"
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
