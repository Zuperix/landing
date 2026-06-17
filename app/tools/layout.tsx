import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Digital Asset Tools – Zuperix",
  description: "Free client-side tools for digital assets. View/edit/strip EXIF image metadata, convert and compress image formats, and optimize vector SVGs.",
  keywords: [
    "free asset tools",
    "exif viewer online",
    "metadata stripper",
    "webp converter",
    "svg optimizer",
    "compress images online",
    "digital asset utilities",
    "image editor online"
  ],
  openGraph: {
    title: "Free Online Digital Asset Tools – Zuperix",
    description: "Free, private, client-side tools to view & edit EXIF metadata, convert image formats, and optimize SVGs entirely in your browser.",
    url: "https://zuperix.com/tools",
    images: [
      {
        url: "/og_image_zup.png",
        width: 1200,
        height: 630,
        alt: "Zuperix Free Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Digital Asset Tools – Zuperix",
    description: "Free, private, client-side tools to view & edit EXIF metadata, convert image formats, and optimize SVGs entirely in your browser.",
    images: ["/og_image_zup.png"],
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
