"use client"

import { Terminal, Puzzle, Database, Server, Copy, Check, LucideIcon } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { SpotlightCard } from "@/components/ui/spotlight-card"

interface Pillar {
  icon: LucideIcon
  title: string
  description: string
  code: string
}

const pillars: Pillar[] = [
  {
    icon: Terminal,
    title: "API-first architecture",
    description: "Every feature accessible via REST API. Integrate Zuperix into any workflow or product.",
    code: `GET /api/v1/assets?q=red+car+at+night
&type=image&sort=relevance`,
  },
  {
    icon: Puzzle,
    title: "Easy integration",
    description: "SDKs, webhooks, and event streams. Connect to your existing pipeline in minutes.",
    code: `npm install @zuperix/sdk`,
  },
  {
    icon: Database,
    title: "Scalable backend",
    description: "Built on Node/NestJS, OpenSearch, and Postgres. Handles millions of assets without breaking a sweat.",
    code: `NestJS · OpenSearch · PostgreSQL`,
  },
  {
    icon: Server,
    title: "Self-hostable",
    description: "Your data stays yours. Deploy on any cloud or on-premise with Docker Compose in minutes.",
    code: `docker compose up zuperix`,
  },
]

function CodeBlock({ code, index }: { code: string; index: number }) {
  const [copied, setCopied] = useState(false)
  const canCopy = code.startsWith("npm") || code.startsWith("docker") || code.startsWith("GET")

  const handleCopy = () => {
    navigator.clipboard.writeText(code.replace(/\n/g, " ").trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 + (index % 2) * 0.1 }}
      className="relative group/code mt-auto"
    >
      <code className="font-mono text-xs text-brand bg-brand/5 border border-brand/10 rounded-lg px-3 py-2.5 block whitespace-pre-wrap break-all leading-relaxed transition-colors group-hover/code:bg-brand/10">
        {code}
      </code>
      {canCopy && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-md bg-background/80 border border-border opacity-0 group-hover/code:opacity-100 hover:bg-accent transition-all text-muted-foreground hover:text-foreground cursor-pointer"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      )}
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
        <div className="flex-1 mb-4">
          <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-brand transition-colors">{pillar.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
        </div>
        <CodeBlock code={pillar.code} index={index} />
      </SpotlightCard>
    </motion.div>
  )
}

export function DeveloperFirst() {
  return (
    <section id="developers" className="pt-16 sm:pt-32 pb-4 sm:pb-6 px-6" aria-labelledby="developers-heading">
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
            <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">Developer-first</p>
            <h2
              id="developers-heading"
              className="text-balance font-bold text-3xl sm:text-4xl text-foreground mb-5"
            >
              Built for builders.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-pretty mb-6 text-sm sm:text-base">
              Zuperix is a fully open-source platform under the GNU AGPL v3. Extend it, fork it, self-host it — the project stays open for the community, forever.
            </p>

            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "NestJS", "OpenSearch", "PostgreSQL", "Docker"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.05) }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground border border-border"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right: grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4" role="list" aria-label="Developer features">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} pillar={pillar} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
