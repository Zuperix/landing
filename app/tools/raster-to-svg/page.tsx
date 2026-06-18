"use client"

import React, { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import {
  FileCode,
  ArrowLeft,
  Copy,
  Download,
  Trash2,
  Sliders,
  Check,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Settings,
  Eye,
  Info,
  Maximize2,
  RefreshCw,
  SlidersHorizontal,
  Compass,
  Layers
} from "lucide-react"

interface ActiveFile {
  name: string
  sizeStr: string
  sizeBytes: number
  type: string
  originalDataUrl: string // Unaltered source
  preprocessedDataUrl: string // After canvas adjustments
  width: number
  height: number
}

function ImageToSvgVectorizer() {
  const [file, setFile] = useState<ActiveFile | null>(null)
  const [svgOutput, setSvgOutput] = useState<string>("")
  const [vectorizing, setVectorizerLoading] = useState(false)

  // Preprocessing Options
  const [contrast, setContrast] = useState<number[]>([100]) // 50% - 200%
  const [brightness, setBrightness] = useState<number[]>([100]) // 50% - 150%
  const [upscale, setUpscale] = useState<number[]>([100]) // 50% - 200% scaling
  const [grayscale, setGrayscale] = useState<boolean>(false)

  // Tracing Options
  const [preset, setPreset] = useState<"default" | "logo" | "detailed" | "art">("default")
  const [colorCount, setColorCount] = useState<number[]>([16])
  const [blurRadius, setBlurRadius] = useState<number[]>([0])
  const [lineThreshold, setLineThreshold] = useState<number[]>([0.5]) // ltres - lower is more detailed
  const [curveThreshold, setCurveThreshold] = useState<number[]>([0.5]) // qtres - lower is more detailed
  const [coordinatePrecision, setCoordinatePrecision] = useState<number[]>([2]) // roundcoords (1-3)
  const [pathOmit, setPathOmit] = useState<number[]>([0]) // pathomit - lower keeps small details
  
  const [pathCount, setPathCount] = useState(0)
  const [vectorSizeBytes, setVectorSizeBytes] = useState(0)

  const [copied, setCopied] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [libraryLoaded, setLibraryLoaded] = useState(false)
  const [previewMode, setPreviewMode] = useState<"split" | "original" | "vector">("split")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Dynamically load ImageTracerJS from CDN
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      if (window.ImageTracer) {
        setLibraryLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/imagetracerjs/imagetracer_v1.2.6.js"
      script.async = true
      script.onload = () => {
        setLibraryLoaded(true)
      }
      script.onerror = () => {
        setError("Failed to load vectorization engine. Please check your internet connection.")
      }
      document.body.appendChild(script)
    }
  }, [])

  // Apply preprocessing when file or preprocessing parameters change
  useEffect(() => {
    if (!file) return
    applyPreprocessing()
  }, [file?.originalDataUrl, contrast[0], brightness[0], upscale[0], grayscale])

  // Run vectorization when the preprocessed image or options change
  useEffect(() => {
    if (file?.preprocessedDataUrl && libraryLoaded) {
      const delayDebounce = setTimeout(() => {
        runVectorization()
      }, 300) // Debounce to allow smooth slider adjustments
      return () => clearTimeout(delayDebounce)
    }
  }, [
    file?.preprocessedDataUrl,
    colorCount[0],
    blurRadius[0],
    lineThreshold[0],
    curveThreshold[0],
    coordinatePrecision[0],
    pathOmit[0],
    libraryLoaded
  ])

  // Handle Preset Switching
  const applyPreset = (p: typeof preset) => {
    setPreset(p)
    if (p === "logo") {
      // High contrast, low colors, high precision, ignore tiny noise paths
      setColorCount([4])
      setBlurRadius([0])
      setLineThreshold([0.3])
      setCurveThreshold([0.3])
      setCoordinatePrecision([3])
      setPathOmit([2])
      setContrast([140])
      setBrightness([100])
      setUpscale([150]) // Upscale logo for smooth curves
    } else if (p === "detailed") {
      // Lots of colors, very tight curve tracking, keep all paths
      setColorCount([32])
      setBlurRadius([0])
      setLineThreshold([0.2])
      setCurveThreshold([0.2])
      setCoordinatePrecision([3])
      setPathOmit([0])
      setContrast([110])
      setBrightness([100])
    } else if (p === "art") {
      // Smooth artistic style, higher blur to simplify details, moderate colors
      setColorCount([12])
      setBlurRadius([2])
      setLineThreshold([1.0])
      setCurveThreshold([1.0])
      setCoordinatePrecision([2])
      setPathOmit([5])
      setContrast([100])
    } else {
      // Default balanced settings
      setColorCount([16])
      setBlurRadius([0])
      setLineThreshold([0.5])
      setCurveThreshold([0.5])
      setCoordinatePrecision([2])
      setPathOmit([0])
      setContrast([100])
      setBrightness([100])
      setUpscale([100])
      setGrayscale(false)
    }
  }

  // Preprocess Image using Canvas Filters
  const applyPreprocessing = () => {
    if (!file) return

    const img = new window.Image()
    img.src = file.originalDataUrl
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const scale = upscale[0] / 100
      const targetWidth = Math.round(img.width * scale)
      const targetHeight = Math.round(img.height * scale)

      canvas.width = targetWidth
      canvas.height = targetHeight

      // Apply Canvas Filters
      let filterString = ""
      if (contrast[0] !== 100) filterString += `contrast(${contrast[0]}%) `
      if (brightness[0] !== 100) filterString += `brightness(${brightness[0]}%) `
      if (grayscale) filterString += "grayscale(100%) "

      // Fill with solid white first to prevent ImageTracer transparency crashes
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, targetWidth, targetHeight)

      ctx.filter = filterString.trim() || "none"
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      const preprocessedUrl = canvas.toDataURL("image/png")
      setFile(prev => prev ? { ...prev, preprocessedDataUrl: preprocessedUrl } : null)
    }
  }

  // Run Vectorization Core
  const runVectorization = () => {
    if (!file || !file.preprocessedDataUrl) return
    setVectorizerLoading(true)
    setError(null)

    // @ts-ignore
    const tracer = window.ImageTracer
    if (!tracer) {
      setError("Vectorization engine is loading...")
      setVectorizerLoading(false)
      return
    }

    try {
      const options = {
        corsenabled: true,
        ltres: lineThreshold[0],
        qtres: curveThreshold[0],
        pathomit: pathOmit[0],
        blurradius: blurRadius[0],
        numberofcolors: colorCount[0],
        mincolorratio: 0, // Keep all colors
        colorquantcycles: 4, // Higher for better color match accuracy
        colorsampling: 1, // Deterministic sampling
        roundcoords: coordinatePrecision[0], // Round to decimals for smoother outputs
        rightangleenhance: preset === "logo" ? 1 : 0
      }

      tracer.imageToSVG(
        file.preprocessedDataUrl,
        (svgString: string) => {
          try {
            if (!svgString || typeof svgString !== "string") {
              throw new Error("Invalid output received from tracer")
            }
            setSvgOutput(svgString)
            setVectorizerLoading(false)

            const blob = new Blob([svgString], { type: "image/svg+xml" })
            setVectorSizeBytes(blob.size)

            const paths = (svgString.match(/<path/g) || []).length
            setPathCount(paths)
          } catch (callbackErr) {
            console.error(callbackErr)
            setError("Traced output compilation failed. Try different settings.")
            setVectorizerLoading(false)
          }
        },
        options
      )
    } catch (err) {
      console.error(err)
      setError("Vectorization failed. Try lowering color count or resetting options.")
      setVectorizerLoading(false)
    }
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
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const processFile = (selectedFile: File) => {
    setError(null)
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"]
    if (!allowed.includes(selectedFile.type)) {
      setError("Please select a valid raster image (PNG, JPEG, WebP).")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      
      const img = new window.Image()
      img.src = dataUrl
      img.onload = () => {
        setFile({
          name: selectedFile.name,
          sizeStr: (selectedFile.size / 1024).toFixed(1) + " KB",
          sizeBytes: selectedFile.size,
          type: selectedFile.type,
          originalDataUrl: dataUrl,
          preprocessedDataUrl: dataUrl,
          width: img.width,
          height: img.height
        })
      }
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleCopy = () => {
    if (!svgOutput) return
    navigator.clipboard.writeText(svgOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!svgOutput || !file) return
    const blob = new Blob([svgOutput], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url

    const baseName = file.name.substring(0, file.name.lastIndexOf("."))
    link.download = `${baseName}-vector.svg`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setSuccessMsg("Vector SVG downloaded successfully.")
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  const handleClear = () => {
    setFile(null)
    setSvgOutput("")
    setError(null)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden pt-28 pb-20 px-6">
        <canvas ref={canvasRef} className="hidden" />
        
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
              Image to SVG Vectorizer
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Trace and vectorize PNG, JPEG, or WebP images into high-quality, scalable SVG vector paths. Boost resolution, tweak curves, adjust contrast, and preview results instantly. 100% client-side.
            </p>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">{successMsg}</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Core App View */}
          {!file ? (
            /* Upload dropzone */
            <div
              ref={dropZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border hover:border-brand/40 bg-card/20 hover:bg-card/40 transition-all rounded-3xl p-16 flex flex-col items-center justify-center text-center cursor-pointer group animate-fade-in"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Drag & Drop Image Here</h3>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
                Supports PNG, JPEG, JPG, and WebP. Tracing is computed fully inside your browser.
              </p>
              <Button className="bg-brand hover:bg-brand-dim text-white border-0 px-6 rounded-xl">
                Browse Files
              </Button>
            </div>
          ) : (
            /* Vectorizer Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left Column: Tracing Settings */}
              <div className="lg:col-span-4 space-y-6 animate-fade-in">

                {/* Preset Selector */}
                <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                  <h3 className="font-semibold text-sm flex items-center gap-2 pb-2.5 border-b border-border/60">
                    <Compass className="w-4 h-4 text-brand" />
                    Tracing Presets
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "default", label: "Standard" },
                      { id: "logo", label: "Logo / Icon" },
                      { id: "detailed", label: "High Detail" },
                      { id: "art", label: "Smooth Art" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => applyPreset(item.id as any)}
                        className={`py-2 text-xs font-semibold rounded-xl border transition-all ${preset === item.id
                            ? "bg-brand/10 border-brand text-brand font-bold"
                            : "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-accent/10"
                          }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preprocessing Controls */}
                <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                  <h3 className="font-semibold text-sm flex items-center gap-2 pb-2.5 border-b border-border/60">
                    <SlidersHorizontal className="w-4 h-4 text-brand" />
                    Image Enhancers
                  </h3>

                  {/* Contrast Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-muted-foreground uppercase">Contrast</span>
                      <span className="font-bold text-brand">{contrast[0]}%</span>
                    </div>
                    <Slider
                      value={contrast}
                      onValueChange={setContrast}
                      min={50}
                      max={200}
                      step={5}
                    />
                    <p className="text-[10px] text-muted-foreground">Boost contrast to create sharper edge separations.</p>
                  </div>

                  {/* Resolution Scaling Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-muted-foreground uppercase">Target Resolution Scale</span>
                      <span className="font-bold text-brand">{upscale[0]}%</span>
                    </div>
                    <Slider
                      value={upscale}
                      onValueChange={setUpscale}
                      min={50}
                      max={200}
                      step={10}
                    />
                    <p className="text-[10px] text-muted-foreground">Upscale small images to produce smoother curves.</p>
                  </div>

                  {/* Grayscale Toggle */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Convert to Grayscale</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={grayscale} 
                        onChange={(e) => setGrayscale(e.target.checked)} 
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:height-4 after:w-4 after:h-4 after:transition-all peer-checked:bg-brand"></div>
                    </label>
                  </div>
                </div>

                {/* Advanced Fine Tuning */}
                <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
                  <h3 className="font-semibold text-sm flex items-center gap-2 pb-2.5 border-b border-border/60">
                    <Sliders className="w-4 h-4 text-brand" />
                    Tracing Fine-Tuning
                  </h3>

                  {/* Color Count Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-muted-foreground uppercase">Color Layers</span>
                      <span className="font-bold text-brand">{colorCount[0]}</span>
                    </div>
                    <Slider
                      value={colorCount}
                      onValueChange={setColorCount}
                      min={2}
                      max={64}
                      step={1}
                    />
                  </div>

                  {/* Line Fit Quality (ltres) */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-muted-foreground uppercase">Line Fit Tolerance</span>
                      <span className="font-bold text-brand">{lineThreshold[0]}</span>
                    </div>
                    <Slider
                      value={lineThreshold}
                      onValueChange={setLineThreshold}
                      min={0.1}
                      max={2.0}
                      step={0.1}
                    />
                    <p className="text-[10px] text-muted-foreground">Lower values follow details and corners more tightly.</p>
                  </div>

                  {/* Curve Fit Quality (qtres) */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-muted-foreground uppercase">Curve Fit Tolerance</span>
                      <span className="font-bold text-brand">{curveThreshold[0]}</span>
                    </div>
                    <Slider
                      value={curveThreshold}
                      onValueChange={setCurveThreshold}
                      min={0.1}
                      max={2.0}
                      step={0.1}
                    />
                  </div>

                  {/* Curve Precision (roundcoords) */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-muted-foreground uppercase">Path Node Precision</span>
                      <span className="font-bold text-brand">{coordinatePrecision[0]}</span>
                    </div>
                    <Slider
                      value={coordinatePrecision}
                      onValueChange={setCoordinatePrecision}
                      min={1}
                      max={3}
                      step={1}
                    />
                    <p className="text-[10px] text-muted-foreground">Higher values produce cleaner, less jagged shapes.</p>
                  </div>
                </div>

                {/* Vector Info & Action Stats */}
                {svgOutput && (
                  <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                    <h3 className="font-semibold text-sm flex items-center gap-2 pb-2.5 border-b border-border/60">
                      <Layers className="w-4 h-4 text-brand" />
                      Vector Output Specs
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Source Size:</span>
                        <p className="font-semibold mt-0.5">{file.sizeStr}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">SVG Output Size:</span>
                        <p className="font-semibold text-brand mt-0.5">{(vectorSizeBytes / 1024).toFixed(1)} KB</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Total Vector Paths:</span>
                        <p className="font-bold text-foreground mt-0.5">{pathCount} elements</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Main Action Triggers */}
                <div className="space-y-3">
                  {svgOutput && (
                    <>
                      <Button
                        onClick={handleDownload}
                        className="w-full bg-brand hover:bg-brand-dim text-white border-0 h-12 rounded-xl gap-2 font-medium"
                      >
                        <Download className="w-4 h-4" />
                        Download SVG File
                      </Button>
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        className="w-full border-border hover:bg-accent text-foreground h-12 rounded-xl gap-2 font-medium"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied SVG Code" : "Copy SVG Code"}
                      </Button>
                    </>
                  )}
                  <Button
                    onClick={handleClear}
                    variant="ghost"
                    className="w-full text-muted-foreground hover:text-foreground h-11 rounded-xl"
                  >
                    Clear & Upload New
                  </Button>
                </div>
              </div>

              {/* Right Column: Interactive Previews */}
              <div className="lg:col-span-8 space-y-6 animate-fade-in">
                {/* View Switcher Tabs */}
                <div className="flex border-b border-border">
                  {[
                    { id: "split", label: "Side-by-Side View" },
                    { id: "original", label: "Unaltered Original" },
                    { id: "vector", label: "Vector Output" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setPreviewMode(tab.id as any)}
                      className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-[2px] ${
                        previewMode === tab.id
                          ? "border-brand text-brand font-bold"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Viewports */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-border/60 bg-accent/15 flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-brand" />
                      Viewport Preview
                    </span>
                    <span className="text-[10px] font-semibold text-muted-foreground bg-accent border border-border px-2 py-0.5 rounded-md">
                      Interactive Live Render
                    </span>
                  </div>

                  {previewMode === "split" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 bg-zinc-950/80 min-h-[400px]">
                      {/* Left side: Original preprocessed preview */}
                      <div className="p-6 border-r border-border/30 flex flex-col justify-between items-center relative min-h-[350px]">
                        <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 rounded text-[10px] font-bold text-muted-foreground">Original Preprocessed</div>
                        <div className="flex-1 flex items-center justify-center w-full my-4">
                          <img 
                            src={file.preprocessedDataUrl} 
                            alt="Preprocessed raster preview" 
                            className="max-w-full max-h-[300px] object-contain rounded-lg shadow-lg border border-border/20" 
                          />
                        </div>
                        <div className="text-[10px] text-muted-foreground text-center">
                          Input Resolution: {file.width} × {file.height} px
                        </div>
                      </div>

                      {/* Right side: SVG vector preview */}
                      <div className="p-6 flex flex-col justify-between items-center relative min-h-[350px]">
                        <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 rounded text-[10px] font-bold text-brand">Vector Output</div>
                        <div className="flex-1 flex items-center justify-center w-full my-4">
                          {vectorizing ? (
                            <div className="flex flex-col items-center justify-center gap-3">
                              <Spinner className="w-8 h-8 text-brand animate-spin" />
                              <p className="text-xs text-muted-foreground font-semibold">Tracing vector shapes...</p>
                            </div>
                          ) : svgOutput ? (
                            <div
                              dangerouslySetInnerHTML={{ __html: svgOutput }}
                              className="w-full h-full max-w-[280px] max-h-[280px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
                            />
                          ) : (
                            <div className="text-center p-6 space-y-2 text-muted-foreground">
                              <FileCode className="w-10 h-10 mx-auto opacity-50" />
                              <p className="text-xs font-semibold">Vector Preview Loading</p>
                            </div>
                          )}
                        </div>
                        <div className="text-[10px] text-muted-foreground text-center">
                          Generated Paths: {pathCount} elements
                        </div>
                      </div>
                    </div>
                  )}

                  {previewMode === "original" && (
                    <div className="flex items-center justify-center p-8 bg-zinc-950/80 min-h-[400px]">
                      <img 
                        src={file.originalDataUrl} 
                        alt="Original uploaded document preview" 
                        className="max-w-full max-h-[360px] object-contain rounded-lg shadow-xl" 
                      />
                    </div>
                  )}

                  {previewMode === "vector" && (
                    <div className="flex items-center justify-center p-8 bg-zinc-950/80 min-h-[400px]">
                      {vectorizing ? (
                        <div className="flex flex-col items-center justify-center gap-3">
                          <Spinner className="w-8 h-8 text-brand animate-spin" />
                          <p className="text-xs text-muted-foreground font-semibold font-mono">Tracing raster...</p>
                        </div>
                      ) : svgOutput ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: svgOutput }}
                          className="w-full h-full max-w-[360px] max-h-[360px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
                        />
                      ) : (
                        <div className="text-center p-6 space-y-2 text-muted-foreground animate-pulse">
                          <FileCode className="w-10 h-10 mx-auto opacity-50" />
                          <p className="text-sm font-semibold">Idle</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Original File Description */}
                <div className="p-4 rounded-xl border border-border bg-card/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-border bg-accent/25 relative shrink-0">
                      <img src={file.originalDataUrl} alt="Original uploaded reference thumbnail" className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">Original Document Reference</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{file.name} ({file.sizeStr})</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground bg-accent px-2 py-1 rounded border border-border">
                    Raster Source
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default dynamic(() => Promise.resolve(ImageToSvgVectorizer), { ssr: false })
