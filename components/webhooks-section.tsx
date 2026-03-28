"use client"

import { motion } from "framer-motion"
import { 
  CheckCircle2, 
  AlertCircle, 
  FilePlus, 
  FileEdit, 
  FileMinus,
  MessageSquare,
  Zap,
  Globe,
  Clock,
  ExternalLink,
  Hash
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface WebhookEvent {
  id: string
  action: "Created" | "Updated" | "Deleted" | "Tagged"
  assetName: string
  source: string
  integration: "Slack" | "Discord" | "Direct Webhook" | "System"
  destination: string
  time: string
}

const WEBHOOK_DATA: WebhookEvent[] = [
  {
    id: "1",
    action: "Created",
    assetName: "hero_background_render.png",
    source: "Desktop Upload",
    integration: "Slack",
    destination: "#marketing-assets",
    time: "2 sec ago",
  },
  {
    id: "2",
    action: "Tagged",
    assetName: "product_shot_01.jpg",
    source: "AI Auto-Tag",
    integration: "Direct Webhook",
    destination: "https://api.zuperix.com/hook",
    time: "15 sec ago",
  },
  {
    id: "3",
    action: "Updated",
    assetName: "company_culture_video.mp4",
    source: "Version v2.0",
    integration: "Slack",
    destination: "#video-production",
    time: "45 sec ago",
  },
  {
    id: "4",
    action: "Deleted",
    assetName: "temp_draft_unused.zip",
    source: "API Cleanup",
    integration: "Direct Webhook",
    destination: "https://logs.internal.co",
    time: "1 min ago",
  },
  {
    id: "5",
    action: "Created",
    assetName: "investor_deck_final.pdf",
    source: "Shared Link",
    integration: "Direct Webhook",
    destination: "https://webhook.site/r...",
    time: "3 min ago",
  },
]

function ActionIcon({ action }: { action: WebhookEvent["action"] }) {
  switch (action) {
    case "Created":
      return (
        <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <FilePlus className="w-4 h-4 text-green-500" />
        </div>
      )
    case "Deleted":
      return (
        <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <FileMinus className="w-4 h-4 text-red-500" />
        </div>
      )
    case "Updated":
      return (
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <FileEdit className="w-4 h-4 text-blue-500" />
        </div>
      )
    case "Tagged":
      return (
        <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
          <Zap className="w-4 h-4 text-orange-500" />
        </div>
      )
  }
}

function IntegrationIcon({ integration }: { integration: string }) {
  if (integration === "Slack") return <Hash className="w-3 h-3 text-[#E01E5A]" />
  if (integration === "Direct Webhook") return <Globe className="w-3 h-3 text-blue-400" />
  return <MessageSquare className="w-3 h-3" />
}

function WebhookCard({ event }: { event: WebhookEvent }) {
  return (
    <div className="relative pl-12 pb-12 last:pb-0 group">
      {/* Icon and Timeline Line */}
      <div className="absolute left-0 top-0 h-full">
        <ActionIcon action={event.action} />
        <div className="absolute left-4 top-8 w-px h-[calc(100%-8px)] bg-border/40 group-last:bg-transparent" />
      </div>

      <div className="flex flex-col gap-3">
        {/* Header Tags */}
        <div className="flex flex-wrap items-center gap-3">
          <span className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
            event.action === "Created" && "bg-green-500/10 text-green-500",
            event.action === "Deleted" && "bg-red-500/10 text-red-500",
            event.action === "Updated" && "bg-blue-500/10 text-blue-500",
            event.action === "Tagged" && "bg-orange-500/10 text-orange-500"
          )}>
            asset.{event.action.toLowerCase()}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
            <Clock className="w-3 h-3" />
            <span>{event.time}</span>
          </div>
        </div>

        {/* Content Details */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-baseline gap-2 text-sm text-foreground/80">
            <span className="text-muted-foreground/60">Asset</span>
            <span className="px-2 py-0.5 rounded-md bg-secondary/80 border border-border/50 font-medium text-xs text-brand truncate max-w-[150px]">
              {event.assetName}
            </span>
            <span className="text-muted-foreground/60">via</span>
            <span className="px-2 py-0.5 rounded-md bg-secondary/80 border border-border/50 font-medium text-xs">
              {event.source}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-foreground/80">
            <span className="text-muted-foreground/60">Notified</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-secondary/80 border border-border/50 font-medium text-xs">
              <IntegrationIcon integration={event.integration} />
              <span>{event.integration}</span>
            </div>
            <span className="text-muted-foreground/60">to</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-secondary/80 border border-border/50 font-medium text-xs max-w-[150px] truncate">
              <span className="text-muted-foreground">→</span>
              <span>{event.destination}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WebhooksSection() {
  const items = WEBHOOK_DATA
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <section className="pt-4 sm:pt-6 pb-24 sm:pb-32 px-6 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Text Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 max-w-xl text-center lg:text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 mx-auto lg:mx-0">
            <div className="w-6 h-6 rounded-md bg-orange-500 relative">
              <div className="absolute inset-[3px] rounded-[2px] bg-background flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Modular Webhooks
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
            Receive real-time notifications directly to your server or Slack. Every time an asset is created, updated, deleted, or tagged — your pipeline stays in sync.
          </p>
          
          <a 
            href="https:github.com/zuperix/zuperix" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground font-semibold hover:gap-3 transition-all group"
          >
            Explore API Docs
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
          </a>
        </motion.div>

        {/* Vertical Feed Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full max-w-2xl relative"
        >
          <div className="relative h-[600px] overflow-hidden rounded-3xl bg-secondary/5 border border-border/50 shadow-2xl backdrop-blur-3xl">
            {/* Top/Bottom Faders */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background via-background/80 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </div>

            {/* Scrolling Feed */}
            <motion.div 
              animate={{ y: [0, -items.length * 150] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="p-12"
            >
              {duplicatedItems.map((event, i) => (
                <WebhookCard key={`${event.id}-${i}`} event={event} />
              ))}
            </motion.div>
          </div>

          {/* Glow */}
          <div 
            className="absolute -inset-10 -z-10 bg-orange-500/5 blur-[100px] rounded-full" 
            aria-hidden="true" 
          />
        </motion.div>
      </div>
    </section>
  )
}
