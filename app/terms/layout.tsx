import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service – Zuperix',
  description: 'Read the Terms of Service for Zuperix. By accessing or using our Services, you agree to be bound by these Terms.',
  openGraph: {
    title: 'Terms of Service – Zuperix',
    description: 'Read the Terms of Service for Zuperix. By accessing or using our Services, you agree to be bound by these Terms.',
    url: 'https://zuperix.com/terms',
  },
  twitter: {
    title: 'Terms of Service – Zuperix',
    description: 'Read the Terms of Service for Zuperix. By accessing or using our Services, you agree to be bound by these Terms.',
  }
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Zuperix Terms of Service",
    "description": "Read the Terms of Service for Zuperix. By accessing or using our Services, you agree to be bound by these Terms.",
    "url": "https://zuperix.com/terms"
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
