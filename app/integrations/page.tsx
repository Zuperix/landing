"use client"

import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ExternalLink,
  Globe,
  Search,
  Upload,
  FolderSync,
  ShoppingBag,
  Bot,
  Chrome,
  Puzzle,
  Palette,
  FileImage,
  Layers,
  MousePointerClick,
  Camera,
  Terminal,
  Link2,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const INTEGRATION_CATEGORIES = {
  DESIGN: "Design Tools",
  CLOUD: "Cloud & Storage",
  CMS: "Content & Commerce",
  DEVELOPER: "Developer & AI",
  BROWSER: "Browser",
} as const

type CategoryKey = keyof typeof INTEGRATION_CATEGORIES

interface Integration {
  name: string
  slug: string
  description: string
  category: CategoryKey
  logo: string | null
  logoType: "image" | "icon"
  icon: React.ElementType
  color: string
  colorBg: string
  features: string[]
  docsUrl: string
  installUrl?: string
  status: "live" | "beta" | "coming-soon"
}

const INTEGRATIONS: Integration[] = [
  {
    name: "Figma",
    slug: "figma",
    description:
      "Access approved images, SVGs, and brand assets from your DAM directly inside Figma. Insert assets onto your canvas without leaving your design workflow.",
    category: "DESIGN",
    logo: "/250px-Figma-logo.svg.png",
    logoType: "image",
    icon: Palette,
    color: "text-[#a259ff]",
    colorBg: "bg-[#a259ff]/10 border-[#a259ff]/20",
    features: [
      "One-click asset insertion",
      "Native SVG as editable vectors",
      "Asset approval status indicators",
      "Search, browse & filter",
    ],
    docsUrl: "https://docs.zuperix.com/docs/integrations/figma",
    installUrl:
      "https://www.figma.com/community/plugin/1639695802550317100/zuperix-dam-connector",
    status: "live",
  },
  {
    name: "Canva",
    slug: "canva",
    description:
      "Search, browse, and insert approved brand assets, logos, images, videos, and creative content without leaving Canva. Save designs back to your DAM.",
    category: "DESIGN",
    logo: "/Canva_Logo.svg",
    logoType: "image",
    icon: Layers,
    color: "text-[#00c4cc]",
    colorBg: "bg-[#00c4cc]/10 border-[#00c4cc]/20",
    features: [
      "Drag & drop asset insertion",
      "Save designs back to DAM",
      "Category & collection browsing",
      "Brand asset governance",
    ],
    docsUrl: "https://docs.zuperix.com/docs/integrations/canva",
    installUrl: "https://www.canva.com/apps/AAHAAOrWZ9s/zuperix-dam",
    status: "live",
  },
  {
    name: "Adobe Express",
    slug: "adobe-express",
    description:
      "Access images, videos, audio files, GIFs, and PDFs from your DAM directly inside Adobe Express. Drag-and-drop support for fast content creation.",
    category: "DESIGN",
    logo: "/250px-Adobe_Creative_Suite_icon.svg.png",
    logoType: "image",
    icon: FileImage,
    color: "text-[#ff0000]",
    colorBg: "bg-[#ff0000]/10 border-[#ff0000]/20",
    features: [
      "Images, videos, audio & PDF support",
      "Drag-and-drop insertion",
      "Preview any asset type",
      "Browse folders & collections",
    ],
    docsUrl: "https://docs.zuperix.com/docs/integrations/adobe-express",
    installUrl: "https://adobesparkpost.app.link/TR9Mb7TXFLb?addOnId=w6n329ljj",
    status: "live",
  },
  {
    name: "Google Drive",
    slug: "google-drive",
    description:
      "Enterprise-grade sync with zero-copy linking, smart import, and full migration modes. Manage Drive assets in your DAM without duplicating terabytes of data.",
    category: "CLOUD",
    logo: "/330px-Google_Drive_icon_(2020).svg.png",
    logoType: "image",
    icon: FolderSync,
    color: "text-[#4285f4]",
    colorBg: "bg-[#4285f4]/10 border-[#4285f4]/20",
    features: [
      "Zero-copy link mode",
      "Smart selective import",
      "Full folder migration",
      "Background bulk sync",
    ],
    docsUrl: "https://docs.zuperix.com/docs/integrations/google-drive",
    status: "beta",
  },
  {
    name: "WordPress",
    slug: "wordpress",
    description:
      "Connect WordPress directly to your DAM. Access approved assets from the Gutenberg editor and media library. Centralize media across multiple WordPress sites.",
    category: "CMS",
    logo: "/250px-Wordpress-Logo.svg.png",
    logoType: "image",
    icon: Globe,
    color: "text-[#21759b]",
    colorBg: "bg-[#21759b]/10 border-[#21759b]/20",
    features: [
      "Gutenberg editor integration",
      "Media library replacement",
      "Multi-site asset access",
      "Automatic upload sync",
    ],
    docsUrl: "https://docs.zuperix.com/docs/integrations/wordpress",
    status: "live",
  },
  {
    name: "Shopify",
    slug: "shopify",
    description:
      "Access and manage product images, brand assets, and marketing materials from your DAM directly inside Shopify. Streamline e-commerce content workflows.",
    category: "CMS",
    logo: "/shopify.svg",
    logoType: "image",
    icon: ShoppingBag,
    color: "text-[#95bf47]",
    colorBg: "bg-[#95bf47]/10 border-[#95bf47]/20",
    features: [
      "Product image management",
      "Brand asset library access",
      "One-click asset insertion",
      "Search & filter assets",
    ],
    docsUrl: "https://docs.zuperix.com/docs/integrations/shopify",
    status: "live",
  },
  {
    name: "Chrome Extension",
    slug: "chrome-extension",
    description:
      "Access, search, upload, and manage DAM assets from any website. Save web images, capture screenshots, and copy CDN URLs without leaving your browser.",
    category: "BROWSER",
    logo: null,
    logoType: "icon",
    icon: Chrome,
    color: "text-[#4285f4]",
    colorBg: "bg-[#4285f4]/10 border-[#4285f4]/20",
    features: [
      "Global asset search from any tab",
      "Save web images to DAM",
      "Screenshot capture & upload",
      "Copy CDN URLs & share links",
    ],
    docsUrl: "https://docs.zuperix.com/docs/integrations/chrome-extension",
    status: "live",
  },
  {
    name: "AI Agents (MCP)",
    slug: "mcp",
    description:
      "Connect your DAM to AI assistants like Claude, Cursor, and Windsurf using the Model Context Protocol. Search, tag, and organize assets with natural language.",
    category: "DEVELOPER",
    logo: null,
    logoType: "icon",
    icon: Bot,
    color: "text-[#d97706]",
    colorBg: "bg-[#d97706]/10 border-[#d97706]/20",
    features: [
      "Natural language asset search",
      "Bulk tagging & organization",
      "Claude, Cursor & Windsurf support",
      "Full API access via MCP",
    ],
    docsUrl: "https://docs.zuperix.com/docs/integrations/mcp",
    status: "live",
  },
]

const CATEGORY_ORDER: CategoryKey[] = [
  "DESIGN",
  "CLOUD",
  "CMS",
  "BROWSER",
  "DEVELOPER",
]

const STATUS_LABELS = {
  live: { label: "Live", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  beta: { label: "Beta", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  "coming-soon": { label: "Coming Soon", className: "bg-white/5 text-white/40 border-white/10" },
} as const

function IntegrationCard({ integration, index }: { integration: Integration; index: number }) {
  const StatusIcon = integration.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div
        className={cn(
          "relative h-full flex flex-col p-8 rounded-[2rem] border border-white/[0.06] bg-neutral-950/60 backdrop-blur-xl overflow-hidden transition-all duration-500",
          "hover:border-white/[0.12] hover:bg-neutral-950/80 hover:shadow-2xl hover:shadow-black/20"
        )}
      >
        {/* Subtle gradient on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105",
                integration.colorBg
              )}
            >
              {integration.logo ? (
                <Image
                  src={integration.logo}
                  alt={integration.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              ) : (
                <StatusIcon className={cn("w-7 h-7", integration.color)} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {integration.name}
              </h3>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30">
                {INTEGRATION_CATEGORIES[integration.category]}
              </span>
            </div>
          </div>
          <div
            className={cn(
              "px-2.5 py-1 rounded-full border text-[9px] font-black tracking-widest uppercase",
              STATUS_LABELS[integration.status].className
            )}
          >
            {STATUS_LABELS[integration.status].label}
          </div>
        </div>

        {/* Description */}
        <p className="relative z-10 text-white/40 text-sm leading-relaxed mb-6 flex-1">
          {integration.description}
        </p>

        {/* Features */}
        <div className="relative z-10 mb-8">
          <ul className="grid grid-cols-1 gap-2.5">
            {integration.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-[13px] text-white/50"
              >
                <div className="w-1 h-1 rounded-full bg-brand/60 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-white/[0.06]">
          <Link
            href={integration.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dim transition-colors"
          >
            Documentation
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          {integration.installUrl && (
            <>
              <span className="w-px h-4 bg-white/10" />
              <Link
                href={integration.installUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-semibold text-white/50 hover:text-white transition-colors"
              >
                Install
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function IntegrationsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-black" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-brand/8 rounded-full blur-[150px] pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-[10px] font-black tracking-[0.2em] uppercase mb-6"
            >
              <Puzzle className="w-3.5 h-3.5" />
              {INTEGRATIONS.length} Integrations
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Integrations that{" "}
              <span className="text-brand">power your workflow</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty mb-12 leading-relaxed"
            >
              Connect Zuperix to every tool your team uses. Access, insert, and
              manage your assets across design tools, browsers, CMSs, and AI
              agents — all from a single source of truth.
            </motion.p>

            {/* Integration logo strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center justify-center gap-6 flex-wrap"
            >
              {INTEGRATIONS.filter((i) => i.logo).map((integration) => (
                <div
                  key={integration.slug}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                  title={integration.name}
                >
                  <Image
                    src={integration.logo!}
                    alt={integration.name}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              ))}
              {INTEGRATIONS.filter((i) => !i.logo).map((integration) => {
                const Icon = integration.icon
                return (
                  <div
                    key={integration.slug}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                    title={integration.name}
                  >
                    <Icon className={cn("w-6 h-6", integration.color)} />
                  </div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Integrations Grid — grouped by category */}
        <section className="relative py-16 md:py-24 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            {CATEGORY_ORDER.map((categoryKey) => {
              const items = INTEGRATIONS.filter(
                (i) => i.category === categoryKey
              )
              if (items.length === 0) return null

              return (
                <div key={categoryKey} className="mb-20 last:mb-0">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-10"
                  >
                    <div className="w-1.5 h-8 rounded-full bg-brand" />
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      {INTEGRATION_CATEGORIES[categoryKey]}
                    </h2>
                    <span className="text-xs font-bold text-white/20 tracking-widest uppercase ml-2">
                      {items.length}{" "}
                      {items.length === 1 ? "integration" : "integrations"}
                    </span>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((integration, i) => (
                      <IntegrationCard
                        key={integration.slug}
                        integration={integration}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* API & Webhooks Highlight Section */}
        <section className="relative py-20 md:py-28 bg-black overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] border border-white/[0.06] bg-neutral-950/60 backdrop-blur-xl p-10 md:p-16 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-black tracking-[0.2em] uppercase text-white/40 mb-6">
                <Terminal className="w-3.5 h-3.5" />
                Developer First
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Build your own integration
              </h2>
              <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                Use the Zuperix REST API and webhooks to build custom
                integrations for your specific workflow. Full CRUD operations,
                real-time event notifications, and predictable responses.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
                {[
                  { icon: Search, label: "Search API" },
                  { icon: Upload, label: "Upload API" },
                  { icon: Zap, label: "Webhooks" },
                  { icon: Link2, label: "CDN URLs" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-sm text-white/50"
                  >
                    <item.icon className="w-4 h-4 text-brand/70" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  className="bg-brand hover:bg-brand-dim text-white font-bold rounded-2xl px-8 h-12 shadow-xl shadow-brand/20 transition-all active:scale-95 group"
                  asChild
                >
                  <Link
                    href="https://docs.zuperix.com/docs/api/quickstart"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    API Documentation
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="font-bold rounded-2xl px-8 h-12 border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all active:scale-95 group"
                  asChild
                >
                  <Link
                    href="https://docs.zuperix.com/docs/webhooks/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Webhooks Guide
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 md:py-28 bg-black">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Ready to connect your tools?
              </h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed mb-10">
                Start for free and connect Zuperix to every platform your team
                depends on. No credit card required.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  className="bg-brand hover:bg-brand-dim text-white font-bold rounded-2xl px-10 h-14 shadow-xl shadow-brand/20 transition-all active:scale-95 group uppercase tracking-widest text-sm"
                  asChild
                >
                  <Link href="http://dashboard.zuperix.com/">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="font-bold rounded-2xl px-10 h-14 border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all active:scale-95 uppercase tracking-widest text-sm"
                  asChild
                >
                  <Link
                    href="https://docs.zuperix.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Docs
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
