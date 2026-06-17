"use client"

import React, { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { 
  Camera, 
  MapPin, 
  Trash2, 
  Download, 
  ArrowLeft, 
  Search, 
  Calendar,
  Layers,
  Upload,
  Globe,
  Sliders,
  Info,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

// Types for local state metadata
interface ImageMetadata {
  fileName: string
  fileSize: string
  fileType: string
  width: number
  height: number
  make: string
  model: string
  dateTime: string
  exposure: string
  fNumber: string
  iso: string
  focalLength: string
  lat: number | null
  lon: number | null
}

const FAMOUS_PLACES = [
  { name: "Paris (Eiffel Tower)", lat: 48.8584, lon: 2.2945 },
  { name: "New York (Times Square)", lat: 40.7580, lon: -73.9855 },
  { name: "Tokyo (Shibuya Crossing)", lat: 35.6595, lon: 139.7005 },
  { name: "London (Big Ben)", lat: 51.5007, lon: -0.1246 },
  { name: "San Francisco (Golden Gate)", lat: 37.8199, lon: -122.4783 },
  { name: "Sydney (Opera House)", lat: -33.8568, lon: 151.2153 }
]

function EXIFViewer() {
  const [file, setFile] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null)
  const [activeTab, setActiveTab] = useState<"view" | "edit" | "location">("view")
  
  // EXIF Editor Form States
  const [makeInput, setMakeInput] = useState("")
  const [modelInput, setModelInput] = useState("")
  const [dateTimeInput, setDateTimeInput] = useState("")
  const [exposureInput, setExposureInput] = useState("")
  const [fNumberInput, setFNumberInput] = useState("")
  const [isoInput, setIsoInput] = useState("")
  const [focalLengthInput, setFocalLengthInput] = useState("")
  const [latInput, setLatInput] = useState<string>("")
  const [lonInput, setLonInput] = useState<string>("")
  
  // Location Search State
  const [searchQuery, setSearchQuery] = useState("")
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const dropZoneRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Clear success messages
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [successMsg])

  // Convert float coordinate to EXIF GPS structure
  const floatToExifGps = (lat: number, lon: number) => {
    const latRef = lat >= 0 ? "N" : "S"
    const absLat = Math.abs(lat)
    const latDegrees = Math.floor(absLat)
    const latMinutes = Math.floor((absLat - latDegrees) * 60)
    const latSeconds = Math.round(((absLat - latDegrees) * 60 - latMinutes) * 60 * 100)

    const lonRef = lon >= 0 ? "E" : "W"
    const absLon = Math.abs(lon)
    const lonDegrees = Math.floor(absLon)
    const lonMinutes = Math.floor((absLon - lonDegrees) * 60)
    const lonSeconds = Math.round(((absLon - lonDegrees) * 60 - lonMinutes) * 60 * 100)

    return {
      GPSLatitudeRef: latRef,
      GPSLatitude: [[latDegrees, 1], [latMinutes, 1], [latSeconds, 100]],
      GPSLongitudeRef: lonRef,
      GPSLongitude: [[lonDegrees, 1], [lonMinutes, 1], [lonSeconds, 100]]
    }
  }

  // Convert EXIF GPS structure to Float coordinate
  const exifGpsToFloat = (
    gpsLatitude: any, 
    gpsLatitudeRef: string, 
    gpsLongitude: any, 
    gpsLongitudeRef: string
  ): { lat: number; lon: number } | null => {
    if (!gpsLatitude || !gpsLatitudeRef || !gpsLongitude || !gpsLongitudeRef) return null

    const parseRational = (val: any) => {
      if (!val || val.length < 2 || val[1] === 0) return 0
      return val[0] / val[1]
    }

    const latDegrees = parseRational(gpsLatitude[0])
    const latMinutes = parseRational(gpsLatitude[1])
    const latSeconds = parseRational(gpsLatitude[2])
    let lat = latDegrees + latMinutes / 60 + latSeconds / 3600
    if (gpsLatitudeRef === "S") lat = -lat

    const lonDegrees = parseRational(gpsLongitude[0])
    const lonMinutes = parseRational(gpsLongitude[1])
    const lonSeconds = parseRational(gpsLongitude[2])
    let lon = lonDegrees + lonMinutes / 60 + lonSeconds / 3600
    if (gpsLongitudeRef === "W") lon = -lon

    return { lat, lon }
  }

  // Parse EXIF from JPEG Data URL
  const processImageFile = async (selectedFile: File) => {
    setLoading(true)
    setError(null)
    setMetadata(null)

    let workingFile = selectedFile
    
    // Auto-transcode PNG to JPEG to support EXIF metadata headers
    if (selectedFile.type === "image/png") {
      try {
        workingFile = await convertPngToJpeg(selectedFile)
        setSuccessMsg("PNG auto-converted to JPEG to support EXIF metadata headers.")
      } catch (err) {
        setError("Failed to convert PNG to JPEG. Please upload a JPEG image.")
        setLoading(false)
        return
      }
    } else if (selectedFile.type !== "image/jpeg" && selectedFile.type !== "image/jpg") {
      setError("Supported formats: JPEG, JPG, PNG.")
      setLoading(false)
      return
    }

    setFile(workingFile)

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setImageSrc(dataUrl)

      // Get dimensions using HTML Image
      const img = new window.Image()
      img.onload = () => {
        try {
          // Dynamic import of piexifjs
          // @ts-ignore
          const piexif = require("piexifjs")
          
          let exifObj = { "0th": {}, "Exif": {}, "GPS": {} }
          try {
            exifObj = piexif.load(dataUrl)
          } catch (e) {
            console.log("No EXIF metadata found, initializing empty.")
          }

          // Read fields
          // @ts-ignore
          const make = exifObj["0th"][piexif.ImageIFD.Make] || ""
          // @ts-ignore
          const model = exifObj["0th"][piexif.ImageIFD.Model] || ""
          // @ts-ignore
          const dateTime = exifObj["0th"][piexif.ImageIFD.DateTime] || ""
          // @ts-ignore
          const exposure = exifObj["Exif"][piexif.ExifIFD.ExposureTime]
          // @ts-ignore
          const fNumber = exifObj["Exif"][piexif.ExifIFD.FNumber]
          // @ts-ignore
          const iso = exifObj["Exif"][piexif.ExifIFD.ISOSpeedRatings] || ""
          // @ts-ignore
          const focalLength = exifObj["Exif"][piexif.ExifIFD.FocalLength]

          // GPS Extraction
          // @ts-ignore
          const gpsLat = exifObj["GPS"][piexif.GPSIFD.GPSLatitude]
          // @ts-ignore
          const gpsLatRef = exifObj["GPS"][piexif.GPSIFD.GPSLatitudeRef]
          // @ts-ignore
          const gpsLon = exifObj["GPS"][piexif.GPSIFD.GPSLongitude]
          // @ts-ignore
          const gpsLonRef = exifObj["GPS"][piexif.GPSIFD.GPSLongitudeRef]

          const coords = exifGpsToFloat(gpsLat, gpsLatRef, gpsLon, gpsLonRef)

          // Format exposure time fraction
          let expStr = ""
          if (exposure) {
            if (exposure[0] && exposure[1]) {
              expStr = exposure[0] === 1 ? `1/${exposure[1]}` : `${exposure[0]/exposure[1]}s`
            }
          }

          // Format fNumber
          let fNumStr = ""
          if (fNumber) {
            if (fNumber[0] && fNumber[1]) {
              fNumStr = `f/${fNumber[0]/fNumber[1]}`
            }
          }

          // Format focal length
          let focalStr = ""
          if (focalLength) {
            if (focalLength[0] && focalLength[1]) {
              focalStr = `${focalLength[0]/focalLength[1]} mm`
            }
          }

          const parsedMetadata: ImageMetadata = {
            fileName: workingFile.name,
            fileSize: (workingFile.size / (1024 * 1024)).toFixed(2) + " MB",
            fileType: workingFile.type,
            width: img.width,
            height: img.height,
            make: String(make),
            model: String(model),
            dateTime: String(dateTime),
            exposure: expStr,
            fNumber: fNumStr,
            iso: String(iso),
            focalLength: focalStr,
            lat: coords ? coords.lat : null,
            lon: coords ? coords.lon : null
          }

          setMetadata(parsedMetadata)

          // Initialize form fields
          setMakeInput(String(make))
          setModelInput(String(model))
          setDateTimeInput(String(dateTime).replace(/:/g, "-").replace(" ", "T").substring(0, 16) || "")
          setExposureInput(expStr)
          setFNumberInput(fNumber ? String(fNumber[0]/fNumber[1]) : "")
          setIsoInput(String(iso))
          setFocalLengthInput(focalLength ? String(focalLength[0]/focalLength[1]) : "")
          setLatInput(coords ? coords.lat.toFixed(6) : "")
          setLonInput(coords ? coords.lon.toFixed(6) : "")

        } catch (exifErr) {
          console.error("Error reading exif: ", exifErr)
          setError("Failed to parse image EXIF metadata structure.")
        } finally {
          setLoading(false)
        }
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(workingFile)
  }

  // Convert PNG to JPEG using Canvas API
  const convertPngToJpeg = (pngFile: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new window.Image()
        img.onload = () => {
          const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext("2d")
          if (!ctx) {
            reject(new Error("Canvas context failed"))
            return
          }
          ctx.fillStyle = "#FFFFFF"
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0)
          
          canvas.toBlob((blob) => {
            if (blob) {
              const jpegFile = new File([blob], pngFile.name.replace(/\.png$/i, ".jpg"), {
                type: "image/jpeg"
              })
              resolve(jpegFile)
            } else {
              reject(new Error("Blob conversion failed"))
            }
          }, "image/jpeg", 0.95)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(pngFile)
    })
  }

  // Save/Update EXIF data to JPEG and download
  const handleSaveAndDownload = () => {
    if (!imageSrc || !file) return

    try {
      // @ts-ignore
      const piexif = require("piexifjs")
      let exifObj = { "0th": {}, "Exif": {}, "GPS": {} }

      try {
        exifObj = piexif.load(imageSrc)
      } catch (e) {}

      // Write standard tags
      // @ts-ignore
      exifObj["0th"][piexif.ImageIFD.Make] = makeInput
      // @ts-ignore
      exifObj["0th"][piexif.ImageIFD.Model] = modelInput

      // DateTime conversion back to EXIF format YYYY:MM:DD HH:MM:SS
      if (dateTimeInput) {
        const formattedDate = dateTimeInput.replace(/-/g, ":").replace("T", " ") + ":00"
        // @ts-ignore
        exifObj["0th"][piexif.ImageIFD.DateTime] = formattedDate
      }

      // ISO
      if (isoInput) {
        // @ts-ignore
        exifObj["Exif"][piexif.ExifIFD.ISOSpeedRatings] = Number(isoInput)
      }

      // Exposure time rational conversion
      if (exposureInput) {
        if (exposureInput.includes("/")) {
          const parts = exposureInput.split("/")
          // @ts-ignore
          exifObj["Exif"][piexif.ExifIFD.ExposureTime] = [Number(parts[0]), Number(parts[1])]
        } else {
          const val = Number(exposureInput)
          if (!isNaN(val)) {
            // @ts-ignore
            exifObj["Exif"][piexif.ExifIFD.ExposureTime] = [val * 1000, 1000]
          }
        }
      }

      // FNumber rational conversion
      if (fNumberInput) {
        const val = Number(fNumberInput)
        if (!isNaN(val)) {
          // @ts-ignore
          exifObj["Exif"][piexif.ExifIFD.FNumber] = [val * 10, 10]
        }
      }

      // Focal Length rational conversion
      if (focalLengthInput) {
        const val = Number(focalLengthInput)
        if (!isNaN(val)) {
          // @ts-ignore
          exifObj["Exif"][piexif.ExifIFD.FocalLength] = [val * 10, 10]
        }
      }

      // GPS Coordinates
      const lat = parseFloat(latInput)
      const lon = parseFloat(lonInput)
      if (!isNaN(lat) && !isNaN(lon)) {
        const gps = floatToExifGps(lat, lon)
        // @ts-ignore
        exifObj["GPS"][piexif.GPSIFD.GPSLatitudeRef] = gps.GPSLatitudeRef
        // @ts-ignore
        exifObj["GPS"][piexif.GPSIFD.GPSLatitude] = gps.GPSLatitude
        // @ts-ignore
        exifObj["GPS"][piexif.GPSIFD.GPSLongitudeRef] = gps.GPSLongitudeRef
        // @ts-ignore
        exifObj["GPS"][piexif.GPSIFD.GPSLongitude] = gps.GPSLongitude
      }

      // Dump and insert new metadata
      const exifBytes = piexif.dump(exifObj)
      const newImageSrc = piexif.insert(exifBytes, imageSrc)

      // Download trigger
      const link = document.createElement("a")
      link.href = newImageSrc
      link.download = `zuperix-meta-${file.name}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setSuccessMsg("Metadata successfully updated! Downloading file...")
    } catch (err) {
      console.error("Save error: ", err)
      setError("Failed to construct image with modified EXIF details.")
    }
  }

  // Strip all EXIF metadata (100% clean image)
  const handleStripMetadata = () => {
    if (!imageSrc || !file) return

    try {
      // @ts-ignore
      const piexif = require("piexifjs")
      // Simply strip EXIF bytes using piexif.remove
      const cleanImageSrc = piexif.remove(imageSrc)

      const link = document.createElement("a")
      link.href = cleanImageSrc
      link.download = `stripped-${file.name}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setSuccessMsg("Privacy metadata successfully stripped! Downloading file...")
      
      // Update state showing wiped details
      if (metadata) {
        setMetadata({
          ...metadata,
          make: "",
          model: "",
          dateTime: "",
          exposure: "",
          fNumber: "",
          iso: "",
          focalLength: "",
          lat: null,
          lon: null
        })
      }
      setMakeInput("")
      setModelInput("")
      setDateTimeInput("")
      setExposureInput("")
      setFNumberInput("")
      setIsoInput("")
      setFocalLengthInput("")
      setLatInput("")
      setLonInput("")
    } catch (err) {
      console.error("Strip error: ", err)
      setError("Failed to strip metadata header from the image.")
    }
  }

  // Search Address Coordinates using Free OpenStreetMap Nominatim API
  const handleSearchLocation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setSearchLoading(true)
    setSearchError(null)

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
          searchQuery
        )}`
      )
      const data = await res.json()

      if (data && data.length > 0) {
        const place = data[0]
        const lat = parseFloat(place.lat)
        const lon = parseFloat(place.lon)
        
        setLatInput(lat.toFixed(6))
        setLonInput(lon.toFixed(6))
        
        setSuccessMsg(`Location resolved: ${place.display_name}`)
      } else {
        setSearchError("No location found matching that address.")
      }
    } catch (err) {
      setSearchError("Location look-up service failed. Please specify coordinates manually.")
    } finally {
      setSearchLoading(false)
    }
  }

  // Quick Select Coordinates
  const handleQuickSelect = (lat: number, lon: number, name: string) => {
    setLatInput(lat.toFixed(6))
    setLonInput(lon.toFixed(6))
    setSuccessMsg(`Pinned to ${name}`)
  }

  // Handle drag event handlers
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
      processImageFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0])
    }
  }

  // Reset tools state
  const handleReset = () => {
    setFile(null)
    setImageSrc(null)
    setMetadata(null)
    setError(null)
    setSearchQuery("")
    setSuccessMsg(null)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb / Back button */}
          <div className="mb-8">
            <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Tools
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              EXIF Metadata Viewer & Editor
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Read camera details, modify time, camera configurations, and locations, or wipe data completely to protect your privacy. Operates 100% in your browser.
            </p>
          </div>

          {/* Notifications */}
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

          {/* Core App Body */}
          {!imageSrc ? (
            /* Upload Dropzone */
            <div
              ref={dropZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border hover:border-brand/40 bg-card/30 hover:bg-card/50 transition-all rounded-3xl p-16 flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Drag & Drop Image Here</h3>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
                Supports JPEG, JPG, and PNG. PNG files are auto-converted to JPEG to support EXIF metadata header attachments.
              </p>
              <Button className="bg-brand hover:bg-brand-dim text-white border-0 px-6 rounded-xl">
                Browse Files
              </Button>
            </div>
          ) : (
            /* Split Work Bench */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Preview Column */}
              <div className="lg:col-span-4 space-y-6">
                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-accent/20 flex items-center justify-center mb-4">
                    <img
                      src={imageSrc}
                      alt="Uploaded visual asset preview"
                      className="object-contain max-h-full max-w-full"
                    />
                  </div>
                  
                  {metadata && (
                    <div className="space-y-1 text-xs text-muted-foreground p-1 border-t border-border/50 pt-3">
                      <div className="flex justify-between">
                        <span>Filename:</span>
                        <span className="font-medium text-foreground truncate max-w-[180px]">{metadata.fileName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span className="font-medium text-foreground">{metadata.fileSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimensions:</span>
                        <span className="font-medium text-foreground">{metadata.width} × {metadata.height} px</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleSaveAndDownload}
                    className="w-full bg-brand hover:bg-brand-dim text-white border-0 h-12 rounded-xl gap-2 font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Save & Download Image
                  </Button>
                  
                  <Button
                    onClick={handleStripMetadata}
                    variant="outline"
                    className="w-full border-destructive/20 hover:border-destructive/40 hover:bg-destructive/10 text-destructive h-12 rounded-xl gap-2 font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Strip EXIF (Wipe Privacy Data)
                  </Button>

                  <Button
                    onClick={handleReset}
                    variant="ghost"
                    className="w-full border-border hover:bg-accent text-muted-foreground hover:text-foreground h-11 rounded-xl"
                  >
                    Clear Image
                  </Button>
                </div>
              </div>

              {/* Editing Dashboard Column */}
              <div className="lg:col-span-8 space-y-6">
                {/* Tabs */}
                <div className="flex border-b border-border bg-card/30 p-1.5 rounded-xl gap-2">
                  <button
                    onClick={() => setActiveTab("view")}
                    className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${
                      activeTab === "view"
                        ? "bg-card text-foreground border border-border shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/40"
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    View EXIF Tags
                  </button>
                  <button
                    onClick={() => setActiveTab("edit")}
                    className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${
                      activeTab === "edit"
                        ? "bg-card text-foreground border border-border shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/40"
                    }`}
                  >
                    <Sliders className="w-4 h-4" />
                    Edit Camera Details
                  </button>
                  <button
                    onClick={() => setActiveTab("location")}
                    className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${
                      activeTab === "location"
                        ? "bg-card text-foreground border border-border shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/40"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    GPS Location Mapping
                  </button>
                </div>

                {/* Tab Content Box */}
                <div className="rounded-2xl border border-border bg-card p-6 min-h-[400px]">
                  {loading ? (
                    <div className="h-64 flex flex-col items-center justify-center gap-3">
                      <Spinner className="w-8 h-8 text-brand" />
                      <p className="text-sm text-muted-foreground">Parsing image payload...</p>
                    </div>
                  ) : activeTab === "view" ? (
                    /* VIEW METADATA */
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Info className="w-5 h-5 text-brand" />
                        Extracted EXIF Details
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-border bg-accent/10 space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Camera Manufacturer</span>
                          <p className="font-medium text-sm">{metadata?.make || "Not set"}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-accent/10 space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Camera Model</span>
                          <p className="font-medium text-sm">{metadata?.model || "Not set"}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-accent/10 space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Exposure Time</span>
                          <p className="font-medium text-sm">{metadata?.exposure || "Not set"}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-accent/10 space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Aperture Size</span>
                          <p className="font-medium text-sm">{metadata?.fNumber || "Not set"}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-accent/10 space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">ISO Value</span>
                          <p className="font-medium text-sm">{metadata?.iso || "Not set"}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-accent/10 space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Focal Length</span>
                          <p className="font-medium text-sm">{metadata?.focalLength || "Not set"}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-accent/10 space-y-1 col-span-1 md:col-span-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Timestamp</span>
                          <p className="font-medium text-sm">{metadata?.dateTime ? metadata.dateTime.replace(/T/, " ") : "Not set"}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-border bg-accent/10 space-y-1 col-span-1 md:col-span-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">GPS Location</span>
                          <p className="font-medium text-sm flex items-center gap-1.5">
                            {metadata?.lat !== null && metadata?.lon !== null ? (
                              <>
                                <MapPin className="w-3.5 h-3.5 text-brand" />
                                {metadata?.lat?.toFixed(6)}, {metadata?.lon?.toFixed(6)}
                              </>
                            ) : (
                              "No geographic data attached"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : activeTab === "edit" ? (
                    /* EDIT CAMERA DETAILS */
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-brand" />
                        Edit Camera Configuration
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Camera Make</label>
                          <input
                            type="text"
                            value={makeInput}
                            onChange={(e) => setMakeInput(e.target.value)}
                            placeholder="e.g. Sony, Canon"
                            className="w-full px-4.5 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-brand text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Camera Model</label>
                          <input
                            type="text"
                            value={modelInput}
                            onChange={(e) => setModelInput(e.target.value)}
                            placeholder="e.g. ILCE-7RM4"
                            className="w-full px-4.5 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-brand text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Exposure Time</label>
                          <input
                            type="text"
                            value={exposureInput}
                            onChange={(e) => setExposureInput(e.target.value)}
                            placeholder="e.g. 1/250 or 0.004"
                            className="w-full px-4.5 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-brand text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Aperture (F-Stop)</label>
                          <input
                            type="text"
                            value={fNumberInput}
                            onChange={(e) => setFNumberInput(e.target.value)}
                            placeholder="e.g. 2.8, 5.6"
                            className="w-full px-4.5 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-brand text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase">ISO Rating</label>
                          <input
                            type="number"
                            value={isoInput}
                            onChange={(e) => setIsoInput(e.target.value)}
                            placeholder="e.g. 100, 800"
                            className="w-full px-4.5 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-brand text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Focal Length (mm)</label>
                          <input
                            type="number"
                            value={focalLengthInput}
                            onChange={(e) => setFocalLengthInput(e.target.value)}
                            placeholder="e.g. 50, 85"
                            className="w-full px-4.5 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-brand text-sm"
                          />
                        </div>

                        <div className="space-y-2 col-span-1 md:col-span-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Date & Time Taken</label>
                          <div className="relative">
                            <input
                              type="datetime-local"
                              value={dateTimeInput}
                              onChange={(e) => setDateTimeInput(e.target.value)}
                              className="w-full px-4.5 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-brand text-sm block"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* GPS LOCATION MAPPING */
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Globe className="w-5 h-5 text-brand" />
                          GPS Coordinates
                        </h3>
                        
                        {/* Address Lookup Search Form */}
                        <form onSubmit={handleSearchLocation} className="flex gap-2 w-full md:w-auto">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search street, landmark, city..."
                            className="flex-1 md:w-64 px-4 py-2 text-xs rounded-xl border border-border bg-background focus:outline-none focus:border-brand"
                          />
                          <Button
                            type="submit"
                            size="sm"
                            disabled={searchLoading}
                            className="bg-secondary text-foreground hover:bg-accent border border-border px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs h-9 shrink-0 font-medium"
                          >
                            {searchLoading ? <Spinner className="w-3.5 h-3.5 text-muted-foreground" /> : <Search className="w-3.5 h-3.5" />}
                            Resolve
                          </Button>
                        </form>
                      </div>

                      {searchError && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {searchError}
                        </p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Latitude</label>
                          <input
                            type="number"
                            step="any"
                            value={latInput}
                            onChange={(e) => setLatInput(e.target.value)}
                            placeholder="e.g. 37.8199"
                            className="w-full px-4.5 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-brand text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Longitude</label>
                          <input
                            type="number"
                            step="any"
                            value={lonInput}
                            onChange={(e) => setLonInput(e.target.value)}
                            placeholder="e.g. -122.4783"
                            className="w-full px-4.5 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-brand text-sm"
                          />
                        </div>

                        {/* Quick selector spots */}
                        <div className="col-span-1 md:col-span-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase block mb-2">Pin Famous Places</label>
                          <div className="flex flex-wrap gap-2">
                            {FAMOUS_PLACES.map((place) => (
                              <button
                                key={place.name}
                                onClick={() => handleQuickSelect(place.lat, place.lon, place.name)}
                                className="text-xs px-3 py-1.5 rounded-xl border border-border hover:border-brand/30 bg-background hover:bg-accent/40 text-muted-foreground hover:text-foreground transition-all font-medium"
                              >
                                {place.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Street Map Viewer */}
                        <div className="col-span-1 md:col-span-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase block mb-2">Map View</label>
                          {latInput && lonInput ? (
                            <div className="relative w-full h-[220px] rounded-xl overflow-hidden border border-border bg-accent/10">
                              <iframe
                                title="Geographic coordinates marker on OpenStreetMap"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                marginHeight={0}
                                marginWidth={0}
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(lonInput) - 0.01}%2C${parseFloat(latInput) - 0.01}%2C${parseFloat(lonInput) + 0.01}%2C${parseFloat(latInput) + 0.01}&layer=mapnik&marker=${parseFloat(latInput)}%2C${parseFloat(lonInput)}`}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-[220px] rounded-xl border border-border border-dashed bg-accent/5 flex flex-col items-center justify-center text-center p-4">
                              <Globe className="w-8 h-8 text-muted-foreground/60 mb-2" />
                              <p className="text-sm font-semibold text-muted-foreground">No Coordinates Specified</p>
                              <p className="text-xs text-muted-foreground/60 max-w-xs mt-1">Specify latitude and longitude values or resolve an address to map the asset location.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
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

// Disable Server-Side Rendering (SSR) for client-side JPEG metadata extraction APIs
export default dynamic(() => Promise.resolve(EXIFViewer), { ssr: false })
