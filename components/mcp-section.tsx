"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Bot, Zap, Search, FolderOpen, Tags, Layers, ArrowRight, Sparkles, Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ConversationStep {
  agent: string
  message: string
  tool?: string
  result?: string
}

const CONVERSATION: ConversationStep[] = [
  {
    agent: "Agent",
    message: "Find all sunset photos in my workspace",
    tool: "search_assets",
    result: '→ Found 23 assets matching "sunset"',
  },
  {
    agent: "Agent",
    message: "Tag them all with \"golden-hour\" and \"nature\"",
    tool: "add_tags_to_asset",
    result: "→ Tagged 23 assets successfully",
  },
  {
    agent: "Agent",
    message: "Create a collection called Q2 Campaign",
    tool: "create_collection",
    result: '→ Collection "Q2 Campaign" created',
  },
  {
    agent: "Agent",
    message: "Add the top 10 sunset shots to it",
    tool: "add_assets_to_collection",
    result: "→ 10 assets added to Q2 Campaign",
  },
  {
    agent: "Agent",
    message: "Organize them under the Marketing category",
    tool: "assign_category_to_assets",
    result: "→ 10 assets assigned to Marketing",
  },
]

const TOOLS = [
  { icon: Search, label: "Search", description: "Full-text & semantic search", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { icon: Layers, label: "Assets", description: "List, view & manage", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { icon: FolderOpen, label: "Collections", description: "Create & organize", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  { icon: Tags, label: "Tags", description: "Add & remove tags", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
]

function ToolBadge({ tool, index }: { tool: typeof TOOLS[0]; index: number }) {
  const Icon = tool.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 + index * 0.08 }}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm",
        tool.bg, tool.border
      )}
    >
      <Icon className={cn("w-4 h-4", tool.color)} />
      <div>
        <div className="text-xs font-bold text-foreground">{tool.label}</div>
        <div className="text-[10px] text-muted-foreground">{tool.description}</div>
      </div>
    </motion.div>
  )
}

function AgentTerminal() {
  const [visibleSteps, setVisibleSteps] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSteps(prev => {
        if (prev >= CONVERSATION.length) {
          setTimeout(() => setVisibleSteps(0), 2000)
          return prev
        }
        return prev + 1
      })
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[460px] overflow-hidden rounded-2xl bg-[#0a0a0f] border border-border/40 shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/30 bg-[#0e0e14]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wider">zuperix-mcp-server</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] font-mono text-green-500/70">connected</span>
        </div>
      </div>

      {/* Conversation */}
      <div className="p-5 space-y-4 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {CONVERSATION.slice(0, visibleSteps).map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="space-y-2"
            >
              {/* User prompt */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-brand/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-3 h-3 text-brand" />
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{step.message}</p>
              </div>

              {/* Tool call */}
              {step.tool && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="ml-7 flex items-center gap-2"
                >
                  <Zap className="w-3 h-3 text-amber-500" />
                  <code className="text-[11px] font-mono text-amber-500/80 bg-amber-500/5 border border-amber-500/10 rounded-md px-2 py-0.5">
                    {step.tool}()
                  </code>
                </motion.div>
              )}

              {/* Result */}
              {step.result && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="ml-7"
                >
                  <span className="text-xs font-mono text-green-400/70">{step.result}</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {visibleSteps < CONVERSATION.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 ml-7"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-brand/50"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </div>
  )
}

function McpConfigBlock() {
  const [copied, setCopied] = useState(false)

  const configCode = `{
  "mcpServers": {
    "zuperix": {
      "command": "node",
      "args": ["@zuperix/mcp-server"],
      "env": {
        "ZUPERIX_API_KEY": "dam_pk_..."
      }
    }
  }
}`

  const handleCopy = () => {
    navigator.clipboard.writeText(configCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
      className="relative group"
    >
      <div className="rounded-xl bg-[#0a0a0f] border border-border/40 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/20">
          <span className="text-[10px] font-mono text-muted-foreground/50 tracking-wider">mcp-config.json</span>
          <button
            onClick={handleCopy}
            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/5 text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
        <pre className="px-4 py-3 text-[11px] font-mono leading-relaxed overflow-x-auto">
          <code>
            <span className="text-muted-foreground/40">{"{"}</span>{"\n"}
            <span className="text-muted-foreground/40">  </span><span className="text-brand/80">&quot;mcpServers&quot;</span><span className="text-muted-foreground/40">: {"{"}</span>{"\n"}
            <span className="text-muted-foreground/40">    </span><span className="text-emerald-400/80">&quot;zuperix&quot;</span><span className="text-muted-foreground/40">: {"{"}</span>{"\n"}
            <span className="text-muted-foreground/40">      </span><span className="text-muted-foreground/60">&quot;command&quot;</span><span className="text-muted-foreground/40">: </span><span className="text-amber-400/80">&quot;node&quot;</span>{"\n"}
            <span className="text-muted-foreground/40">      </span><span className="text-muted-foreground/60">&quot;args&quot;</span><span className="text-muted-foreground/40">: [</span><span className="text-amber-400/80">&quot;@zuperix/mcp-server&quot;</span><span className="text-muted-foreground/40">]</span>{"\n"}
            <span className="text-muted-foreground/40">      </span><span className="text-muted-foreground/60">&quot;env&quot;</span><span className="text-muted-foreground/40">: {"{"} </span><span className="text-blue-400/80">&quot;ZUPERIX_API_KEY&quot;</span><span className="text-muted-foreground/40">: </span><span className="text-amber-400/80">&quot;dam_pk_...&quot;</span><span className="text-muted-foreground/40"> {"}"}</span>{"\n"}
            <span className="text-muted-foreground/40">{"    }"}</span>{"\n"}
            <span className="text-muted-foreground/40">{"  }"}</span>{"\n"}
            <span className="text-muted-foreground/40">{"}"}</span>
          </code>
        </pre>
      </div>
    </motion.div>
  )
}

export function McpSection() {
  return (
    <section className="py-16 sm:py-24 px-6 overflow-hidden bg-background relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand/3 blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left: animated terminal + config */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex-1 w-full max-w-2xl"
          >
            <AgentTerminal />

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-3 flex items-center justify-center gap-6 text-muted-foreground/50"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand/50" />
                <span className="text-xs font-medium">15 tools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                <span className="text-xs font-medium">stdio transport</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                <span className="text-xs font-medium">API key auth</span>
              </div>
            </motion.div>

            {/* Config snippet */}
            <div className="mt-4">
              <McpConfigBlock />
            </div>

            {/* Compatible with */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-4 flex items-center justify-center gap-3 flex-wrap"
            >
              <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Works with</span>
              <div className="flex gap-2 flex-wrap justify-center">
                {["Claude", "Cursor", "Windsurf", "Any MCP Client"].map((client) => (
                  <span
                    key={client}
                    className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-secondary text-muted-foreground border border-border"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex-1 max-w-xl text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-5 mx-auto lg:mx-0"
            >
              <Sparkles className="w-6 h-6 text-brand" />
            </motion.div>

            <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-3">Model Context Protocol</p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5 leading-tight">
              Let AI agents
              <br />
              <span className="text-brand">manage your assets.</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed text-pretty mb-6 text-sm sm:text-base">
              Connect Claude, Cursor, or any MCP-compatible agent directly to your Zuperix workspace.
              Search, tag, organize, and manage thousands of assets through natural conversation. No UI needed.
            </p>

            {/* Tool badges */}
            <div className="grid grid-cols-2 gap-2.5">
              {TOOLS.map((tool, i) => (
                <ToolBadge key={tool.label} tool={tool} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
