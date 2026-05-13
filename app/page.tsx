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
  return (
    <>
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
