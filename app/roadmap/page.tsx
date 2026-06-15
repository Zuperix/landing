"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Search, Shield, Zap, Sparkles, Sliders, Play, Share2, Layers, Database, Paintbrush, Code2, Eye, BarChart3, EyeOff } from "lucide-react"

interface RoadmapItem {
  id: string
  title: string
  description: string
  category: "AI" | "Core" | "Integration" | "Performance" | "Security"
  icon: any
  status: "now" | "this-quarter" | "next-quarter" | "next-to-next" | "future"
}

const ROADMAP_ITEMS: RoadmapItem[] = [
  // NOW
  {
    id: "webhooks-api",
    title: "Webhooks & Public API",
    description: "Connect Zuperix to your own systems or custom flows with our developer-friendly REST API and instant webhooks.",
    category: "Integration",
    icon: Share2,
    status: "now"
  },
  {
    id: "rbac",
    title: "Role-Based Access Control",
    description: "Keep your assets secure by assigning clear permissions (Viewer, Editor, Owner) to your team members.",
    category: "Security",
    icon: Shield,
    status: "now"
  },
  {
    id: "audit-logs",
    title: "System Audit Logs",
    description: "Track exactly who accessed, downloaded, or updated any asset in your workspace with detailed history logs.",
    category: "Security",
    icon: Layers,
    status: "now"
  },
  {
    id: "wp-plugin",
    title: "WordPress DAM Plugin",
    description: "Replace the native WordPress media library with Zuperix to search and insert assets directly from your posts.",
    category: "Integration",
    icon: Code2,
    status: "now"
  },
  {
    id: "ai-search",
    title: "AI Natural Language Search",
    description: "Search your entire library using plain English descriptions instead of memorizing exact filenames.",
    category: "AI",
    icon: Search,
    status: "now"
  },
  {
    id: "face-rec",
    title: "Facial Recognition",
    description: "Automatically identify and group recurring people across your uploaded images for fast retrieval.",
    category: "AI",
    icon: Eye,
    status: "now"
  },
  {
    id: "dedup",
    title: "Automatic Deduplication",
    description: "Ensure a clean workspace with automatic visual and file hash checks that prevent duplicate uploads.",
    category: "Core",
    icon: Database,
    status: "now"
  },

  // THIS QUARTER
  {
    id: "figma-shopify",
    title: "Figma & Shopify Integration",
    description: "Direct sync connections to pull assets into your Figma designs or publish product images directly to Shopify.",
    category: "Integration",
    icon: Sparkles,
    status: "this-quarter"
  },
  {
    id: "canva-adobe",
    title: "Canva & Adobe Express Plugins",
    description: "Access your entire Zuperix media library directly inside Canva and Adobe Express editor sidebars.",
    category: "Integration",
    icon: Paintbrush,
    status: "this-quarter"
  },
  {
    id: "improve-ai-search",
    title: "Improving AI Search",
    description: "Upgrading our core AI search indexing with OpenSearch to support hybrid vector matching at scale.",
    category: "AI",
    icon: Search,
    status: "this-quarter"
  },

  // NEXT QUARTER
  {
    id: "in-site-image",
    title: "In-Site Image Editor",
    description: "Crop, resize, rotate, and enhance your photos directly inside Zuperix using lightweight built-in tools.",
    category: "Core",
    icon: Sliders,
    status: "next-quarter"
  },
  {
    id: "sota-analytics",
    title: "State-of-the-Art Analytics",
    description: "Deep engagement dashboards showing asset downloads, traffic sources, and popular files in real-time.",
    category: "Performance",
    icon: BarChart3,
    status: "next-quarter"
  },

  // NEXT TO NEXT
  {
    id: "custom-s3",
    title: "Custom S3 Cloud Config",
    description: "Save on cloud storage costs by connecting your own S3-compatible storage providers like Cloudflare R2 or Wasabi.",
    category: "Performance",
    icon: Database,
    status: "next-to-next"
  },
  {
    id: "in-house-video",
    title: "In-House Video Editor",
    description: "Trimming, cutting, and simple video processing directly in the browser utilizing lightweight built-in libraries.",
    category: "Core",
    icon: Play,
    status: "next-to-next"
  },

  // FUTURE
  {
    id: "soc2",
    title: "SOC2 Compliance Certification",
    description: "Establishing enterprise security compliance controls and getting audited for official SOC2 certification.",
    category: "Security",
    icon: Shield,
    status: "future"
  },
  {
    id: "colorblind-friendly",
    title: "Color Blind Friendly Indicators",
    description: "Updating our dashboard with distinctive, high-contrast accessible color patterns for color blind developers and designers.",
    category: "Core",
    icon: EyeOff,
    status: "future"
  }
]

// Distinctive color-blind friendly styling classes using high contrast indicators
const CATEGORY_COLORS = {
  AI: "border-purple-500/30 bg-purple-500/10 text-purple-400 font-bold",
  Core: "border-blue-500/30 bg-blue-500/10 text-blue-400 font-bold",
  Integration: "border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold",
  Performance: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold",
  Security: "border-rose-500/30 bg-rose-500/10 text-rose-400 font-bold"
}

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<"all" | "now" | "this-quarter" | "next-quarter" | "next-to-next" | "future">("all")

  const filteredItems = ROADMAP_ITEMS.filter(item => activeTab === "all" || item.status === activeTab)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden pt-28 pb-16">
        
        {/* Header */}
        <section className="px-6 max-w-7xl mx-auto flex flex-col items-center text-center mb-12">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-[300px] h-[300px] rounded-full bg-brand/10 blur-[100px]" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/20 bg-brand/5 text-xs font-semibold text-brand mb-6"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Product Roadmap</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 max-w-3xl leading-[1.15]"
          >
            Where Zuperix is going
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Check out what features are already live and follow our structured timeline of upcoming releases.
          </motion.p>
        </section>

        {/* Tab Controls */}
        <section className="px-6 max-w-7xl mx-auto flex justify-center mb-16 overflow-x-auto pb-4 select-none">
          <div className="inline-flex p-1 rounded-xl bg-card border border-border/80 shadow-md min-w-max">
            {(["all", "now", "this-quarter", "next-quarter", "next-to-next", "future"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold capitalize transition-all duration-200 outline-none ${
                  activeTab === tab 
                    ? "text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-roadmap-tab"
                    className="absolute inset-0 bg-accent rounded-lg -z-0 border border-border"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">
                  {tab === "all" ? "All Features" 
                    : tab === "now" ? "Now (Live)" 
                    : tab === "this-quarter" ? "This Quarter" 
                    : tab === "next-quarter" ? "Next Quarter" 
                    : tab === "next-to-next" ? "Next to Next" 
                    : "Future"}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Roadmap Display */}
        <section className="px-6 max-w-7xl mx-auto">
          {activeTab === "all" ? (
            /* Board View - Horizontal Scrollable on smaller viewports */
            <div className="grid md:grid-cols-5 gap-6 items-start overflow-x-auto pb-6">
              
              {/* NOW COLUMN */}
              <div className="flex flex-col gap-5 min-w-[220px]">
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <h3 className="font-bold text-foreground text-sm">Now</h3>
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground bg-accent px-1.5 py-0.5 rounded border border-border">Already Live</span>
                </div>
                <div className="space-y-4">
                  {ROADMAP_ITEMS.filter(i => i.status === "now").map(item => (
                    <RoadmapCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* THIS QUARTER */}
              <div className="flex flex-col gap-5 min-w-[220px]">
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand shadow-[0_0_8px_var(--brand)]" />
                    <h3 className="font-bold text-foreground text-sm">This Quarter</h3>
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground bg-accent px-1.5 py-0.5 rounded border border-border">Q2 2026</span>
                </div>
                <div className="space-y-4">
                  {ROADMAP_ITEMS.filter(i => i.status === "this-quarter").map(item => (
                    <RoadmapCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* NEXT QUARTER */}
              <div className="flex flex-col gap-5 min-w-[220px]">
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    <h3 className="font-bold text-foreground text-sm">Next Quarter</h3>
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground bg-accent px-1.5 py-0.5 rounded border border-border">Q3 2026</span>
                </div>
                <div className="space-y-4">
                  {ROADMAP_ITEMS.filter(i => i.status === "next-quarter").map(item => (
                    <RoadmapCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* NEXT TO NEXT */}
              <div className="flex flex-col gap-5 min-w-[220px]">
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    <h3 className="font-bold text-foreground text-sm">Next to Next</h3>
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground bg-accent px-1.5 py-0.5 rounded border border-border">Q4 2026</span>
                </div>
                <div className="space-y-4">
                  {ROADMAP_ITEMS.filter(i => i.status === "next-to-next").map(item => (
                    <RoadmapCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* FUTURE */}
              <div className="flex flex-col gap-5 min-w-[220px]">
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                    <h3 className="font-bold text-foreground text-sm">Future</h3>
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground bg-accent px-1.5 py-0.5 rounded border border-border">2027+</span>
                </div>
                <div className="space-y-4">
                  {ROADMAP_ITEMS.filter(i => i.status === "future").map(item => (
                    <RoadmapCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* Tab Content Grid */
            <motion.div 
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RoadmapCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

      </main>
      <Footer />
    </>
  )
}

function RoadmapCard({ item }: { item: RoadmapItem }) {
  const Icon = item.icon
  return (
    <div className="group relative rounded-2xl border border-border/80 bg-card p-5 shadow-sm hover:border-brand/40 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[170px]">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.02] to-transparent pointer-events-none" />
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-lg bg-accent border border-border flex items-center justify-center text-foreground group-hover:text-brand group-hover:border-brand/20 transition-all">
            <Icon className="w-4 h-4" />
          </div>
          {/* Distinctive tags with clear indicators for accessibility */}
          <span className={`text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded border ${CATEGORY_COLORS[item.category]}`}>
            {item.category}
          </span>
        </div>
        <h4 className="text-sm font-bold text-foreground mb-1.5 group-hover:text-brand transition-colors">
          {item.title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  )
}
