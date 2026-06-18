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
  RefreshCw,
  Upload,
  ArrowLeft,
  Download,
  Image as ImageIcon,
  CheckCircle,
  FileDown,
  Trash2,
  Sliders,
  Info,
  Maximize2,
  Palette,
  Eye
} from "lucide-react"

interface ActiveFile {
  id: string
  file: File
  originalSize: string
  originalSizeBytes: number
  convertedSize?: string
  convertedSizeBytes?: number
  savingPercent?: number
  status: "pending" | "converting" | "completed" | "error"
  resultDataUrl?: string
  width?: number
  height?: number
}

function ImageConverter() {
  const [files, setFiles] = useState<ActiveFile[]>([])
  const [targetFormat, setTargetFormat] = useState<"image/webp" | "image/jpeg" | "image/png">("image/webp")
  const [quality, setQuality] = useState<number[]>([80]) // 1-100
  const [globalConverting, setGlobalConverting] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Resize State Options
  const [enableResize, setEnableResize] = useState(false)
  const [resizeWidth, setResizeWidth] = useState<string>("800")
  const [resizeHeight, setResizeHeight] = useState<string>("600")
  const [lockAspectRatio, setLockAspectRatio] = useState(true)
  const [resizeMode, setResizeMode] = useState<"stretch" | "crop" | "fit">("crop")
  const [fitFillType, setFitFillType] = useState<"blur" | "color">("blur")
  const [customColor, setCustomColor] = useState<string>("#121212")

  // Preview State
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const [previewWidth, setPreviewWidth] = useState<number>(0)
  const [previewHeight, setPreviewHeight] = useState<number>(0)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  // Real-time rendering of the selected file for live preview
  useEffect(() => {
    const selected = files.find((f) => f.id === selectedFileId)
    if (!selected) {
      setPreviewSrc(null)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        let targetW = img.width
        let targetH = img.height

        if (enableResize) {
          const reqW = Number(resizeWidth) || 800
          const reqH = Number(resizeHeight) || 600

          if (lockAspectRatio) {
            const scale = Math.min(reqW / img.width, reqH / img.height)
            targetW = Math.round(img.width * scale)
            targetH = Math.round(img.height * scale)
          } else {
            targetW = reqW
            targetH = reqH
          }
        }

        setPreviewWidth(targetW)
        setPreviewHeight(targetH)

        // Draw preview onto a temporary canvas
        const canvas = document.createElement("canvas")
        canvas.width = targetW
        canvas.height = targetH
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Perform crop / fill operations
        if (enableResize && !lockAspectRatio) {
          if (resizeMode === "fit") {
            if (fitFillType === "color") {
              ctx.fillStyle = customColor
              ctx.fillRect(0, 0, targetW, targetH)
            } else {
              // Blur background
              const blurScale = Math.max(targetW / img.width, targetH / img.height)
              const blurW = img.width * blurScale
              const blurH = img.height * blurScale
              const blurX = (targetW - blurW) / 2
              const blurY = (targetH - blurH) / 2

              ctx.save()
              ctx.filter = "blur(18px) brightness(0.6)"
              ctx.drawImage(img, blurX, blurY, blurW, blurH)
              ctx.restore()
              
              ctx.fillStyle = "rgba(0,0,0,0.2)"
              ctx.fillRect(0, 0, targetW, targetH)
            }

            const scale = Math.min(targetW / img.width, targetH / img.height)
            const newW = img.width * scale
            const newH = img.height * scale
            const x = (targetW - newW) / 2
            const y = (targetH - newH) / 2
            ctx.drawImage(img, x, y, newW, newH)
          } 
          else if (resizeMode === "crop") {
            const scale = Math.max(targetW / img.width, targetH / img.height)
            const newW = img.width * scale
            const newH = img.height * scale
            const x = (targetW - newW) / 2
            const y = (targetH - newH) / 2
            ctx.drawImage(img, x, y, newW, newH)
          } 
          else {
            ctx.drawImage(img, 0, 0, targetW, targetH)
          }
        } 
        else {
          if (targetFormat === "image/jpeg") {
            ctx.fillStyle = "#FFFFFF"
            ctx.fillRect(0, 0, targetW, targetH)
          }
          ctx.drawImage(img, 0, 0, targetW, targetH)
        }

        // Output low-quality JPEG to DataURL for hyper-fast interface responsiveness
        setPreviewSrc(canvas.toDataURL("image/jpeg", 0.75))
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(selected.file)
  }, [
    selectedFileId,
    enableResize,
    resizeWidth,
    resizeHeight,
    lockAspectRatio,
    resizeMode,
    fitFillType,
    customColor,
    targetFormat,
    files
  ])

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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files))
    }
  }

  const addFiles = (newFiles: File[]) => {
    const acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
    
    const formatted: ActiveFile[] = newFiles
      .filter((file) => acceptedTypes.includes(file.type) || file.name.match(/\.(png|jpe?g|webp|gif)$/i))
      .map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        originalSize: (file.size / 1024).toFixed(1) + " KB",
        originalSizeBytes: file.size,
        status: "pending"
      }))

    setFiles((prev) => {
      const nextList = [...prev, ...formatted]
      if (nextList.length > 0 && !selectedFileId) {
        setSelectedFileId(nextList[0].id)
      }
      return nextList
    })
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const nextList = prev.filter((item) => item.id !== id)
      if (selectedFileId === id) {
        setSelectedFileId(nextList.length > 0 ? nextList[0].id : null)
      }
      return nextList
    })
  }

  const clearAllFiles = () => {
    setFiles([])
    setSelectedFileId(null)
    setPreviewSrc(null)
    setSuccessMsg(null)
  }

  // Convert a single file
  const convertFile = (activeFile: ActiveFile): Promise<ActiveFile> => {
    return new Promise((resolve) => {
      const updatedFile = { ...activeFile, status: "converting" as const }
      setFiles((prev) => prev.map((f) => (f.id === activeFile.id ? updatedFile : f)))

      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          let targetW = img.width
          let targetH = img.height

          if (enableResize) {
            const reqW = Number(resizeWidth) || 800
            const reqH = Number(resizeHeight) || 600

            if (lockAspectRatio) {
              const scale = Math.min(reqW / img.width, reqH / img.height)
              targetW = Math.round(img.width * scale)
              targetH = Math.round(img.height * scale)
            } else {
              targetW = reqW
              targetH = reqH
            }
          }

          const canvas = document.createElement("canvas")
          canvas.width = targetW
          canvas.height = targetH
          const ctx = canvas.getContext("2d")
          if (!ctx) {
            resolve({ ...activeFile, status: "error" })
            return
          }

          if (enableResize && !lockAspectRatio) {
            if (resizeMode === "fit") {
              if (fitFillType === "color") {
                ctx.fillStyle = customColor
                ctx.fillRect(0, 0, targetW, targetH)
              } else {
                const blurScale = Math.max(targetW / img.width, targetH / img.height)
                const blurW = img.width * blurScale
                const blurH = img.height * blurScale
                const blurX = (targetW - blurW) / 2
                const blurY = (targetH - blurH) / 2

                ctx.save()
                ctx.filter = "blur(24px) brightness(0.65)"
                ctx.drawImage(img, blurX, blurY, blurW, blurH)
                ctx.restore()
                
                ctx.fillStyle = "rgba(0,0,0,0.25)"
                ctx.fillRect(0, 0, targetW, targetH)
              }

              const scale = Math.min(targetW / img.width, targetH / img.height)
              const newW = img.width * scale
              const newH = img.height * scale
              const x = (targetW - newW) / 2
              const y = (targetH - newH) / 2
              ctx.drawImage(img, x, y, newW, newH)
            } 
            else if (resizeMode === "crop") {
              const scale = Math.max(targetW / img.width, targetH / img.height)
              const newW = img.width * scale
              const newH = img.height * scale
              const x = (targetW - newW) / 2
              const y = (targetH - newH) / 2
              ctx.drawImage(img, x, y, newW, newH)
            } 
            else {
              ctx.drawImage(img, 0, 0, targetW, targetH)
            }
          } 
          else {
            if (targetFormat === "image/jpeg") {
              ctx.fillStyle = "#FFFFFF"
              ctx.fillRect(0, 0, targetW, targetH)
            }
            ctx.drawImage(img, 0, 0, targetW, targetH)
          }

          const qVal = quality[0] / 100

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const finalSize = blob.size
                const diff = activeFile.originalSizeBytes - finalSize
                const saved = Math.round((diff / activeFile.originalSizeBytes) * 100)

                const readerResult = new FileReader()
                readerResult.onloadend = () => {
                  resolve({
                    ...activeFile,
                    status: "completed",
                    convertedSize: (finalSize / 1024).toFixed(1) + " KB",
                    convertedSizeBytes: finalSize,
                    savingPercent: saved,
                    resultDataUrl: readerResult.result as string,
                    width: targetW,
                    height: targetH
                  })
                }
                readerResult.readAsDataURL(blob)
              } else {
                resolve({ ...activeFile, status: "error" })
              }
            },
            targetFormat,
            targetFormat === "image/png" ? undefined : qVal
          )
        }
        img.onerror = () => {
          resolve({ ...activeFile, status: "error" })
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(activeFile.file)
    })
  }

  // Convert all pending files
  const handleConvertAll = async () => {
    if (files.length === 0) return
    setGlobalConverting(true)
    setSuccessMsg(null)

    const pending = files.filter((f) => f.status !== "completed")
    const updatedList = [...files]

    for (const item of pending) {
      const result = await convertFile(item)
      const index = updatedList.findIndex((f) => f.id === item.id)
      if (index !== -1) {
        updatedList[index] = result
        setFiles([...updatedList])
      }
    }

    setGlobalConverting(false)
    setSuccessMsg(`Successfully processed ${pending.length} assets!`)
  }

  // Trigger download of a single converted file
  const handleDownload = (item: ActiveFile) => {
    if (!item.resultDataUrl) return
    
    const extension = targetFormat === "image/webp" ? "webp" : targetFormat === "image/jpeg" ? "jpg" : "png"
    const newName = item.file.name.substring(0, item.file.name.lastIndexOf(".")) + `.${extension}`
    
    const link = document.createElement("a")
    link.href = item.resultDataUrl
    link.download = newName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Download all completed converted images
  const handleDownloadAll = () => {
    const completed = files.filter((f) => f.status === "completed")
    completed.forEach((item) => {
      handleDownload(item)
    })
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

          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Smart Image Format Converter
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Convert and resize images between WebP, PNG, and JPEG. Control quality and optimize size completely inside your browser. No files are sent to any server.
            </p>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">{successMsg}</span>
            </div>
          )}

          {/* Converter Workbench Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column - Controls (col-span 5) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Settings Card */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
                <h3 className="font-semibold text-base flex items-center gap-2 pb-3 border-b border-border/60">
                  <Sliders className="w-4 h-4 text-brand" />
                  Conversion Options
                </h3>

                {/* Target Format Options */}
                <div className="space-y-2.5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Output Format</span>
                  <div className="grid grid-cols-3 gap-2 bg-background p-1 rounded-xl border border-border">
                    {(["image/webp", "image/jpeg", "image/png"] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setTargetFormat(fmt)}
                        className={`py-2 text-xs font-semibold rounded-lg transition-all capitalize ${
                          targetFormat === fmt
                            ? "bg-card text-foreground border border-border shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {fmt.split("/")[1]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality Slider (Ignored for PNG) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Quality (Compression)</span>
                    <span className={`text-xs font-bold ${targetFormat === "image/png" ? "text-muted-foreground" : "text-brand"}`}>
                      {targetFormat === "image/png" ? "Lossless (N/A)" : `${quality[0]}%`}
                    </span>
                  </div>
                  
                  {targetFormat === "image/png" ? (
                    <div className="p-3.5 rounded-xl bg-accent/10 border border-border flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        PNG uses lossless compression. The quality slider is only active when exporting to WebP or JPEG.
                      </p>
                    </div>
                  ) : (
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      min={1}
                      max={100}
                      step={1}
                      className="py-2"
                    />
                  )}
                </div>

                <div className="h-px bg-border/60" />

                {/* RESIZE TOGGLE AND INPUT PANEL */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-brand" />
                      Image Resize
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableResize}
                        onChange={(e) => setEnableResize(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-accent peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand" />
                    </label>
                  </div>

                  {enableResize && (
                    <div className="space-y-5 p-4 rounded-xl border border-border/80 bg-accent/5 animate-fade-in">
                      {/* Dimensions Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase">Width (px)</span>
                          <input
                            type="number"
                            value={resizeWidth}
                            onChange={(e) => setResizeWidth(e.target.value)}
                            placeholder="Width"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:outline-none focus:border-brand"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase">Height (px)</span>
                          <input
                            type="number"
                            value={resizeHeight}
                            onChange={(e) => setResizeHeight(e.target.value)}
                            placeholder="Height"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:outline-none focus:border-brand"
                          />
                        </div>
                      </div>

                      {/* Lock Aspect Ratio Toggle */}
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={lockAspectRatio}
                          onChange={(e) => setLockAspectRatio(e.target.checked)}
                          className="w-4 h-4 rounded border-border bg-background text-brand accent-brand focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="text-[11px] font-semibold text-foreground group-hover:text-brand transition-colors">
                          Lock Aspect Ratio (Fit Inside)
                        </span>
                      </label>

                      {lockAspectRatio ? (
                        <div className="p-3 bg-accent/10 rounded-lg flex gap-2">
                          <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                          <p className="text-[10px] text-muted-foreground leading-relaxed">
                            🔒 <strong>Keep proportions:</strong> Resizes your image without squishing, stretching, or cutting it. The image stays perfectly scaled.
                          </p>
                        </div>
                      ) : (
                        /* Unlocked Aspect Ratio Controls */
                        <div className="space-y-4 pt-2 border-t border-border/40 animate-fade-in">
                          {/* Mode Select */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase block">Resize Fill Mode</span>
                            <div className="grid grid-cols-3 gap-1.5 bg-background p-1 rounded-xl border border-border">
                              {(["crop", "fit", "stretch"] as const).map((mode) => (
                                <button
                                  key={mode}
                                  type="button"
                                  onClick={() => setResizeMode(mode)}
                                  className={`py-1.5 text-[10px] font-bold rounded-lg transition-all capitalize ${
                                    resizeMode === mode
                                      ? "bg-card text-foreground border border-border"
                                      : "text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  {mode === "crop" ? "Crop & Cover" : mode === "fit" ? "Fit & Pad" : "Stretch"}
                                </button>
                              ))}
                            </div>
                            
                            {/* Explanations in simple terms */}
                            <p className="text-[10px] text-muted-foreground leading-relaxed pt-1.5 select-none">
                              {resizeMode === "crop" && (
                                <span>✂️ <strong>Crop & Cover:</strong> Fills the whole box. Part of your image might be cut off at the edges so it doesn't look stretched.</span>
                              )}
                              {resizeMode === "fit" && (
                                <span>🖼️ <strong>Fit & Pad:</strong> Keeps the whole image visible. Adds blurred or colored borders around the edges to fill the space.</span>
                              )}
                              {resizeMode === "stretch" && (
                                <span>↔️ <strong>Stretch:</strong> Forces the image to fill the exact size. The image may look squished or stretched out.</span>
                              )}
                            </p>
                          </div>

                          {/* Fit Mode Background Selectors */}
                          {resizeMode === "fit" && (
                            <div className="space-y-3 p-3 rounded-lg bg-background border border-border animate-fade-in">
                              <span className="text-[10px] font-bold text-muted-foreground uppercase block">Padding Background</span>
                              
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-[10px] font-semibold cursor-pointer">
                                  <input
                                    type="radio"
                                    name="fillType"
                                    checked={fitFillType === "blur"}
                                    onChange={() => setFitFillType("blur")}
                                    className="w-3 h-3 text-brand accent-brand"
                                  />
                                  Blur Fill
                                </label>
                                <label className="flex items-center gap-2 text-[10px] font-semibold cursor-pointer">
                                  <input
                                    type="radio"
                                    name="fillType"
                                    checked={fitFillType === "color"}
                                    onChange={() => setFitFillType("color")}
                                    className="w-3 h-3 text-brand accent-brand"
                                  />
                                  Custom Color
                                </label>
                              </div>

                              {fitFillType === "color" && (
                                <div className="flex items-center gap-3 pt-2 animate-fade-in">
                                  <input
                                    type="color"
                                    value={customColor}
                                    onChange={(e) => setCustomColor(e.target.value)}
                                    className="w-7 h-7 rounded border border-border cursor-pointer bg-transparent"
                                  />
                                  <input
                                    type="text"
                                    value={customColor}
                                    onChange={(e) => setCustomColor(e.target.value)}
                                    className="flex-1 px-3 py-1.5 text-[10px] rounded-lg border border-border bg-background focus:outline-none focus:border-brand font-mono"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleConvertAll}
                  disabled={files.length === 0 || globalConverting}
                  className="w-full bg-brand hover:bg-brand-dim text-white border-0 h-12 rounded-xl gap-2 font-medium active:scale-98 transition-all"
                >
                  {globalConverting ? (
                    <Spinner className="w-4 h-4 text-white" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  {globalConverting ? "Converting..." : "Convert All"}
                </Button>

                {files.some((f) => f.status === "completed") && (
                  <Button
                    onClick={handleDownloadAll}
                    variant="outline"
                    className="w-full border-border hover:bg-accent text-foreground h-12 rounded-xl gap-2 font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download Converted
                  </Button>
                )}

                {files.length > 0 && (
                  <Button
                    onClick={clearAllFiles}
                    variant="ghost"
                    className="w-full text-muted-foreground hover:text-foreground h-11 rounded-xl"
                  >
                    Clear Files
                  </Button>
                )}
              </div>
            </div>

            {/* Right Column - Preview & Queue (col-span 7) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Dynamic Live Preview Panel */}
              {previewSrc && (
                <div className="rounded-2xl border border-border bg-card overflow-hidden animate-fade-in shadow-xl">
                  <div className="px-5 py-3.5 border-b border-border/60 bg-accent/15 flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-brand" />
                      Live Resize Output Preview
                    </span>
                    <span className="text-[10px] font-mono bg-brand/10 text-brand px-2 py-0.5 rounded-md font-semibold">
                      {previewWidth} × {previewHeight} px ({targetFormat.split("/")[1].toUpperCase()})
                    </span>
                  </div>
                  
                  {/* Checkerboard Pattern Viewport */}
                  <div 
                    className="relative w-full h-[320px] flex items-center justify-center p-8 bg-zinc-950/80"
                    style={{
                      backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><rect width=\"10\" height=\"10\" fill=\"%23161618\"/><rect x=\"10\" y=\"10\" width=\"10\" height=\"10\" fill=\"%23161618\"/><rect x=\"10\" width=\"10\" height=\"10\" fill=\"%230d0d0f\"/><rect y=\"10\" width=\"10\" height=\"10\" fill=\"%230d0d0f\"/></svg>')",
                      backgroundRepeat: "repeat"
                    }}
                  >
                    <img 
                      src={previewSrc} 
                      alt="Real-time resized image rendering" 
                      className="max-h-full max-w-full object-contain rounded-lg shadow-lg border border-border/20 transition-all duration-150"
                    />
                  </div>
                </div>
              )}

              {/* Dropzone */}
              <div
                ref={dropZoneRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border hover:border-brand/40 bg-card/20 hover:bg-card/40 transition-all rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Upload className="w-5 h-5" />
                </div>
                <h4 className="text-base font-semibold mb-1">Drag & Drop Images Here</h4>
                <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                  Upload multiple PNG, JPEG, WebP, or GIF files. Click to browse.
                </p>
              </div>

              {/* Files Table / Cards List */}
              {files.length > 0 && (
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                  <div className="px-5 py-4 border-b border-border/60 bg-accent/10 flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase">File Queue ({files.length})</span>
                    <button onClick={clearAllFiles} className="text-xs text-destructive hover:underline font-semibold flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear queue
                    </button>
                  </div>

                  <div className="divide-y divide-border/60 max-h-[520px] overflow-y-auto">
                    {files.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => setSelectedFileId(item.id)}
                        className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-accent/5 transition-all ${
                          selectedFileId === item.id ? "bg-brand/5 border-l-2 border-brand" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
                          {/* Image preview thumbnail */}
                          {item.resultDataUrl ? (
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-border bg-accent/20 relative shrink-0">
                              <img src={item.resultDataUrl} alt="Thumbnail preview" className="object-cover w-full h-full" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 text-muted-foreground">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate max-w-[240px] sm:max-w-[150px] md:max-w-[240px]">
                              {item.file.name}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
                              <span>{item.originalSize}</span>
                              {item.convertedSize && (
                                <>
                                  <span>→</span>
                                  <span className="font-semibold text-brand">{item.convertedSize}</span>
                                </>
                              )}
                              {item.width && item.height && (
                                <>
                                  <span className="text-border">|</span>
                                  <span className="text-[10px] font-mono">{item.width}x{item.height}px</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end" onClick={(e) => e.stopPropagation()}>
                          {/* File status / saving percent badge */}
                          {item.status === "completed" && item.savingPercent !== undefined && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              item.savingPercent > 0 
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {item.savingPercent > 0 ? `Saved ${item.savingPercent}%` : `+${Math.abs(item.savingPercent)}%`}
                            </span>
                          )}

                          {/* Action States */}
                          {item.status === "pending" && (
                            <span className="text-xs text-muted-foreground font-semibold px-2 py-1">Pending</span>
                          )}

                          {item.status === "converting" && (
                            <div className="flex items-center gap-1.5 text-xs text-brand font-semibold px-2 py-1">
                              <Spinner className="w-3.5 h-3.5 text-brand" />
                              Working
                            </div>
                          )}

                          {item.status === "error" && (
                            <span className="text-xs text-destructive font-semibold px-2 py-1">Failed</span>
                          )}

                          {item.status === "completed" && (
                            <Button
                              onClick={() => handleDownload(item)}
                              size="sm"
                              className="bg-secondary text-foreground hover:bg-accent border border-border px-3 rounded-lg flex items-center gap-1 text-xs h-8 font-semibold"
                            >
                              <FileDown className="w-3.5 h-3.5" />
                              Save
                            </Button>
                          )}

                          <button
                            onClick={() => removeFile(item.id)}
                            className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors shrink-0"
                            aria-label="Remove file from conversion queue"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default dynamic(() => Promise.resolve(ImageConverter), { ssr: false })
