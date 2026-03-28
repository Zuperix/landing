"use client"

import { Upload, Cpu, Zap, LucideIcon } from "lucide-react"
import { useAnimateInView } from "@/hooks/use-animate-in-view"
import { cn } from "@/lib/utils"
import { AssetProcessingPipeline } from "@/components/ui/asset-processing-pipeline"

interface Step {
  number: string
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: "01",
    icon: Upload,
    title: "Upload assets",
    description:
      "Drag and drop images, videos, PDFs, and files. Supports bulk upload via API or the web interface.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI processes them",
    description:
      "OCR, smart tagging, face recognition, and vector embeddings run automatically in the background.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Instantly search",
    description:
      "Use natural language, structured queries, or advanced syntax to find exactly what you need in milliseconds.",
  },
]

function StepItem({ step, index, total }: { step: Step; index: number; total: number }) {
  const { ref, isInView } = useAnimateInView<HTMLDivElement>()
  const Icon = step.icon

  return (
    <div 
      ref={ref}
      className={cn(
        "flex gap-5 transition-all duration-500",
        isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
            <Icon className="w-6 h-6 text-brand" aria-hidden="true" />
          </div>
          {/* Pulsing ring animation */}
          <div 
            className="absolute inset-0 rounded-2xl border border-brand/30 animate-ping opacity-0 group-hover:opacity-20" 
            style={{ animationDuration: "2s" }}
            aria-hidden="true"
          />
        </div>
        {index < total - 1 && (
          <div className="w-px flex-1 mt-4 bg-gradient-to-b from-border to-transparent min-h-[40px]" aria-hidden="true" />
        )}
      </div>
      <div className="pb-10 last:pb-0 pt-2">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono text-brand font-bold bg-brand/10 px-2 py-1 rounded-md">{step.number}</span>
          <h3 className="font-semibold text-lg text-foreground">{step.title}</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
      </div>
    </div>
  )
}

export function HowItWorks() {
  const { ref: headerRef, isInView: headerInView } = useAnimateInView<HTMLDivElement>()

  return (
    <section 
      id="how-it-works" 
      className="py-24 sm:py-32 px-6 bg-secondary/30"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-20 transition-all duration-700",
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">How it works</p>
          <h2 
            id="how-it-works-heading"
            className="text-balance font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5"
          >
            From upload to insight in seconds
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty leading-relaxed">
            Three simple steps. Endless intelligence underneath.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Steps */}
          <div className="flex flex-col" role="list" aria-label="Steps">
            {steps.map((step, i) => (
              <StepItem key={step.number} step={step} index={i} total={steps.length} />
            ))}
          </div>

          {/* Pipeline Animation */}
          <div className="relative w-full overflow-hidden">
            <AssetProcessingPipeline />
          </div>
        </div>
      </div>
    </section>
  )
}
