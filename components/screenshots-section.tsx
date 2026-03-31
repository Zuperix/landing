"use client"

import Image from "next/image"
import { useAnimateInView } from "@/hooks/use-animate-in-view"
import { cn } from "@/lib/utils"

export function ScreenshotsSection() {
  const { ref: headerRef, isInView: headerInView } = useAnimateInView<HTMLDivElement>()
  const { ref: gridRef, isInView: gridInView } = useAnimateInView<HTMLDivElement>()

  return (
    <section className="py-12 sm:py-16 px-6" aria-labelledby="product-heading">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-12 transition-all duration-700",
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">Product</p>
          <h2 
            id="product-heading"
            className="text-balance font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5"
          >
            Designed for clarity
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty leading-relaxed">
            Every interaction optimized for speed. Find what you need before you know you need it.
          </p>
        </div>

        <div 
          ref={gridRef}
          className={cn(
            "grid grid-cols-1 lg:grid-cols-5 gap-4 transition-all duration-700",
            gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Large screenshot */}
          <div className="lg:col-span-3 rounded-2xl border border-border overflow-hidden shadow-xl shadow-black/20 group hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/10 transition-all duration-300 bg-card">
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-xs text-muted-foreground font-mono">Natural Language Search</span>
              </div>
              <div className="w-8" aria-hidden="true" />
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="/images/nls.png"
                alt="Zuperix asset grid showing natural language search"
                width={700}
                height={420}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="px-5 py-5 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">AI powered search</p>
                <p className="text-xs text-muted-foreground mt-1">Search using natural language</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-2 py-1 rounded bg-brand/10 border border-brand/20 text-[10px] font-bold text-brand uppercase tracking-wider">
                  Semantic
                </div>
                <div className="px-2 py-1 rounded bg-secondary border border-border text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  240ms
                </div>
                <div className="flex -space-x-1.5 ml-2">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="w-5 h-5 rounded-full border border-card bg-muted-foreground/20 flex items-center justify-center text-[8px] font-bold">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Smaller screenshots stack */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Comments & Annotations screenshot */}
            <div 
              className="rounded-2xl border border-border overflow-hidden shadow-lg shadow-black/10 group hover:border-brand/30 hover:shadow-xl transition-all duration-300 flex-1 bg-card"
              style={{ transitionDelay: "100ms" }}
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground font-mono">Asset Discussions</span>
                </div>
                <div className="w-8" aria-hidden="true" />
              </div>
              <div className="relative overflow-hidden">
                <Image
                  src="/images/comment.png"
                  alt="Zuperix interface showing interactive comments and asset annotations"
                  width={480}
                  height={260}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  quality={100}
                />
              </div>
              <div className="px-4 py-3 border-t border-border">
                <p className="text-sm font-semibold text-foreground">Interactive Comments</p>
                <p className="text-xs text-muted-foreground mt-0.5">Annotate directly on assets</p>
              </div>
            </div>

            {/* Face tagging card */}
            {/* <div 
              className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4 hover:border-brand/30 hover:shadow-lg transition-all duration-300 group"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand/15 flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                    <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Face Recognition</p>
                    <p className="text-xs text-muted-foreground">Grouped 1,248 portraits</p>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-semibold">
                  ACTIVE
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex -space-x-2.5">
                  {["A", "B", "C", "D", "E"].map((letter, i) => (
                    <div
                      key={letter}
                      className="w-10 h-10 rounded-full border-2 border-card flex items-center justify-center text-xs font-bold text-white shadow-sm hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                      style={{
                        background: `oklch(${0.5 + i * 0.04} 0.2 ${262 + i * 18})`,
                      }}
                      aria-label={`Person ${letter}`}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div className="ml-3 w-10 h-10 rounded-full border-2 border-dashed border-border bg-secondary/50 flex items-center justify-center text-xs text-muted-foreground font-medium">
                  +9
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Auto-detected 14 unique individuals across your media library. Click to view collections.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
