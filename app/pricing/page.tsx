"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check, X, ArrowRight, Zap, Shield, Globe, Cpu, Medal, TimerIcon } from "lucide-react"
import { motion } from "framer-motion"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { cn } from "@/lib/utils"

const PRICING_TIERS = [
  {
    name: "Gold",
    monthlyPrice: "99",
    yearlyPrice: "990",
    description: "Ideal for growing teams that need powerful features and reliable performance.",
    features: [
      "Unlimited Users",
      "SSO Authentication",
      "Advanced Natural Language Search",
      "Facial Recognition",
      "Advanced Integrations",
      "Business Hours Priority Support",
      "99.9% Uptime SLA",
      "1TB Cloud Storage",
    ],
    icon: Medal,
    iconColor: "text-yellow-400",
    cta: "Coming Soon",
  },
  {
    name: "Silver",
    monthlyPrice: "25",
    yearlyPrice: "249",
    description: "Great for small teams looking to stay organized and move faster.",
    features: [
      "Up to 25 Users",
      "Smart Natural Language Search",
      "OCR Search",
      "Basic Integrations",
      "Public API & Webhooks",
      "Email Support",
      "500GB Cloud Storage",
    ],
    highlight: true,
    icon: Medal,
    iconColor: "text-slate-300",
    cta: "Start Free Trial",
  },
  {
    name: "Bronze",
    monthlyPrice: "10",
    yearlyPrice: "99",
    description: "Simple and affordable plan for individuals and early-stage projects.",
    features: [
      "Up to 5 Users",
      "Basic Search Features",
      "Workflow Automation",
      "Public Sharing Portals",
      "Community Support",
      "Text Extraction",
      "50GB Cloud Storage",
    ],
    icon: Medal,
    iconColor: "text-orange-700",
    cta: "Get Started",
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">("YEARLY")

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm"
            >
              🔥 Limited-time yearly discount — 2 MONTHS FREE
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Professional DAM, <span className="text-brand">Transparent</span> Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty mb-10"
            >
              Enterprise-grade DAM features at a fraction of the cost. Zuperix is the most affordable AI-powered digital asset management platform.
            </motion.p>

            {/* Billing Toggle */}
            <div className="flex flex-col items-center gap-4 mb-16">
              <div className="relative flex items-center bg-secondary/50 p-1.5 rounded-2xl border border-border/50 shadow-sm">
                <button
                  onClick={() => setBillingCycle("MONTHLY")}
                  className={cn(
                    "relative px-6 py-2 text-xs font-bold transition-all duration-300 rounded-xl",
                    billingCycle === "MONTHLY" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("YEARLY")}
                  className={cn(
                    "relative px-6 py-2 text-xs font-bold transition-all duration-300 rounded-xl flex items-center gap-2",
                    billingCycle === "YEARLY" ? "bg-brand text-white shadow-xl shadow-brand/20" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Yearly
                  <span className={cn(
                    "text-[9px] px-1.5 py-0.5 rounded-md",
                    billingCycle === "YEARLY" ? "bg-white/20 text-white" : "bg-brand/10 text-brand"
                  )}>
                    -16% OFF
                  </span>
                </button>
              </div>
              <div className="flex items-center gap-6 text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">
                 <div className="flex items-center gap-1.5">
                   <Check className="w-3 h-3 text-emerald-500" /> Cancel anytime
                 </div>
                 <div className="flex items-center gap-1.5">
                   <Check className="w-3 h-3 text-emerald-500" /> No hidden fees
                 </div>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="h-full relative"
              >
                {tier.name === "Silver" && billingCycle === "YEARLY" && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-brand text-white text-[10px] font-black uppercase tracking-[0.2em] py-1.5 px-4 rounded-full shadow-lg shadow-brand/30 border border-white/20">
                      Best Value
                    </div>
                  </div>
                )}
                
                <SpotlightCard className={cn(
                  "h-full flex flex-col p-6 sm:p-8 transition-all duration-300 border-border/50 overflow-hidden",
                  tier.name === "Silver" ? "border-brand/40 shadow-2xl shadow-brand/5 ring-1 ring-brand/10" : "hover:border-border"
                )}>
                  <div className="flex items-center justify-between mb-8">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-inner",
                      tier.name === "Silver" ? "bg-brand/10 text-brand" : "bg-secondary text-foreground"
                    )}>
                      <tier.icon className={cn("w-6 h-6", tier.iconColor)} />
                    </div>
                    {billingCycle === "YEARLY" && (
                      <div className="flex flex-col items-end gap-1">
                        <span className={cn(
                          "text-[10px] font-black text-emerald-400 tracking-tighter bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20 shadow-sm"
                        )}>
                          2 MONTHS FREE
                        </span>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-70">
                          Save ${tier.name === 'Gold' ? '198' : tier.name === 'Silver' ? '51' : '21'} yearly
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-2 tracking-tight">{tier.name}</h3>
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-5xl font-black tracking-tighter">
                      ${billingCycle === "MONTHLY" ? tier.monthlyPrice : Math.floor(Number(tier.yearlyPrice) / 12)}
                    </span>
                    <span className="text-muted-foreground text-xl font-bold">/mo</span>
                  </div>

                  {billingCycle === "YEARLY" && (
                    <p className="text-[11px] text-muted-foreground font-bold mb-8 uppercase tracking-wider flex items-center gap-2">
                       <span className="w-1 h-1 rounded-full bg-brand" />
                       Billed yearly at ${tier.yearlyPrice}
                    </p>
                  )}

                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="flex-1 mb-10">
                    <ul className="space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-4 text-sm font-medium">
                          <Check className={cn("w-5 h-5 shrink-0 mt-0.5 p-1 rounded-full bg-emerald-500/10 text-emerald-500")} />
                          <span className="text-foreground/80 leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    disabled={tier.cta === "Coming Soon" || tier.name === "Gold"}
                    className={cn(
                      "w-full h-14 text-sm font-black rounded-2xl transition-all active:scale-95 group shadow-xl uppercase tracking-widest",
                      tier.name === "Silver"
                        ? "bg-brand hover:bg-brand-dim text-white border-0 shadow-brand/20"
                        : "bg-secondary hover:bg-secondary/80 text-foreground border border-border",
                      (tier.cta === "Coming Soon" || tier.name === "Gold") && "opacity-50 grayscale cursor-not-allowed"
                    )}
                  >
                    {tier.name === "Gold" ? "Coming Soon" : tier.cta === "Start Free Trial" ? `Start ${tier.name} Trial` : tier.cta}
                    {(tier.cta !== "Coming Soon" && tier.name !== "Gold") && (
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Button>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {/* Storage Bundles Section */}
          <div className="max-w-4xl mx-auto mb-24 px-6">
            <div className="text-center mb-10">
               <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Need more space?</h2>
               <p className="text-muted-foreground text-sm">Add high-performance cloud storage to any plan starting from silver</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="p-6 rounded-3xl bg-secondary/10 border border-border/50 flex items-center justify-between group hover:border-brand/40 transition-all cursor-default">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                        <Zap className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-lg font-bold text-white">100GB Bundle</p>
                        <p className="text-xs text-muted-foreground">Standard Storage</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-2xl font-black text-white">$6</p>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">per month</p>
                  </div>
               </div>

               <div className="p-6 rounded-3xl bg-brand/5 border border-brand/20 flex items-center justify-between group hover:border-brand/60 transition-all relative overflow-hidden cursor-default">
                  <div className="absolute top-0 right-0">
                     <div className="bg-emerald-500 text-white text-[8px] font-black uppercase tracking-tighter py-1 px-4 rotate-45 translate-x-4 translate-y-1 shadow-sm">
                        Discounted
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center text-brand">
                        <Zap className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-lg font-bold text-white">500GB Bundle</p>
                        <p className="text-xs text-brand/70 font-semibold italic">Best Value Add-on</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-2xl font-black text-white">$25</p>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">per month</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Custom Plan Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 px-4"
          >
            <div className="max-w-7xl mx-auto rounded-3xl border border-border bg-secondary/5 p-8 sm:p-12 text-center lg:text-left hover:border-brand/30 transition-colors">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-border bg-background text-[10px] font-bold tracking-widest uppercase mb-4">
                    Enterprise
                  </div>
                  <h2 className="text-3xl font-bold mb-3 tracking-tight">Scale with Zuperix Enterprise</h2>
                  <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-pretty text-sm">
                    High-volume assets, custom infrastructure, and 24/7 priority support.
                  </p>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 mb-8">
                    {["SSO/SAML", "Private VPC", "Custom SLA", "24/7 Support"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs font-medium text-foreground/60">
                        <Check className="w-3.5 h-3.5 text-brand" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-center lg:items-end gap-5">
                  <Button className="h-11 px-8 bg-brand hover:bg-brand-dim text-white font-bold rounded-xl active:scale-95 transition-all group">
                    Coming Soon
                    <TimerIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

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
