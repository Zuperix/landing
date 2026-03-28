"use client"

import Image from "next/image"
import { Check, X, Minus } from "lucide-react"
import { useAnimateInView } from "@/hooks/use-animate-in-view"
import { cn } from "@/lib/utils"

type CellValue = boolean | "partial"

interface ComparisonRow {
  feature: string
  zuperix: CellValue
  googleDrive: CellValue
  dropbox: CellValue
}

const comparisons: ComparisonRow[] = [
  { feature: "Natural language search", zuperix: true, googleDrive: false, dropbox: false },
  { feature: "AI auto-tagging", zuperix: true, googleDrive: false, dropbox: false },
  { feature: "OCR & text extraction", zuperix: true, googleDrive: false, dropbox: false },
  { feature: "Face recognition", zuperix: true, googleDrive: false, dropbox: false },
  { feature: "Advanced search syntax", zuperix: true, googleDrive: false, dropbox: false },
  { feature: "Self-hostable", zuperix: true, googleDrive: false, dropbox: false },
  { feature: "API-first architecture", zuperix: true, googleDrive: "partial", dropbox: "partial" },
  { feature: "Activity logging", zuperix: true, googleDrive: true, dropbox: true },
  { feature: "File storage", zuperix: true, googleDrive: true, dropbox: true },
]

function Cell({ value, isZuperix = false }: { value: CellValue; isZuperix?: boolean }) {
  if (value === true)
    return (
      <div className="flex justify-center">
        <div className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center transition-colors",
          isZuperix ? "bg-brand/15" : "bg-green-500/10"
        )}>
          <Check 
            className={cn("w-4 h-4", isZuperix ? "text-brand" : "text-green-500")} 
            aria-label="Supported" 
          />
        </div>
      </div>
    )
  if (value === "partial")
    return (
      <div className="flex justify-center">
        <div className="w-7 h-7 rounded-full bg-yellow-500/10 flex items-center justify-center">
          <Minus className="w-4 h-4 text-yellow-500" aria-label="Partial support" />
        </div>
      </div>
    )
  return (
    <div className="flex justify-center">
      <div className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center">
        <X className="w-4 h-4 text-muted-foreground/40" aria-label="Not supported" />
      </div>
    </div>
  )
}

function CompetitorLogo({ name, variant }: { name: string; variant: "zuperix" | "drive" | "dropbox" }) {
  if (variant === "zuperix") {
    return (
      <div className="w-10 h-10 relative flex items-center justify-center">
        <Image 
          src="/logo_transparant.png" 
          alt="Zuperix Logo" 
          fill 
          className="object-contain"
          priority
        />
      </div>
    )
  }
  
  if (variant === "drive") {
    return (
      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M8 2l8 0 4 7-8 0z" fill="#4285f4" />
          <path d="M1 15l4-6 8 0-4 6z" fill="#fbbc05" />
          <path d="M16 9l4 6-8 0-4-6z" fill="#34a853" />
          <path d="M5 15l4 6 8 0-4-6z" fill="#ea4335" />
        </svg>
      </div>
    )
  }
  
  return (
    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M12 2L4 8l8 6 8-6-8-6z" fill="#0061ff" />
        <path d="M4 8v8l8 6v-8L4 8z" fill="#0061ff" opacity="0.6" />
        <path d="M20 8v8l-8 6v-8l8-6z" fill="#0061ff" opacity="0.8" />
      </svg>
    </div>
  )
}

export function Comparison() {
  const { ref: headerRef, isInView: headerInView } = useAnimateInView<HTMLDivElement>()
  const { ref: tableRef, isInView: tableInView } = useAnimateInView<HTMLDivElement>()

  return (
    <section className="py-24 sm:py-32 px-6 bg-secondary/30" aria-labelledby="comparison-heading">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-12 transition-all duration-700",
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">Comparison</p>
          <h2 
            id="comparison-heading"
            className="text-balance font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5"
          >
            AI-native vs. just storage
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty leading-relaxed">
            Zuperix is built around intelligence. Others bolt it on — or don't bother.
          </p>
        </div>

        <div 
          ref={tableRef}
          className={cn(
            "rounded-2xl border border-border overflow-hidden bg-card shadow-xl shadow-black/10 transition-all duration-700",
            tableInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          role="table"
          aria-label="Feature comparison"
        >
          {/* Table header */}
          <div className="grid grid-cols-4 border-b border-border bg-secondary/50" role="row">
            <div className="p-4 sm:p-5 col-span-1" role="columnheader" aria-label="Feature" />
            
            <div className="p-4 sm:p-5 text-center border-l border-border" role="columnheader">
              <div className="inline-flex flex-col items-center gap-2">
                <CompetitorLogo name="Zuperix" variant="zuperix" />
                <span className="text-sm font-semibold text-foreground">Zuperix</span>
                <span className="text-[10px] text-brand font-bold tracking-wider bg-brand/10 px-2 py-0.5 rounded-full">
                  AI-NATIVE
                </span>
              </div>
            </div>
            
            <div className="p-4 sm:p-5 text-center border-l border-border" role="columnheader">
              <div className="inline-flex flex-col items-center gap-2">
                <CompetitorLogo name="Google Drive" variant="drive" />
                <span className="text-sm font-semibold text-foreground">Google Drive</span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-wider">STORAGE</span>
              </div>
            </div>
            
            <div className="p-4 sm:p-5 text-center border-l border-border" role="columnheader">
              <div className="inline-flex flex-col items-center gap-2">
                <CompetitorLogo name="Dropbox" variant="dropbox" />
                <span className="text-sm font-semibold text-foreground">Dropbox</span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-wider">STORAGE</span>
              </div>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <div
              key={row.feature}
              className={cn(
                "grid grid-cols-4 transition-colors hover:bg-accent/30",
                i < comparisons.length - 1 && "border-b border-border"
              )}
              role="row"
            >
              <div className="p-4 sm:p-5 text-sm text-muted-foreground font-medium" role="cell">
                {row.feature}
              </div>
              <div className="p-4 sm:p-5 border-l border-border bg-brand/[0.03]" role="cell">
                <Cell value={row.zuperix} isZuperix />
              </div>
              <div className="p-4 sm:p-5 border-l border-border" role="cell">
                <Cell value={row.googleDrive} />
              </div>
              <div className="p-4 sm:p-5 border-l border-border" role="cell">
                <Cell value={row.dropbox} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
