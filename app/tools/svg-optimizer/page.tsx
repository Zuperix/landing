"use client"

import React, { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  FileCode,
  ArrowLeft,
  Copy,
  Download,
  Trash2,
  Sliders,
  Play,
  Check,
  Upload,
  Layers,
  Sparkles,
  Info
} from "lucide-react"

function SvgOptimizer() {
  const [svgInput, setSvgInput] = useState("")
  const [svgOutput, setSvgOutput] = useState("")
  const [originalSize, setOriginalSize] = useState("0 B")
  const [optimizedSize, setOptimizedSize] = useState("0 B")
  const [savingsPercent, setSavingsPercent] = useState(0)
  
  // Options
  const [stripMetadata, setStripMetadata] = useState(true)
  const [stripComments, setStripComments] = useState(true)
  const [minifyPaths, setMinifyPaths] = useState(true)
  const [precision, setPrecision] = useState(2) // float rounding decimals
  const [minifyWhitespace, setMinifyWhitespace] = useState(true)

  const [copied, setCopied] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (svgInput) {
      optimizeSvg(svgInput)
    } else {
      setSvgOutput("")
      setOriginalSize("0 B")
      setOptimizedSize("0 B")
      setSavingsPercent(0)
    }
  }, [svgInput, stripMetadata, stripComments, minifyPaths, precision, minifyWhitespace])

  const optimizeSvg = (rawSvg: string) => {
    setError(null)
    if (!rawSvg.trim()) return

    const origBytes = new Blob([rawSvg]).size
    setOriginalSize(formatBytes(origBytes))

    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(rawSvg, "image/svg+xml")

      // Check for parsing error elements
      const parserError = doc.querySelector("parsererror")
      if (parserError) {
        setError("Invalid SVG code. Please verify the XML structure.")
        return
      }

      const svgNode = doc.documentElement
      if (svgNode.nodeName.toLowerCase() !== "svg") {
        setError("Supplied XML is not a valid SVG element.")
        return
      }

      // Step 1: Strip Metadata and custom editor namespaces/tags
      if (stripMetadata) {
        // Remove common non-rendering tags
        const tagsToRemove = ["metadata", "desc", "title", "i:pgf"]
        tagsToRemove.forEach((tagName) => {
          doc.querySelectorAll(tagName).forEach((el) => el.remove())
        })

        // Recursively clean custom attributes
        cleanElementAttributes(svgNode)
      }

      // Step 2: Minify SVG Path values
      if (minifyPaths) {
        const pathElements = doc.querySelectorAll("path, polygon, polyline")
        pathElements.forEach((el) => {
          const attributeName = el.nodeName.toLowerCase() === "path" ? "d" : "points"
          const pathVal = el.getAttribute(attributeName)
          if (pathVal) {
            const minifiedPath = pathVal.replace(/[-+]?\d*\.\d+|\d+/g, (num) => {
              const parsed = parseFloat(num)
              if (isNaN(parsed)) return num
              // If it's a float, round it
              return Number(parsed.toFixed(precision)).toString()
            })
            el.setAttribute(attributeName, minifiedPath)
          }
        })
      }

      // Serialize doc to string
      const serializer = new XMLSerializer()
      let output = serializer.serializeToString(doc)

      // Step 3: Remove comments & XML prologues
      if (stripComments) {
        output = output.replace(/<!--[\s\S]*?-->/g, "") // comments
        output = output.replace(/<\?xml[\s\S]*?\?>/g, "") // prologues
      }

      // Step 4: Minify whitespace/newlines
      if (minifyWhitespace) {
        output = output.replace(/>\s+</g, "><") // Space between tags
        output = output.replace(/\s{2,}/g, " ") // Multiple spacing
        output = output.trim()
      }

      setSvgOutput(output)

      const optBytes = new Blob([output]).size
      setOptimizedSize(formatBytes(optBytes))

      if (origBytes > 0) {
        const savings = Math.max(0, Math.round(((origBytes - optBytes) / origBytes) * 100))
        setSavingsPercent(savings)
      }
    } catch (err) {
      console.error("Optimization failed: ", err)
      setError("An error occurred during SVG cleanup.")
    }
  }

  // Recursively remove editor metadata from element attributes
  const cleanElementAttributes = (el: Element) => {
    const attrs = Array.from(el.attributes)
    
    attrs.forEach((attr) => {
      const name = attr.name.toLowerCase()
      // Strip editor specific tags
      if (
        name.startsWith("sketch:") ||
        name.startsWith("inkscape:") ||
        name.startsWith("sodipodi:") ||
        name.startsWith("xmlns:") && name !== "xmlns" && name !== "xmlns:xlink" ||
        name === "x" && el.nodeName.toLowerCase() === "svg" && attr.value === "0px" ||
        name === "y" && el.nodeName.toLowerCase() === "svg" && attr.value === "0px" ||
        name === "id" && attr.value.match(/^(svg|g|path|rect|polygon|line|polyline|circle)\d+$/i) || // auto-gen IDs
        name === "data-name" ||
        name === "xml:space"
      ) {
        el.removeAttribute(attr.name)
      }
    })

    // Walk child nodes recursively
    Array.from(el.children).forEach((child) => cleanElementAttributes(child))
  }

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    return (bytes / 1024).toFixed(1) + " KB"
  }

  const handleCopy = () => {
    if (!svgOutput) return
    navigator.clipboard.writeText(svgOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!svgOutput) return
    const blob = new Blob([svgOutput], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "zuperix-optimized.svg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setSuccessMsg("Optimized SVG downloaded successfully.")
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    dropZoneRef.current?.classList.add("border-brand", "bg-brand/5")
  }

  const handleDragLeave = () => {
    dropZoneRef.current?.classList.remove("border-brand", "bg-brand/5")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    dropZoneRef.current?.classList.remove("border-brand", "bg-brand/5")

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
        readSvgFile(file)
      } else {
        setError("Only SVG vector files are supported.")
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      readSvgFile(e.target.files[0])
    }
  }

  const readSvgFile = (file: File) => {
    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setSvgInput(content)
    }
    reader.readAsText(file)
  }

  const handleLoadSample = () => {
    const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve" data-name="sample-icon">
<!-- Adobe Illustrator metadata comments -->
<metadata id="illustrator-meta-14">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about="" />
  </rdf:RDF>
</metadata>
<g id="Group_1">
  <circle cx="50" cy="50.25412" r="30.54245" fill="#6366F1" id="circle42" />
  <path d="M 50 15 L 65 45 H 35 Z" fill="#FFFFFF" id="path12" sketch:type="path" />
</g>
</svg>`
    setSvgInput(sampleSvg)
  }

  const handleClear = () => {
    setSvgInput("")
    setSvgOutput("")
    setError(null)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Tools
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Vector SVG Optimizer
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Clean, minify, and sanitize SVG markup. Strip editor attributes, compress path values, and preview vector savings instantly in your browser.
            </p>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 flex items-center gap-2 text-sm font-medium">
              <Check className="w-4 h-4 shrink-0" />
              {successMsg}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive flex items-center gap-2 text-sm font-medium">
              <Info className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Core SVG Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Options Panel (col span 3) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                <h3 className="font-semibold text-sm flex items-center gap-2 pb-2.5 border-b border-border/60">
                  <Sliders className="w-4 h-4 text-brand" />
                  Optimizer Options
                </h3>

                {/* Strip editor metadata */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={stripMetadata}
                    onChange={(e) => setStripMetadata(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border border-border bg-background focus:ring-1 focus:ring-brand accent-brand mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-semibold block text-foreground group-hover:text-brand transition-colors">Strip Metadata</span>
                    <span className="text-[10px] text-muted-foreground leading-relaxed block mt-0.5">
                      Remove Figma, Illustrator attributes & definitions.
                    </span>
                  </div>
                </label>

                {/* Strip comments */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={stripComments}
                    onChange={(e) => setStripComments(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border border-border bg-background focus:ring-1 focus:ring-brand accent-brand mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-semibold block text-foreground group-hover:text-brand transition-colors">Wipe Comments</span>
                    <span className="text-[10px] text-muted-foreground leading-relaxed block mt-0.5">
                      Remove XML prologue declarations and code comments.
                    </span>
                  </div>
                </label>

                {/* Round path coordinates */}
                <div className="space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={minifyPaths}
                      onChange={(e) => setMinifyPaths(e.target.checked)}
                      className="w-4.5 h-4.5 rounded border border-border bg-background focus:ring-1 focus:ring-brand accent-brand mt-0.5"
                    />
                    <div>
                      <span className="text-xs font-semibold block text-foreground group-hover:text-brand transition-colors">Minify Coordinates</span>
                      <span className="text-[10px] text-muted-foreground leading-relaxed block mt-0.5">
                        Round decimal coordinates in vector path parameters.
                      </span>
                    </div>
                  </label>
                  
                  {minifyPaths && (
                    <div className="pl-7.5 space-y-1">
                      <span className="text-[10px] text-muted-foreground block uppercase font-bold">Decimal Precision</span>
                      <select
                        value={precision}
                        onChange={(e) => setPrecision(Number(e.target.value))}
                        className="text-xs border border-border bg-background rounded-lg px-2 py-1 focus:outline-none focus:border-brand"
                      >
                        {[0, 1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>{n} decimals</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Minify whitespace */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={minifyWhitespace}
                    onChange={(e) => setMinifyWhitespace(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border border-border bg-background focus:ring-1 focus:ring-brand accent-brand mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-semibold block text-foreground group-hover:text-brand transition-colors">Minify Markup</span>
                    <span className="text-[10px] text-muted-foreground leading-relaxed block mt-0.5">
                      Strip whitespaces and tabs to minimize size.
                    </span>
                  </div>
                </label>
              </div>

              {/* Stats Card */}
              {svgOutput && (
                <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                  <h3 className="font-semibold text-sm flex items-center gap-2 pb-2.5 border-b border-border/60">
                    <Layers className="w-4 h-4 text-brand" />
                    Savings Statistics
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-muted-foreground">Original Size:</span>
                      <p className="font-semibold text-foreground">{originalSize}</p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-muted-foreground">Optimized Size:</span>
                      <p className="font-semibold text-brand">{optimizedSize}</p>
                    </div>
                  </div>

                  {savingsPercent > 0 && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center text-xs font-bold">
                      Saved {savingsPercent}% of file size!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Editor Workspace (col span 9) */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Side: Code Input Editor */}
              <div className="flex flex-col h-[520px] rounded-2xl border border-border bg-card overflow-hidden">
                <div className="px-4.5 py-3 border-b border-border bg-accent/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground uppercase">SVG Markup Editor</span>
                  {svgInput ? (
                    <button onClick={handleClear} className="text-xs text-destructive hover:underline font-semibold">
                      Clear code
                    </button>
                  ) : (
                    <button onClick={handleLoadSample} className="text-xs text-brand hover:underline font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Load sample SVG
                    </button>
                  )}
                </div>
                
                {/* Textarea or Dropzone depending on content */}
                {!svgInput ? (
                  <div
                    ref={dropZoneRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-accent/10 transition-all group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/svg+xml"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                      <Upload className="w-4.5 h-4.5" />
                    </div>
                    <p className="text-sm font-semibold mb-1">Drag SVG file here or click to browse</p>
                    <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                      Or copy-paste raw SVG XML code directly in the viewport by typing code here.
                    </p>
                    <div className="mt-4 border border-border bg-background px-3 py-1.5 rounded-lg text-[10px] font-mono text-muted-foreground group-hover:border-brand/40">
                      Click to activate code editor
                    </div>
                  </div>
                ) : (
                  <textarea
                    value={svgInput}
                    onChange={(e) => setSvgInput(e.target.value)}
                    className="flex-1 p-4 font-mono text-xs border-0 bg-background resize-none focus:outline-none focus:ring-0 text-foreground overflow-auto"
                    placeholder="Paste SVG code here..."
                  />
                )}
              </div>

              {/* Right Side: Live preview / Output Code */}
              <div className="flex flex-col h-[520px] rounded-2xl border border-border bg-card overflow-hidden">
                <div className="px-4.5 py-3 border-b border-border bg-accent/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Live Vector Preview</span>
                  {svgOutput && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="text-xs text-muted-foreground hover:text-foreground font-semibold flex items-center gap-1 transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy markup
                          </>
                        )}
                      </button>
                      
                      <span className="w-1 h-3 bg-border" />
                      
                      <button
                        onClick={handleDownload}
                        className="text-xs text-brand hover:text-brand-dim font-semibold flex items-center gap-1 transition-colors animate-pulse"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 bg-accent/5 flex items-center justify-center p-8 relative">
                  {svgOutput ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: svgOutput }}
                      className="w-full h-full max-w-[280px] max-h-[280px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
                    />
                  ) : (
                    <div className="text-center p-6 space-y-2 text-muted-foreground">
                      <FileCode className="w-10 h-10 mx-auto opacity-50" />
                      <p className="text-sm font-semibold">Waiting for vector code...</p>
                      <p className="text-xs max-w-xs leading-relaxed">
                        Input valid SVG markup code or drag an SVG file in the code editor to generate optimized vector assets.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default dynamic(() => Promise.resolve(SvgOptimizer), { ssr: false })
