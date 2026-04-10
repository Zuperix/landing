"use client"

import { Share2, Sparkles, Layout, ShieldCheck, LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { SpotlightCard } from "@/components/ui/spotlight-card"

interface Pillar {
  icon: LucideIcon
  title: string
  description: string
  pill: string
}

const pillars: Pillar[] = [
  {
    icon: Share2,
    title: "Seamless Collaboration",
    description: "Share assets instantly with your team and external partners via secure, customizable public portals.",
    pill: "Public Portals",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Discovery",
    description: "Find exactly what you need with natural language search, facial recognition, and visual similarity matches.",
    pill: "Smart Search",
  },
  {
    icon: Layout,
    title: "Vibrant Organization",
    description: "A content-centric UI designed specifically for visual assets, with borderless grids and hover-reveal actions.",
    pill: "Modern Grid",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Ownership",
    description: "Your creative assets stay yours. Secure, private data handling with full ownership of your media library.",
    pill: "Data Security",
  },
]

function FeaturePill({ text, index }: { text: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 + (index % 2) * 0.1 }}
      className="mt-auto pt-4"
    >
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand/10 text-brand border border-brand/20">
        {text}
      </span>
    </motion.div>
  )
}

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const Icon = pillar.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98] as const
      }}
      className="h-full"
    >
      <SpotlightCard className="h-full flex flex-col p-6 border-border/50 hover:border-brand/40 transition-colors duration-500">
        <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/15 group-hover:scale-110 transition-all duration-300 mb-4">
          <Icon className="w-5 h-5 text-brand" aria-hidden="true" />
        </div>
        <div className="flex-1 mb-2">
          <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-brand transition-colors tracking-tight">{pillar.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
        </div>
        <FeaturePill text={pillar.pill} index={index} />
      </SpotlightCard>
    </motion.div>
  )
}

export function CreativeWorkflows() {
  return (
    <section id="workflows" className="pt-16 sm:pt-32 pb-4 sm:pb-6 px-6" aria-labelledby="workflows-heading">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="lg:w-80 shrink-0 lg:sticky lg:top-24 mt-2"
          >
            <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">Creative-First</p>
            <h2
              id="workflows-heading"
              className="text-balance font-bold text-3xl sm:text-4xl text-foreground mb-5 tracking-tight"
            >
              Built for Creative Teams.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-pretty mb-6 text-sm sm:text-base">
              Zuperix is designed to handle the entire content lifecycle. From lightning-fast discovery to seamless team collaboration, it's the center of your creative universe.
            </p>

            {/* Workflow pills */}
            <div className="flex flex-wrap gap-2">
              {["Discovery", "Curation", "Collaboration", "Distribution", "Archiving"].map((stage, i) => (
                <motion.span
                  key={stage}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.05) }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground border border-border"
                >
                  {stage}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right: grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4" role="list" aria-label="Creative workflows">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} pillar={pillar} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
