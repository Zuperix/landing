import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Integrations – Zuperix DAM",
  description:
    "Connect Zuperix to Figma, Canva, Adobe Express, WordPress, Shopify, Google Drive, Chrome, and AI agents. Access your digital assets from every tool your team uses.",
  keywords: [
    "DAM integrations",
    "Figma DAM plugin",
    "Canva DAM app",
    "Adobe Express DAM",
    "WordPress DAM plugin",
    "Shopify DAM",
    "Chrome extension DAM",
    "MCP server DAM",
    "AI agent assets",
    "digital asset management integrations",
  ],
  openGraph: {
    title: "Integrations – Zuperix DAM",
    description:
      "Connect Zuperix to every tool your team uses. Access, insert, and manage your assets across design tools, browsers, CMSs, and AI agents.",
    url: "https://zuperix.com/integrations",
    images: [
      {
        url: "/og_image_zup.png",
        width: 1200,
        height: 630,
        alt: "Zuperix Integrations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrations – Zuperix DAM",
    description:
      "Connect Zuperix to Figma, Canva, Adobe Express, WordPress, Shopify, Google Drive, Chrome, and AI agents.",
    images: ["/og_image_zup.png"],
  },
}

export default function IntegrationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
