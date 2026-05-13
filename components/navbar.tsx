"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { Github, Menu, X, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Magnetic } from "@/components/ui/magnetic-wrapper"

const NAV_ITEMS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Docs", href: "https://docs.zuperix.com", target: "_blank" },
  { label: "Use cases", href: "/#use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = NAV_ITEMS.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section)
          break
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a full path (like /pricing), let it navigate normally
    if (!href.startsWith("#") && !href.startsWith("/#")) return

    // If we're not on the home page, let the browser handle the navigation to the home page + hash
    if (window.location.pathname !== "/") return

    e.preventDefault()
    const targetId = href.replace(/^\/?#/, "")
    const target = document.getElementById(targetId)
    
    if (target) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = target.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
    setMobileOpen(false)
  }, [])

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    if (mobileOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand focus:text-primary-foreground focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <motion.div 
          layout
          className={cn(
            "max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500",
            isScrolled ? "h-16" : "h-20"
          )}
        >
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="z-10"
          >
            <Link 
              href="/" 
              className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
              aria-label="Zuperix Home"
            >
              <div className="w-9 h-9 relative">
                <Image 
                  src="/logo_transparant.png" 
                  alt="Zuperix Logo" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-bold text-foreground tracking-tight text-xl">Zuperix</span>
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e as any, item.href)}
                className={cn(
                  "relative text-sm px-4 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  activeSection === item.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-accent rounded-lg -z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.a
              href="https://github.com/zuperix/zuperix"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4" />
              <span className="font-semibold text-foreground">GitHub</span>
            </motion.a>
            <Magnetic intensity={0.2}>
              <Button 
                size="sm" 
                className="bg-brand hover:bg-brand-dim text-white border-0 gap-1.5 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 px-5 h-10 active:scale-95 transition-all"
                asChild
              >
                <Link href="http://dashboard.zuperix.com/">
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </Magnetic>
          </div>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </motion.div>

        {/* Mobile menu with AnimatePresence */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:hidden fixed inset-x-0 top-16 bg-background border-b border-border overflow-hidden"
            >
              <nav className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e as any, item.href)}
                    className={cn(
                      "text-lg py-3 px-4 rounded-xl transition-all duration-200",
                      activeSection === item.href.slice(1)
                        ? "text-brand bg-brand/10 font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-6 border-t border-border mt-4">
                  <Button 
                    variant="outline"
                    className="w-full justify-between h-12 text-base px-6"
                    asChild
                  >
                    <a href="https://github.com/zuperix/zuperix" target="_blank" rel="noopener noreferrer">
                      <div className="flex items-center gap-2">
                        <Github className="w-5 h-5" />
                        <span>GitHub</span>
                      </div>
                    </a>
                  </Button>
                  <Button 
                    className="w-full bg-brand hover:bg-brand-dim text-white h-12 text-base px-6 gap-2"
                    asChild
                  >
                    <Link href="http://dashboard.zuperix.com/">
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
