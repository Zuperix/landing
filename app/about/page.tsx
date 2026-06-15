"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Shield, Sparkles, Cpu, Code2, Users, Heart, ArrowUpRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const PRINCIPLES = [
  {
    icon: Code2,
    title: "Security First",
    description: "Built with enterprise-grade security protocols. We believe critical creative infrastructure should be secure, reliable, and lightning-fast.",
  },
  {
    icon: Sparkles,
    title: "AI Native",
    description: "Designed from day one to leverage advanced AI models. Zuperix doesn't just store files; it deeply understands, tags, and organizes your media automatically.",
  },
  {
    icon: Shield,
    title: "Total Privacy & Control",
    description: "Secure hosting on optimized cloud infrastructure. Your assets, metadata, and user activity stay completely confidential, protected, and isolated.",
  },
  {
    icon: Cpu,
    title: "Extensible Architecture",
    description: "Designed with clean APIs, pluggable storage (S3, R2, Local), webhooks, and Canva/Adobe Express integrations to fit seamlessly into any stack.",
  },
]

const STATS = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "10x", label: "Faster Asset Discovery" },
  { value: "Zero", label: "Manual Tagging Required" },
  { value: "Unlimited", label: "Users Included" },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden pt-28 pb-16">
        
        {/* Hero Section */}
        <section className="relative px-6 max-w-7xl mx-auto flex flex-col items-center text-center mb-20">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-[400px] h-[400px] rounded-full bg-brand/10 blur-[120px] animate-pulse" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/20 bg-brand/5 text-xs font-semibold text-brand mb-6"
          >
            <Users className="w-3.5 h-3.5" />
            <span>About Zuperix</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 max-w-3xl leading-[1.15]"
          >
            Reimagining <span className="bg-gradient-to-r from-brand to-violet-400 bg-clip-text text-transparent">Digital Asset Management</span> with AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10"
          >
            Zuperix is the AI-native alternative to complex, expensive enterprise DAMs. We build tools that help creative teams catalog, find, and distribute media effortlessly.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-8 max-w-5xl border border-border bg-card/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent pointer-events-none" />
            {STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-4 border-r last:border-r-0 border-border/50">
                <span className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground font-medium text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Story Section */}
        <section className="px-6 py-12 max-w-5xl mx-auto border-t border-border/40">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 tracking-tight">Our Story & Mission</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  Managing a growing library of media assets has historically been a painful chore. Legacy tools require manual tagging, suffer from terrible search capabilities, and come with prohibitive licensing fees that lock creative teams into proprietary ecosystems.
                </p>
                <p>
                  We created **Zuperix** to solve this. By combining cloud-scalable storage with modern AI models, we made it possible to search media using natural, human language—the exact same way you think.
                </p>
                <p>
                  Our mission is to democratize high-end creative tooling. We believe every team, from independent creators to global agencies, deserves beautiful, powerful, and secure software to manage their digital assets.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[320px] aspect-square rounded-2xl border border-border bg-gradient-to-br from-card to-accent/30 p-6 flex flex-col justify-between shadow-lg overflow-hidden group">
                <div className="absolute inset-0 bg-grid-line opacity-10 pointer-events-none" />
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                    <Sparkles className="w-5 h-5 fill-brand/20" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">AI Powered</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">100% Automatic Tagging</h3>
                  <p className="text-xs text-muted-foreground leading-normal mb-4">
                    Get video transcribing, text extraction from images with OCR, and auto-tagging out of the box.
                  </p>
                  <Link 
                    href="http://dashboard.zuperix.com/" 
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-dim transition-colors group-hover:translate-x-1 duration-200"
                  >
                    Start Free Trial <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles Grid */}
        <section className="px-6 py-20 max-w-7xl mx-auto border-t border-border/40">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Core Principles</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              The foundational ideas that drive every feature we ship and every line of code we write.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {PRINCIPLES.map((principle, idx) => {
              const Icon = principle.icon
              return (
                <div 
                  key={idx} 
                  className="flex gap-4 p-6 border border-border/60 bg-card/30 rounded-2xl hover:border-brand/40 hover:bg-card/75 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/60 border border-border flex items-center justify-center text-foreground group-hover:text-brand group-hover:border-brand/20 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-brand transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Join Us Section */}
        <section className="px-6 py-12 max-w-5xl mx-auto border-t border-border/40">
          <div className="relative rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/5 via-transparent to-violet-500/5 p-8 sm:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-line opacity-10 pointer-events-none" />
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">Start managing your assets today</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
              Scale your team's workflow with automated transcription, similarity search, and high-speed delivery.
            </p>
            
            <div className="flex justify-center">
              <Link 
                href="http://dashboard.zuperix.com/" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand-dim transition-colors gap-2"
              >
                Get Started Free
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
        
      </main>
      <Footer />
    </>
  )
}
