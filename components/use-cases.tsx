"use client"

import { Megaphone, Video, Building2, BrainCircuit, ArrowUpRight, LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { cn } from "@/lib/utils"

interface UseCase {
  icon: LucideIcon
  label: string
  title: string
  description: string
  stat: string
  statLabel: string
}

const useCases: UseCase[] = [
  {
    icon: Megaphone,
    label: "Marketing teams",
    title: "Stop hunting for the right asset",
    description:
      "Find campaign-ready assets instantly using plain English. No more shared drives chaos.",
    stat: "10x",
    statLabel: "faster asset discovery",
  },
  {
    icon: Video,
    label: "Content creators",
    title: "Your entire library at your fingertips",
    description:
      "Search thousands of clips, images, and files the same way you'd describe them to a colleague.",
    stat: "50k+",
    statLabel: "creators using Zuperix",
  },
  {
    icon: Building2,
    label: "Enterprise",
    title: "Manage at scale with confidence",
    description:
      "Activity logs, permissions, and enterprise-grade search across millions of assets in any format.",
    stat: "99.9%",
    statLabel: "uptime SLA",
  },
  {
    icon: BrainCircuit,
    label: "AI pipelines",
    title: "Structured assets for your models",
    description:
      "Pull tagged, extracted, and categorized assets via API. Pre-built for RAG and fine-tuning workflows.",
    stat: "< 50ms",
    statLabel: "API response time",
  },
]

function UseCaseCard({ useCase, index }: { useCase: UseCase; index: number }) {
  const Icon = useCase.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay: (index % 4) * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98] as const
      }}
      className="h-full"
    >
      <SpotlightCard className="h-full flex flex-col p-6 border-border/50 hover:border-brand/40 transition-colors duration-500">
        <div className="relative flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/15 group-hover:scale-105 transition-all duration-300">
              <Icon className="w-5 h-5 text-brand" aria-hidden="true" />
            </div>
            <span className="text-xs font-semibold text-brand tracking-wide uppercase">{useCase.label}</span>
          </div>
          <ArrowUpRight 
            className="w-4 h-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" 
            aria-hidden="true" 
          />
        </div>
        
        <div className="relative flex-1">
          <h3 className="font-semibold text-lg text-foreground leading-snug mb-2 group-hover:text-brand transition-colors">
            {useCase.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
        </div>
        
        <div className="relative pt-4 mt-6 border-t border-border/50">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{useCase.stat}</span>
            <span className="text-sm text-muted-foreground">{useCase.statLabel}</span>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export function UseCases() {
  return (
    <section id="use-cases" className="py-24 sm:py-32 px-6 bg-secondary/30" aria-labelledby="use-cases-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          className="text-center mb-16"
        >
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">Use cases</p>
          <h2 
            id="use-cases-heading"
            className="text-balance font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5"
          >
            Built for every team
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty leading-relaxed">
            Whether you manage 500 images or 50 million assets, Zuperix scales with you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Use cases">
          {useCases.map((uc, index) => (
            <UseCaseCard key={uc.label} useCase={uc} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
