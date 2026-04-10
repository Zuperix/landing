"use client"

import Link from "next/link"
import { useState, useEffect, useCallback, useRef } from "react"
import { ArrowRight, Play, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Magnetic } from "@/components/ui/magnetic-wrapper"

const SEARCH_PLACEHOLDERS = [
  "red car at night",
  "team meeting last week",
  "logo with blue background",
  "product shots on white",
  "type:video AND size>10mb",
]

export function Hero() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [mounted, setMounted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Parallax transforms for scroll
  const y1 = useTransform(scrollY, [0, 800], [0, 300])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95])
  const imageY = useTransform(scrollY, [0, 800], [0, -100])

  // Mouse movement parallax for background
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 30, stiffness: 100 }
  const bgX = useSpring(useTransform(mouseX, [0, 2000], [-25, 25]), springConfig)
  const bgY = useSpring(useTransform(mouseY, [0, 1200], [-25, 25]), springConfig)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    if (!mounted) return

    const target = SEARCH_PLACEHOLDERS[placeholderIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText.length < target.length) {
      timeout = setTimeout(() => setDisplayText(target.slice(0, displayText.length + 1)), 70)
    } else if (!isDeleting && displayText.length === target.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2500)
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 35)
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false)
      setPlaceholderIndex((i) => (i + 1) % SEARCH_PLACEHOLDERS.length)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, placeholderIndex, mounted])

  const scrollToFeatures = useCallback(() => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  }

  if (!mounted) return null

  return (
    <section
      ref={containerRef}
      id="main-content"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20"
      aria-labelledby="hero-heading"
    >
      {/* Subtle grid background with mouse parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          x: bgX,
          y: bgY,
          backgroundImage: `linear-gradient(var(--color-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-line) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 50%, transparent 100%)",
        }}
      />

      {/* Glow with scroll parallax */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        aria-hidden="true"
        style={{
          y: y1,
          opacity: heroOpacity,
          background: "radial-gradient(ellipse at center, oklch(0.55 0.2 262 / 0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Badge */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-wide"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
            </span>
            Modern · AI-Powered · Content-Centric
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 text-muted-foreground text-xs font-medium tracking-wide hover:border-brand/30 hover:text-foreground transition-all cursor-pointer group/cloud"
            >
              Cloud version available for zero-hassle setup
              <ArrowRight className="w-3 h-3 group-hover/cloud:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          id="hero-heading"
          className="relative text-balance text-center font-bold tracking-tight leading-[1.08] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground max-w-4xl mb-6"
        >
          The Content Hub for{" "}
          <span className="bg-gradient-to-r from-brand to-[oklch(0.65_0.25_280)] bg-clip-text text-transparent">
            Creative Teams.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="relative text-center text-base sm:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed text-pretty"
        >
          Modern, AI-powered digital asset management for teams that move fast. Organize, discover, and share your creative library using natural language.
        </motion.p>

        {/* Animated search bar */}
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-lg mb-10"
          role="presentation"
          aria-label="Example search interface"
        >
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-card/80 backdrop-blur-sm shadow-lg shadow-black/5 hover:border-brand/30 transition-colors group/search">
            <Search className="w-4 h-4 text-muted-foreground shrink-0 group-hover/search:text-brand transition-colors" aria-hidden="true" />
            <span className="text-sm text-muted-foreground flex-1 font-mono h-5 flex items-center">
              {displayText}
              <span
                className="inline-block w-0.5 h-[18px] bg-brand ml-0.5 animate-pulse"
                aria-hidden="true"
              />
            </span>
            <kbd className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md border border-border bg-secondary/50 text-xs text-muted-foreground font-mono">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          </div>
        </motion.div>

        {/* CTAs with Magnetic effect */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16 w-full sm:w-auto"
        >
          <Magnetic intensity={0.2}>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-brand hover:bg-brand-dim text-primary-foreground border-0 gap-2 px-8 h-12 text-base shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 transition-all active:scale-95"
              asChild
            >
              <Link href="/pricing">
                Get Started Free
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic intensity={0.2}>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-2 px-8 h-12 text-base hover:bg-accent/80 transition-all active:scale-95"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              Watch Demo
            </Button>
          </Magnetic>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-16 text-sm"
        >
          {[
            { value: "2.4k+", label: "GitHub stars" },
            { value: "50M+", label: "Assets indexed" },
            { value: "<100ms", label: "Search latency" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 group/stat cursor-default">
              <span className="font-bold text-foreground group-hover:text-brand transition-colors">{stat.value}</span>
              <span className="text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Hero image with reveal and scroll parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ y: imageY }}
        className="relative w-full max-w-5xl"
      >
        <div className="rounded-2xl border border-border overflow-hidden shadow-2xl shadow-black/30 bg-card group/image">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-background/60 border border-border text-xs text-muted-foreground font-mono max-w-xs truncate">
                <svg className="w-3 h-3 text-green-500 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm2.5 11l-3.5-2.5v-5h1v4.3l3 2.2-.5.9z" />
                </svg>
                zuperix.com/dashboard
              </div>
            </div>
            <div className="w-16" aria-hidden="true" />
          </div>

          <Image
            src="/images/hero-preview.png"
            alt="Zuperix dashboard showing AI-tagged asset grid with natural language search capabilities"
            width={1200}
            height={680}
            className="w-full object-cover transition-transform duration-700 group-hover/image:scale-[1.02]"
            priority
          />
        </div>

        {/* Fade bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          aria-hidden="true"
          style={{
            background: "linear-gradient(to top, var(--color-background), transparent)",
          }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToFeatures}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-all cursor-pointer group"
        aria-label="Scroll to features"
      >
        <span className="text-xs font-medium">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  )
}
