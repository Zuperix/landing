"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check, X, ArrowRight, Zap, Shield, Globe, Cpu } from "lucide-react"
import { motion } from "framer-motion"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { cn } from "@/lib/utils"

const PRICING_TIERS = [
  {
    name: "Platinum",
    price: "99",
    description: "For enterprises requiring maximum scale and dedicated intelligence.",
    features: [
      "Unlimited Assets & Collections",
      "Dedicated AI Cluster (Highest Priority)",
      "24/7 Priority Engineer Support",
      "Custom Webhooks & API Rate Limits",
      "SSO & SAML Authentication",
      "10TB Managed Cloud Storage",
    ],
    highlight: true,
    icon: Shield,
    cta: "Contact Sales",
  },
  {
    name: "Gold",
    price: "50",
    description: "For growing teams that need performance and advanced features.",
    features: [
      "Up to 100,000 Assets",
      "High-Priority AI Processing",
      "Business Hours Support",
      "Advanced Analytics & Insights",
      "Role-Based Access Control",
      "1TB Managed Cloud Storage",
    ],
    icon: Zap,
    cta: "Start 14-day Trial",
  },
  {
    name: "Silver",
    price: "25",
    description: "Perfect for small teams and professionals.",
    features: [
      "Up to 25,000 Assets",
      "Standard AI Processing",
      "Email Support",
      "Up to 5 Team Members",
      "Basic Search Syntax",
      "250GB Managed Cloud Storage",
    ],
    icon: Globe,
    cta: "Start 14-day Trial",
  },
  {
    name: "Bronze",
    price: "10",
    description: "Essential tools for individual creators.",
    features: [
      "Up to 5,000 Assets",
      "Essential AI Tagging",
      "Community Support",
      "Single User License",
      "Standard Performance",
      "50GB Managed Cloud Storage",
    ],
    icon: Cpu,
    cta: "Get Started",
  },
]

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-4"
            >
              Most Affordable AI DAM in Market
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Simple, transparent pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty"
            >
              Enterprise-grade DAM features at a fraction of the cost. Zuperix is the most affordable AI-powered digital asset management platform in the market today.
            </motion.p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="h-full"
              >
                <SpotlightCard className={cn(
                  "h-full flex flex-col p-6 sm:p-8 transition-all duration-300",
                  tier.highlight ? "border-brand/50 shadow-lg shadow-brand/5" : "border-border/50"
                )}>
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                      tier.highlight ? "bg-brand text-white" : "bg-brand/10 text-brand"
                    )}>
                      <tier.icon className="w-6 h-6" />
                    </div>
                    {tier.highlight && (
                      <span className="text-[10px] font-bold text-brand tracking-widest uppercase bg-brand/10 px-2 py-1 rounded-full border border-brand/20">
                        Enterprise
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground text-sm">/mo</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-8 line-clamp-2">
                    {tier.description}
                  </p>

                  <div className="flex-1 mb-8">
                    <ul className="space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className={cn(
                      "w-full h-12 text-sm font-semibold rounded-xl transition-all active:scale-95 group",
                      tier.highlight
                        ? "bg-brand hover:bg-brand-dim text-white border-0"
                        : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                    )}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {/* Cloud vs Self-Host Comparison Table */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Cloud vs. Self-Hosted</h2>
              <p className="text-muted-foreground">Whatever your infrastructure needs, Zuperix has you covered.</p>
            </div>

            <div className="rounded-2xl border border-border overflow-hidden bg-card/50 backdrop-blur-sm">
              <div className="grid grid-cols-3 border-b border-border bg-secondary/30">
                <div className="p-4 sm:p-6 text-sm font-semibold uppercase tracking-wider">Feature</div>
                <div className="p-4 sm:p-6 text-sm font-semibold uppercase tracking-wider text-center border-l border-border">Self-Hosted (AGPL)</div>
                <div className="p-4 sm:p-6 text-sm font-semibold uppercase tracking-wider text-center border-l border-border bg-brand/5">Zuperix Cloud</div>
              </div>

              {[
                { feature: "Full Data Ownership", oss: true, cloud: true },
                { feature: "AI Processing", oss: "Your hardware", cloud: "Optimized GPU Cluster" },
                { feature: "Infrastructure Management", oss: "Manual", cloud: "Handled by us" },
                { feature: "Automatic Backups", oss: "Manual", cloud: "Included" },
                { feature: "Security Patching", oss: "Self-managed", cloud: "Automated" },
                { feature: "API Access", oss: true, cloud: true },
                { feature: "Priority Support", oss: false, cloud: true },
              ].map((row, i) => (
                <div key={row.feature} className={cn("grid grid-cols-3 border-b border-border hover:bg-white/[0.02] transition-colors", i === 6 && "border-b-0")}>
                  <div className="p-4 sm:p-6 text-sm font-medium">{row.feature}</div>
                  <div className="p-4 sm:p-6 text-center border-l border-border text-sm text-muted-foreground italic">
                    {typeof row.oss === "boolean" ? (row.oss ? <Check className="w-4 h-4 mx-auto text-green-500" /> : <X className="w-4 h-4 mx-auto text-red-500" />) : row.oss}
                  </div>
                  <div className="p-4 sm:p-6 text-center border-l border-border text-sm font-medium bg-brand/[0.02]">
                    {typeof row.cloud === "boolean" ? (row.cloud ? <Check className="w-4 h-4 mx-auto text-brand" /> : <X className="w-4 h-4 mx-auto text-red-500" />) : row.cloud}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  q: "What is the GNU AGPL v3?",
                  a: "The GNU Affero General Public License (AGPL) is a strong copyleft license. It ensures Zuperix is fully open source and any modifications made to the software for network use must be shared back with the community."
                },
                {
                  q: "Can I use Zuperix for free?",
                  a: "Yes! Zuperix is free to download, modify, and self-host under the AGPLv3. Our Cloud plans are for those who want a managed, optimized experience without the ops overhead."
                },
                {
                  q: "Do you offer a discount for non-profits?",
                  a: "Absolutely. We offer 50% off all our cloud plans for verified non-profit organizations and educational institutions."
                },
                {
                  q: "What happens after the 14-day trial?",
                  a: "You'll have the choice to subscribe to a plan to continue using the cloud version. If you choose not to, your data will be available for export for 30 days."
                }
              ].map((faq) => (
                <div key={faq.q} className="p-6 rounded-2xl bg-secondary/20 border border-border/50">
                  <h3 className="font-semibold text-foreground mb-3">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud vs Open Source Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-secondary/20 p-8 sm:p-12 text-center lg:text-left overflow-hidden relative"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">100% Open source at its heart</h2>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl text-pretty">
                  Zuperix is licensed under the GNU AGPL v3. We believe in data ownership and the power of the open-source community. 
                  This ensures that the project stays open and collaborative forever, protecting it from becoming closed-source.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm font-medium">Auto-backups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm font-medium">AI-optimized Hardware</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm font-medium">99.9% Uptime SLA</span>
                  </div>
                </div>
              </div>
              <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
                <Button className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 font-bold rounded-xl active:scale-95 transition-all" asChild>
                  <Link href="https://github.com/zuperix/zuperix" target="_blank" rel="noopener noreferrer">
                    Self-Host Zuperix
                  </Link>
                </Button>
                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">
                  Community Edition
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
