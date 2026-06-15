import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { CreativeWorkflows } from "@/components/creative-workflows"
import { WebhooksSection } from "@/components/webhooks-section"
import { McpSection } from "@/components/mcp-section"
import { IntegrationsSection } from "@/components/integrations-section"
import { UseCases } from "@/components/use-cases"
import { ScreenshotsSection } from "@/components/screenshots-section"
import { Testimonials } from "@/components/testimonials"
import { Comparison } from "@/components/comparison"
import { Faq } from "@/components/faq"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zuperix",
    "url": "https://zuperix.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://zuperix.com/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Zuperix",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "description": "Search, tag, and manage images, videos, and files using AI-powered natural language. AI-powered DAM platform.",
    "offers": {
      "@type": "Offer",
      "price": "10",
      "priceCurrency": "USD",
      "description": "Bronze plan starting from $10/month."
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Hero />
        <Features />
        <HowItWorks />
        {/* <ScreenshotsSection /> */}
        {/* <CreativeWorkflows /> */}
        <WebhooksSection />
        <McpSection />
        <IntegrationsSection />
        <UseCases />
        <Comparison />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
