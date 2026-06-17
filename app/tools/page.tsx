import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Button } from "@/components/ui/button"
import { 
  Camera, 
  RefreshCw, 
  FileCode, 
  ShieldCheck, 
  Zap, 
  Download, 
  ArrowRight,
  Sparkles
} from "lucide-react"

const TOOLS = [
  {
    title: "EXIF Metadata Viewer & Editor",
    description: "Read, modify, or strip EXIF metadata from your JPEGs. Add custom tags and search location variables using an interactive street map picker.",
    href: "/tools/metadata-exif-viewer",
    icon: Camera,
    tags: ["EXIF Viewer", "GPS Mapping", "Metadata Editor", "Privacy"],
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "hover:border-blue-500/30"
  },
  {
    title: "Smart Image Format Converter",
    description: "Convert and compress images client-side between PNG, JPEG, and WebP. Preview resulting file size and adjust quality dynamically.",
    href: "/tools/image-converter",
    icon: RefreshCw,
    tags: ["WebP", "PNG", "JPEG", "Bulk Conversion", "Compression"],
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "hover:border-purple-500/30"
  },
  {
    title: "Vector SVG Optimizer",
    description: "Clean, sanitize, and minify SVG files. Strip editor metadata, remove redundant code, minify paths, and preview results side-by-side.",
    href: "/tools/svg-optimizer",
    icon: FileCode,
    tags: ["SVG Minify", "Figma Cleanup", "Code Editor", "Web Speed"],
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "hover:border-emerald-500/30"
  }
]

const FAQS = [
  {
    q: "Are my files uploaded to your servers?",
    a: "Absolutely not. All processing is executed 100% locally in your web browser. Your images and files never leave your computer, ensuring complete privacy and security."
  },
  {
    q: "Is there a file size limit or daily usage limit?",
    a: "No limits at all. Since the processing runs entirely client-side, we don't have server bandwidth bottlenecks. You can convert, optimize, or inspect as many files of any size as your browser can handle."
  },
  {
    q: "How does this relate to Zuperix DAM?",
    a: "Zuperix is an AI-powered Digital Asset Management platform that automatically extracts metadata, tags images using AI, and optimizes assets for production distribution. These tools are free utilities showcasing how we inspect and manipulate assets under the hood."
  },
  {
    q: "Does EXIF editing work on all image types?",
    a: "EXIF metadata is a standard format primarily embedded in JPEGs (and some TIFF/RAW formats). The editor focuses on JPEG files. The image converter and SVG optimizer work on their respective formats."
  }
]

export default function ToolsHubPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden pt-28 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">
            Free Online <span className="bg-gradient-to-r from-brand to-accent-foreground bg-clip-text text-transparent">Creative Asset</span> Utilities
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Optimize, inspect, and convert your digital media files completely in your browser.
            No signups, no uploads, and no server latency.
          </p>
        </section>

        {/* Benefits Grid */}
        <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div className="flex gap-4 p-5 rounded-2xl border border-border bg-card/50">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base mb-1">Zero Data Leaves Your Device</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Files are read and processed directly in-memory using modern HTML5 Canvas, FileReaders, and local scripts. Your creative work remains entirely yours.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl border border-border bg-card/50">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base mb-1">Instant Local Execution</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Skip waiting for uploads and downloads. Files are converted and optimized instantly with CPU/GPU hardware acceleration right inside your browser.
              </p>
            </div>
          </div>
        </section>

        {/* Tools Cards Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOOLS.map((tool) => {
              const Icon = tool.icon
              return (
                <SpotlightCard 
                  key={tool.title} 
                  className={`flex flex-col h-full bg-card border border-border ${tool.borderColor} transition-all duration-300 p-6 rounded-2xl`}
                >
                  <div className="flex-1">
                    <div className={`w-12 h-12 rounded-xl ${tool.bgColor} ${tool.color} flex items-center justify-center mb-6`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 tracking-tight">{tool.title}</h2>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{tool.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {tool.tags.map(tag => (
                        <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-accent/40 text-muted-foreground font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-secondary hover:bg-accent border border-border text-foreground hover:text-accent-foreground font-medium gap-1.5 transition-all group" asChild>
                    <Link href={tool.href}>
                      Open Tool
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </SpotlightCard>
              )
            })}
          </div>
        </section>

        {/* Call to Action: Zuperix DAM */}
        <section className="max-w-5xl mx-auto px-6 mb-24">
          <div className="relative rounded-3xl border border-brand/20 bg-gradient-to-r from-card to-accent/20 p-8 sm:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="max-w-2xl relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
                Tired of manually organizing files?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                Zuperix auto-indexes metadata, generates descriptive AI tags, extracts text via OCR, and transcodes assets instantly. Let AI manage your digital media library in one secure workspace.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-brand hover:bg-brand-dim text-white border-0 px-6 h-11 rounded-xl" asChild>
                  <Link href="https://dashboard.zuperix.com/">
                    Get Started Free
                  </Link>
                </Button>
                <Button variant="outline" className="border-border hover:bg-accent px-6 h-11 rounded-xl text-foreground" asChild>
                  <Link href="/#features">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FAQS.map((faq, i) => (
              <div key={i} className="space-y-2">
                <h3 className="font-semibold text-foreground text-base">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
