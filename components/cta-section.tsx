"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Magnetic } from "@/components/ui/magnetic-wrapper"

export function CtaSection() {
  return (
    <section 
      className="py-20 sm:py-28 px-6 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background glow with subtle pulse */}
      <motion.div
        animate={{
          opacity: [0.05, 0.12, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.55 0.2 262 / 0.12) 0%, transparent 70%)",
        }}
      />
      
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(var(--color-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-line) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const }}
        className="relative max-w-3xl mx-auto text-center"
      >
        {/* Badge */}
        
        <h2 
          id="cta-heading"
          className="text-balance font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight"
        >
          Start managing assets
          <br />
          <span className="bg-gradient-to-r from-brand to-[oklch(0.65_0.25_280)] bg-clip-text text-transparent">
            the smart way.
          </span>
        </h2>
        
        <p className="text-muted-foreground text-lg sm:text-xl max-w-lg mx-auto mb-12 leading-relaxed text-pretty">
          Get started with Zuperix in minutes. A modern AI-powered DAM built for teams of every size.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Magnetic intensity={0.2}>
            <Button
              className="w-full sm:w-auto bg-brand hover:bg-brand-dim text-primary-foreground font-semibold rounded-lg px-8 h-13 text-base shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              asChild
            >
              <Link href="http://dashboard.zuperix.com/">
                Get Started Free
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </Magnetic>
        </div>
        
        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          {[
            "Most Affordable DAM",
            "No credit card required",
            "Enterprise-grade Security",
            "99.9% uptime",
          ].map((badge, i) => (
            <motion.div 
              key={badge}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
              <span>{badge}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
