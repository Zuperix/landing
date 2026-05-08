"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, Link2, ExternalLink, Terminal, Zap } from "lucide-react"

const API_CALLS = [
  {
    method: "POST",
    methodColor: "text-emerald-400",
    methodBg: "bg-emerald-500/10 border-emerald-500/20",
    endpoint: "/v1/assets",
    description: "Upload asset",
    request: [
      { type: "flag", value: "-H", content: '"Authorization: Bearer sk_live_..."' },
      { type: "flag", value: "-F", content: '"file=@hero-banner.jpg"' },
      { type: "flag", value: "-F", content: '"tags=[brand, campaign-q4]"' },
    ],
    response: {
      status: "201 Created",
      statusColor: "text-emerald-400",
      body: `{
  "id": "018f3a2b-7c8d-4e9f-b0a1-c2d3e4f5a6b7",
  "filename": "hero-banner.jpg",
  "status": "processed",
  "tags": ["brand", "campaign-q4"],
  "url": "https://cdn.zuperix.com/..."
}`,
    },
  },
  {
    method: "GET",
    methodColor: "text-sky-400",
    methodBg: "bg-sky-500/10 border-sky-500/20",
    endpoint: "/v1/assets?q=hero+banner",
    description: "Search assets",
    request: [
      { type: "flag", value: "-H", content: '"Authorization: Bearer sk_live_..."' },
      { type: "flag", value: "-H", content: '"Accept: application/json"' },
    ],
    response: {
      status: "200 OK",
      statusColor: "text-sky-400",
      body: `{
  "data": [{
    "id": "018f3a2b-7c8d-4e9f-b0a1-c2d3e4f5a6b7",
    "filename": "hero-banner.jpg",
    "match_score": 0.97
  }],
  "total": 1
}`,
    },
  },
  {
    method: "PUT",
    methodColor: "text-amber-400",
    methodBg: "bg-amber-500/10 border-amber-500/20",
    endpoint: "/v1/assets/018f3a2b-7c8d-4e9f-b0a1-c2d3e4f5a6b7",
    description: "Update metadata",
    request: [
      { type: "flag", value: "-H", content: '"Authorization: Bearer sk_live_..."' },
      { type: "flag", value: "-H", content: '"Content-Type: application/json"' },
      { type: "flag", value: "-d", content: '\'{"rating": 5, "category": "hero"}\'' },
    ],
    response: {
      status: "200 OK",
      statusColor: "text-amber-400",
      body: `{
  "id": "018f3a2b-7c8d-4e9f-b0a1-c2d3e4f5a6b7",
  "rating": 5,
  "category": "hero",
  "updated_at": "2026-05-09T02:24:00Z"
}`,
    },
  },
  {
    method: "DELETE",
    methodColor: "text-rose-400",
    methodBg: "bg-rose-500/10 border-rose-500/20",
    endpoint: "/v1/assets/018f7e2d-a1b2-4c3d-bd4e-5f6a7b8c9d0e",
    description: "Remove asset",
    request: [
      { type: "flag", value: "-H", content: '"Authorization: Bearer sk_live_..."' },
    ],
    response: {
      status: "204 No Content",
      statusColor: "text-rose-400",
      body: `{
  "deleted": true,
  "id": "018f7e2d-a1b2-4c3d-bd4e-5f6a7b8c9d0e",
  "freed_bytes": 4200000,
  "message": "Asset removed"
}`,
    },
  },
]

export function IntegrationsSection() {
  const [activeCall, setActiveCall] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCall((prev) => (prev + 1) % API_CALLS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const current = API_CALLS[activeCall]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Cell: Well-known tools */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col justify-between p-10 rounded-[2.5rem] border border-white/5 bg-neutral-950/50 backdrop-blur-3xl overflow-hidden min-h-[500px]"
          >
            {/* Background Grid for the cell */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none" 
              style={{ 
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '24px 24px' 
              }} 
            />

            {/* Connection Visualization */}
            <div className="relative flex-1 flex items-center justify-center mb-10">
              <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
                 {/* Connection Lines */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                    <motion.path
                      d="M 120,120 L 280,280"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      animate={{ strokeDashoffset: [0, -20] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path
                      d="M 280,120 L 120,280"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      animate={{ strokeDashoffset: [20, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                 </svg>

                 {/* Icons with floating animation */}
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-[10%] left-[10%] w-20 h-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl"
                 >
                    <Image src="/250px-Wordpress-Logo.svg.png" alt="WordPress" width={40} height={40} className="object-contain" />
                 </motion.div>

                 <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-[5%] right-[25%] w-22 h-22 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl"
                 >
                    <Image src="/330px-Google_Drive_icon_(2020).svg.png" alt="Google Drive" width={44} height={44} className="object-contain" />
                 </motion.div>

                 <motion.div 
                   animate={{ y: [0, -8, 0] }}
                   transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute bottom-[10%] left-[10%] w-24 h-24 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl"
                 >
                    <Image src="/Canva_Logo.svg" alt="Canva" width={48} height={48} className="object-contain" />
                 </motion.div>

                 <motion.div 
                   animate={{ x: [0, 8, 0] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-[35%] right-[5%] w-20 h-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl"
                 >
                    <Image src="/250px-Figma-logo.svg.png" alt="Figma" width={40} height={40} className="object-contain" />
                 </motion.div>

                 <motion.div 
                   animate={{ x: [0, -5, 0], y: [0, 5, 0] }}
                   transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute bottom-[10%] right-[15%] w-24 h-24 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl"
                 >
                    <Image src="/250px-Adobe_Creative_Suite_icon.svg.png" alt="Adobe CC" width={48} height={48} className="object-contain" />
                 </motion.div>

                 {/* Center Hub */}
                 <motion.div 
                   whileHover={{ scale: 1.05 }}
                   className="z-10 w-28 h-28 rounded-full bg-brand/10 border border-brand/30 backdrop-blur-3xl flex items-center justify-center shadow-[0_0_50px_rgba(var(--brand-rgb),0.15)] relative"
                 >
                    <div className="absolute inset-0 bg-brand/20 blur-2xl rounded-full animate-pulse" />
                    <Image src="/logo_transparant.png" alt="Zuperix" width={48} height={48} className="relative z-10" />
                    <div className="absolute -right-3 -top-3 w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center">
                       <Link2 className="w-4 h-4 text-white/60" />
                    </div>
                 </motion.div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-white/40">
                <Globe className="w-4 h-4" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Connectivity</span>
              </div>
              <h3 className="text-4xl font-bold mb-4 tracking-tight text-white leading-tight">The heart of your <br/> creative stack</h3>
              <p className="text-white/40 text-lg mb-8 leading-relaxed max-w-sm">
                Zuperix orchestrates your assets across every platform you love, syncing teams and tools effortlessly.
              </p>
              <div className="flex items-center gap-2 text-brand font-bold text-sm group-hover:gap-3 transition-all cursor-pointer">
                <span>See all integrations</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Right Cell: Developer First — Live API Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col justify-between p-10 rounded-[2.5rem] border border-white/5 bg-neutral-950/50 backdrop-blur-3xl overflow-hidden min-h-[500px]"
          >
            {/* Animated API Terminal */}
            <div className="relative flex-1 mb-8">
              <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl relative">
                 {/* Terminal Chrome */}
                 <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                       <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]/70" />
                          <div className="w-3 h-3 rounded-full bg-[#febc2e]/70" />
                          <div className="w-3 h-3 rounded-full bg-[#28c840]/70" />
                       </div>
                       <div className="ml-3 flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/5">
                          <Terminal className="w-3 h-3 text-white/30" />
                          <span className="text-[10px] font-medium text-white/30 font-mono">zuperix-api</span>
                       </div>
                    </div>
                    {/* Live indicator */}
                    <div className="flex items-center gap-2">
                       <div className="relative flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[9px] font-mono text-emerald-400/80 uppercase tracking-wider">Live</span>
                       </div>
                    </div>
                 </div>
                 
                 {/* Endpoint Tabs */}
                 <div className="px-4 pt-3 pb-0 flex gap-1 border-b border-white/5 overflow-x-auto scrollbar-none">
                    {API_CALLS.map((call, i) => (
                       <button
                          key={call.endpoint}
                          onClick={() => setActiveCall(i)}
                          className={`relative px-3 py-2 rounded-t-lg text-[10px] font-mono font-medium transition-all duration-300 whitespace-nowrap ${
                             i === activeCall
                                ? "text-white bg-white/5 border border-white/10 border-b-transparent"
                                : "text-white/25 hover:text-white/50"
                          }`}
                       >
                          <span className={`mr-1.5 font-bold ${call.methodColor}`}>{call.method}</span>
                          {call.description}
                          {i === activeCall && (
                             <motion.div
                                layoutId="api-tab-indicator"
                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                             />
                          )}
                       </button>
                    ))}
                 </div>

                 {/* Request + Response */}
                 <div className="p-5 font-mono text-[11px] leading-relaxed h-[340px] overflow-hidden">
                    <AnimatePresence mode="wait">
                       <motion.div
                          key={activeCall}
                          initial={{ opacity: 0, filter: "blur(4px)" }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, filter: "blur(4px)" }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                       >
                          {/* Request */}
                          <div className="mb-4">
                             <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-3 h-3 text-brand/60" />
                                <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Request</span>
                             </div>
                             <div className="space-y-1 pl-1">
                                <motion.div
                                   initial={{ opacity: 0, x: -8 }}
                                   animate={{ opacity: 1, x: 0 }}
                                   transition={{ delay: 0.1, duration: 0.3 }}
                                   className="flex flex-wrap gap-x-2"
                                >
                                   <span className="text-brand">curl</span>
                                   <span className="text-white/40">-X</span>
                                   <span className={current.methodColor}>{current.method}</span>
                                   <span className="text-white/30 break-all">{`"https://api.zuperix.com${current.endpoint}"`}</span>
                                   <span className="text-white/15">\</span>
                                </motion.div>
                                {current.request.map((line, i) => (
                                   <motion.div
                                      key={i}
                                      initial={{ opacity: 0, x: -8 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                                      className="flex gap-2 pl-4"
                                   >
                                      <span className="text-white/40">{line.value}</span>
                                      <span className="text-white/30">{line.content}</span>
                                      {i < current.request.length - 1 && <span className="text-white/15">\</span>}
                                   </motion.div>
                                ))}
                             </div>
                          </div>

                          {/* Divider with animation */}
                          <div className="relative my-4">
                             <div className="absolute inset-0 flex items-center">
                                <div className="w-full h-px bg-white/5" />
                             </div>
                             <div className="relative flex justify-center">
                                <motion.div
                                   animate={{ x: [-60, 60] }}
                                   transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                   className="w-8 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
                                />
                             </div>
                          </div>

                          {/* Response */}
                          <motion.div
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ delay: 0.5, duration: 0.4 }}
                          >
                             <div className="flex items-center gap-2 mb-3">
                                <motion.div
                                   initial={{ scale: 0 }}
                                   animate={{ scale: 1 }}
                                   transition={{ delay: 0.6, type: "spring", stiffness: 500 }}
                                   className={`w-1.5 h-1.5 rounded-full ${current.response.statusColor.replace("text-", "bg-")}`}
                                />
                                <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Response</span>
                                <span className={`text-[9px] font-bold ${current.response.statusColor}`}>{current.response.status}</span>
                             </div>
                             <pre className="text-white/35 pl-1 overflow-hidden">
                                <code>{current.response.body}</code>
                             </pre>
                          </motion.div>

                          {/* Blinking cursor */}
                          <motion.div
                             animate={{ opacity: [1, 0] }}
                             transition={{ duration: 1, repeat: Infinity }}
                             className="mt-3 w-2 h-4 bg-brand/60"
                          />
                       </motion.div>
                    </AnimatePresence>
                 </div>

                 {/* Status bar */}
                 <div className="px-5 py-2 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <span className="text-[9px] font-mono text-white/15">https://api.zuperix.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-[9px] font-mono text-white/15">TLS 1.3</span>
                       <span className="text-[9px] font-mono text-emerald-500/40">&lt; 50ms</span>
                    </div>
                 </div>
              </div>

              {/* Background Glow */}
              <div className="absolute -inset-4 bg-brand/5 blur-3xl rounded-full -z-10" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-white/40">
                <Terminal className="w-4 h-4" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Developer First</span>
              </div>
              <h3 className="text-4xl font-bold mb-4 tracking-tight text-white leading-tight">Ship in minutes,<br/> not months</h3>
              <p className="text-white/40 text-lg mb-8 leading-relaxed max-w-sm">
                A complete REST API with predictable responses. Upload, search, tag, and manage assets programmatically.
              </p>
              <Link 
                href="https://docs.zuperix.com/docs/api/quickstart"
                target="_blank"
                className="inline-flex items-center gap-2 text-brand font-bold text-sm hover:gap-3 transition-all cursor-pointer hover:text-brand-dim"
              >
                <span>Read the API docs</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
