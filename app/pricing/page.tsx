"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check, X, ArrowRight, Zap, Globe, Medal } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Faq } from "@/components/faq"

const PRICING_FAQS = [
  {
    question: "Do you offer a free trial?",
    answer: "Yes! We offer a 14-day free trial on all plans so you can test all features and see how Zuperix fits into your workflow."
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your billing dashboard. Changes will be prorated."
  },
  {
    question: "Do you offer a discount for non-profits?",
    answer: "Absolutely. We offer 50% off all our cloud plans for verified non-profit organizations and educational institutions."
  },
  {
    question: "What happens after the 14-day trial?",
    answer: "You'll have the choice to subscribe to a plan to continue using the cloud version. If you choose not to, your data will be available for export for 30 days."
  },
  {
    question: "What exactly is a Digital Asset Management (DAM) system?",
    answer: "A DAM is a centralized hub for storing, organizing, finding, and sharing your organization's digital content. Unlike generic cloud storage, Zuperix provides advanced metadata, AI-powered discovery, and professional distribution tools designed specifically for creative and marketing assets."
  },
  {
    question: "Is our data secure in Zuperix?",
    answer: "Absolutely. We implement enterprise-grade security protocols, including AES-256-GCM encryption for sensitive data, secure OAuth authentication, and granular role-based access controls. Your assets are stored in secure, encrypted environments."
  }
]

const PRICING_TIERS = [
  {
    name: "Gold",
    monthlyPrice: "99",
    yearlyPrice: "990",
    description: "Ideal for growing teams that need powerful features and reliable performance.",
    features: [
      "Advanced Natural Language Search",
      "Facial Recognition",
      "Video Transcription (1,500 min/mo)",
      "1M API calls/mo",
      "2TB Cloud Storage",
      "Unlimited Workspaces",
      "99.9% SLA",
    ],
    icon: Medal,
    iconColor: "text-yellow-400",
    cta: "Start Free Trial",
  },
  {
    name: "Silver",
    monthlyPrice: "25",
    yearlyPrice: "249",
    description: "Great for small teams looking to stay organized and move faster.",
    features: [
      "OCR and Text Extraction",
      "Video Transcription (150 min/mo)",
      "100K API calls/mo",
      "5 Workspaces",
      "5+ Integrations",
      "MCP Support",
      "Public API & Webhooks",
      "250GB Cloud Storage",
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
      "1 Workspace",
      "Unlimited Users",
      "Essential Search & Filtering",
      "Workflow Automation",
      "Public Sharing Portals",
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
                    disabled={tier.cta === "Coming Soon"}
                    className={cn(
                      "w-full h-14 text-sm font-black rounded-2xl transition-all active:scale-95 group shadow-xl uppercase tracking-widest",
                      tier.name === "Silver"
                        ? "bg-brand hover:bg-brand-dim text-white border-0 shadow-brand/20"
                        : "bg-secondary hover:bg-secondary/80 text-foreground border border-border",
                      tier.cta === "Coming Soon" && "opacity-50 grayscale cursor-not-allowed"
                    )}
                  >
                    {tier.cta === "Start Free Trial" ? `Start ${tier.name} Trial` : tier.cta}
                    {tier.cta !== "Coming Soon" && (
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Button>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {/* Detailed Feature Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 overflow-x-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 tracking-tight">Compare all features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Compare every detail of our plans and find the one that fits your workflow perfectly.</p>
            </div>

            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="py-6 px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Feature</th>
                  <th className="py-6 px-4 text-center">
                    <span className="text-lg font-bold">Gold</span>
                  </th>
                  <th className="py-6 px-4 text-center bg-brand/5 border-x border-brand/20 rounded-t-3xl">
                    <span className="text-lg font-bold text-brand">Silver</span>
                  </th>
                  <th className="py-6 px-4 text-center">
                    <span className="text-lg font-bold">Bronze</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {/* Asset Management Group */}
                <tr className="bg-secondary/20">
                  <td colSpan={4} className="py-4 px-4 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">Asset Management</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Unlimited Users</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><Check className="w-5 h-5 mx-auto text-brand" /></td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Folders & Vaults</td>
                  <td className="py-5 px-4 text-center text-sm font-semibold">Unlimited</td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20 text-sm font-semibold">Unlimited</td>
                  <td className="py-5 px-4 text-center text-sm font-semibold">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Branded Sharing Portals</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><Check className="w-5 h-5 mx-auto text-brand" /></td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Asset Versioning</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><Check className="w-5 h-5 mx-auto text-brand" /></td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Advanced Permissions</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><Check className="w-5 h-5 mx-auto text-brand" /></td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Role-Based Access (RBAC)</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><Check className="w-5 h-5 mx-auto text-brand" /></td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Custom Metadata Schemas</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><Check className="w-5 h-5 mx-auto text-brand" /></td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Bulk Metadata Import</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><Check className="w-5 h-5 mx-auto text-brand" /></td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Deleted Asset Retention</td>
                  <td className="py-5 px-4 text-center text-sm font-bold tracking-tight text-foreground/80">30 days</td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20 text-sm font-bold tracking-tight text-brand">30 days</td>
                  <td className="py-5 px-4 text-center text-sm font-bold tracking-tight text-foreground/80">7 days</td>
                </tr>

                {/* AI & Search Group */}
                <tr className="bg-secondary/20">
                  <td colSpan={4} className="py-4 px-4 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">AI & Search</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Search & Discovery</td>
                  <td className="py-5 px-4 text-center text-xs font-bold uppercase">Full Neural</td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20 text-xs font-bold uppercase">Advanced</td>
                  <td className="py-5 px-4 text-center text-xs font-bold uppercase">Essential</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">OCR & Text Extraction</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><Check className="w-5 h-5 mx-auto text-brand" /></td>
                  <td className="py-5 px-4 text-center"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Video Transcription</td>
                  <td className="py-5 px-4 text-center text-sm font-bold">1,500 min/mo</td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20 text-sm font-bold">150 min/mo</td>
                  <td className="py-5 px-4 text-center"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Facial Recognition</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                  <td className="py-5 px-4 text-center"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Visual Similarity Search</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                  <td className="py-5 px-4 text-center"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                </tr>

                {/* Integrations Group */}
                <tr className="bg-secondary/20">
                  <td colSpan={4} className="py-4 px-4 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">Integrations</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Integrations Included</td>
                  <td className="py-5 px-4 text-center text-sm font-bold tracking-tight">15+ (All)</td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20 text-sm font-bold tracking-tight text-brand">5+ Integrations</td>
                  <td className="py-5 px-4 text-center text-sm font-bold tracking-tight text-muted-foreground/60">Essential Only</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Google Drive Integration</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><Check className="w-5 h-5 mx-auto text-brand" /></td>
                  <td className="py-5 px-4 text-center"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Public API & Webhooks</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><Check className="w-5 h-5 mx-auto text-brand" /></td>
                  <td className="py-5 px-4 text-center"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">API Request Limit</td>
                  <td className="py-5 px-4 text-center text-sm font-bold tracking-tight">1M / mo</td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20 text-sm font-bold tracking-tight text-brand">100K / mo</td>
                  <td className="py-5 px-4 text-center text-sm font-bold tracking-tight text-rose-500/80">0 / mo</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">MCP Support</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><Check className="w-5 h-5 mx-auto text-brand" /></td>
                  <td className="py-5 px-4 text-center"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Zapier Integration</td>
                  <td className="py-5 px-4 text-center"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                  <td className="py-5 px-4 text-center"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                </tr>

                {/* Infrastructure Group */}
                <tr className="bg-secondary/20">
                  <td colSpan={4} className="py-4 px-4 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">Infrastructure</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Included Storage</td>
                  <td className="py-5 px-4 text-center text-sm font-bold tracking-tight">2 TB</td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20 text-sm font-bold tracking-tight">250 GB</td>
                  <td className="py-5 px-4 text-center text-sm font-bold tracking-tight">50 GB</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Included Workspaces</td>
                  <td className="py-5 px-4 text-center text-sm font-bold tracking-tight">Unlimited</td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20 text-sm font-bold tracking-tight text-brand">5</td>
                  <td className="py-5 px-4 text-center text-sm font-bold tracking-tight">1</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Duplicate Manager</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><Check className="w-5 h-5 mx-auto text-brand" /></td>
                  <td className="py-5 px-4 text-center"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Workflow Automation</td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20"><Check className="w-5 h-5 mx-auto text-brand" /></td>
                  <td className="py-5 px-4 text-center"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-sm font-medium">Uptime Guarantee</td>
                  <td className="py-5 px-4 text-center text-xs font-bold uppercase text-emerald-400">99.9% SLA</td>
                  <td className="py-5 px-4 text-center bg-brand/5 border-x border-brand/20 text-xs font-bold uppercase">BASIC</td>
                  <td className="py-5 px-4 text-center"><X className="w-4 h-4 mx-auto text-muted-foreground/30" /></td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          {/* Questions/Doubts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto mb-24 px-4"
          >
            <div className="rounded-3xl bg-brand/5 border border-brand/20 p-8 sm:p-10 text-center relative overflow-hidden group hover:border-brand/40 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transition-transform group-hover:scale-110 duration-700">
                <Globe className="w-32 h-32 text-brand" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3 tracking-tight">Still have more doubts?</h3>
                <p className="text-muted-foreground text-base mb-8 max-w-xl mx-auto text-pretty">
                  Not sure which plan is right for you? Schedule a discovery call with our experts to discuss your custom needs and infrastructure requirements.
                </p>
                <Button className="bg-brand hover:bg-brand-dim text-white font-bold rounded-2xl px-10 h-14 shadow-xl shadow-brand/20 transition-all active:scale-95 group uppercase tracking-widest text-sm" asChild>
                  <Link href="https://calendly.com/zuperix18/30min" target="_blank" rel="noopener noreferrer">
                    Talk with an Expert
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

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
                  <p className="text-2xl font-black text-white">$10</p>
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
                    {["SSO/SAML", "Private VPC", "Custom API Limits", "Custom SLA", "24/7 Support"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs font-medium text-foreground/60">
                        <Check className="w-3.5 h-3.5 text-brand" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-center lg:items-end gap-5">
                  <Button className="h-11 px-8 bg-brand hover:bg-brand-dim text-white font-bold rounded-xl active:scale-95 transition-all group" asChild>
                    <Link href="https://calendly.com/zuperix18/30min" target="_blank" rel="noopener noreferrer">
                      Talk with an Expert
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Frequently Asked Questions */}
          <Faq items={PRICING_FAQS} />
        </div>
      </main>
      <Footer />
    </>
  )
}
