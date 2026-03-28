"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  Image as ImageIcon, 
  Box, 
  Globe, 
  FileText, 
  Layers, 
  ScanText, 
  Hash, 
  MapPin, 
  Database,
  Search,
  Zap,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const STEPS = [
  { 
    id: "image", 
    inputIcon: ImageIcon, 
    inputLabel: "Image", 
    outputIcon: ScanText, 
    outputLabel: "OCR Text", 
    color: "blue", 
    process: "Extracting OCR Data" 
  },
  { 
    id: "3d", 
    inputIcon: Box, 
    inputLabel: "3D Mesh", 
    outputIcon: Hash, 
    outputLabel: "AI Tags", 
    color: "purple", 
    process: "Analyzing Geometry" 
  },
  { 
    id: "geo", 
    inputIcon: Globe, 
    inputLabel: "Geo Asset", 
    outputIcon: MapPin, 
    outputLabel: "Geo-Meta", 
    color: "emerald", 
    process: "Mapping Coordinates" 
  },
  { 
    id: "pdf", 
    inputIcon: FileText, 
    inputLabel: "PDF Doc", 
    outputIcon: Search, 
    outputLabel: "Vector Index", 
    color: "orange", 
    process: "Vectorizing Context" 
  },
]

function ConnectionLine({ active }: { active: boolean }) {
  return (
    <div className="relative h-px flex-1">
      <div className={cn(
        "absolute inset-0 bg-border/30 transition-colors duration-500",
        active && "bg-brand/20"
      )} />
      {active && (
        <motion.div
          initial={{ left: "0%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent blur-[1px]"
        />
      )}
    </div>
  )
}

export function AssetProcessingPipeline() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const current = STEPS[activeStep]

  return (
    <div className="relative w-full overflow-hidden bg-secondary/5 border border-border/50 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-3xl">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pt-6" />

      <div className="relative z-10 flex flex-col gap-12 max-w-4xl mx-auto">
        
        {/* Step-by-Step Pipeline View */}
        <div className="flex flex-col items-center gap-12">
          
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {STEPS.map((step, i) => (
                <div 
                  key={step.id}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 border-background flex items-center justify-center transition-all duration-500",
                    i === activeStep ? "bg-brand text-white scale-110 z-20" : "bg-secondary text-muted-foreground scale-90 z-10 opacity-40"
                  )}
                >
                  <step.inputIcon className="w-3.5 h-3.5" />
                </div>
              ))}
            </div>
            <div className="h-4 w-px bg-border/50 mx-1" />
            <AnimatePresence mode="wait">
              <motion.p
                key={current.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm font-bold tracking-tight text-foreground"
              >
                {current.process}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Core Animation Area */}
          <div className="w-full flex items-center justify-between gap-4 py-8">
            
            {/* Input Node */}
            <div className="flex flex-col items-center gap-3 w-28">
              <motion.div
                animate={activeStep !== null ? { 
                  scale: [1, 1.05, 1],
                  borderColor: ["rgba(var(--brand), 0.2)", "rgba(var(--brand), 0.8)", "rgba(var(--brand), 0.2)"]
                } : {}}
                className={cn(
                  "w-16 h-16 rounded-2xl bg-background border flex items-center justify-center shadow-xl transition-all duration-500",
                  "border-border/50 group-hover:border-brand/40"
                )}
              >
                <current.inputIcon className={cn("w-7 h-7 text-brand")} />
              </motion.div>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{current.inputLabel}</span>
            </div>

            {/* Path To Center */}
            <ConnectionLine active={true} />

            {/* Processing Unit */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-10 border border-dashed border-brand/10 rounded-full"
              />
              <motion.div
                animate={{ 
                  boxShadow: ["0 0 20px rgba(var(--brand), 0)", "0 0 40px rgba(var(--brand), 0.2)", "0 0 20px rgba(var(--brand), 0)"] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 rounded-[2rem] bg-brand/5 border-2 border-brand/20 flex flex-col items-center justify-center gap-2 backdrop-blur-md relative"
              >
                <Layers className="w-10 h-10 text-brand" />
                <div className="absolute -bottom-1 px-3 py-1 rounded-full bg-brand text-[8px] font-black text-white uppercase tracking-tighter">
                  Intelligence
                </div>
              </motion.div>
            </div>

            {/* Path To Output */}
            <ConnectionLine active={true} />

            {/* Output Node */}
            <div className="flex flex-col items-center gap-3 w-28">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                  "w-16 h-16 rounded-2xl bg-background border border-brand/30 flex items-center justify-center shadow-xl shadow-brand/5 transition-all duration-500"
                )}
              >
                <current.outputIcon className="w-7 h-7 text-brand" />
              </motion.div>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{current.outputLabel}</span>
            </div>
          </div>

          {/* Details & Extracted Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-4">
            {STEPS.map((step, i) => (
              <div 
                key={step.id}
                className={cn(
                  "p-4 rounded-2xl border transition-all duration-700",
                  i === activeStep 
                    ? "bg-brand/5 border-brand/20 opacity-100 translate-y-0" 
                    : "bg-secondary/20 border-border/30 opacity-40 translate-y-2"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <step.outputIcon className={cn("w-3.5 h-3.5", i === activeStep ? "text-brand" : "text-muted-foreground")} />
                  <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">{step.outputLabel}</span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                  {i === activeStep && (
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.5, ease: "easeInOut" }}
                      className="h-full bg-brand"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
