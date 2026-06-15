import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Zuperix – AI-Powered Digital Asset Management',
  description: 'Learn more about Zuperix\'s mission to build the leading AI-native, cloud-native DAM platform for creative teams.',
  openGraph: {
    title: 'About Zuperix – AI-Powered Digital Asset Management',
    description: 'Learn more about Zuperix\'s mission to build the leading AI-native, cloud-native DAM platform for creative teams.',
    url: 'https://zuperix.com/about',
  },
  twitter: {
    title: 'About Zuperix – AI-Powered Digital Asset Management',
    description: 'Learn more about Zuperix\'s mission to build the leading AI-native, cloud-native DAM platform for creative teams.',
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Zuperix",
    "description": "Learn more about Zuperix's mission to build the leading AI-native, cloud-native DAM platform for creative teams.",
    "url": "https://zuperix.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Zuperix",
      "url": "https://zuperix.com",
      "logo": "https://zuperix.com/logo_transparant.png",
      "sameAs": []
    }
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
