"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import * as Accordion from "@radix-ui/react-accordion"

interface FaqItemConfig {
  question: string
  answer: string
}

const DEFAULT_FAQS: FaqItemConfig[] = [
  {
    question: "What exactly is a Digital Asset Management (DAM) system?",
    answer: "A DAM is a centralized hub for storing, organizing, finding, and sharing your organization's digital content. Unlike generic cloud storage, Zuperix provides advanced metadata, AI-powered discovery, and professional distribution tools designed specifically for creative and marketing assets.",
  },
  {
    question: "How does the AI search work?",
    answer: "Zuperix uses sophisticated neural engines to understand the visual content and context of your assets. Instead of relying on exact filenames, you can search for concepts like 'sunset over a mountain range' or 'happy team in a meeting,' and Zuperix will find the most relevant matches instantly.",
  },
  {
    question: "How does the Google Drive integration handle my existing library?",
    answer: "Zuperix offers two flexible integration modes. Link Mode (Zero-Copy) allows you to index and manage your Google Drive files within Zuperix without moving or duplicating them. Import Mode allows you to selectively migrate assets into Zuperix storage for full management while maintaining your existing folder structures.",
  },
  {
    question: "Is our data secure in Zuperix?",
    answer: "Absolutely. We implement enterprise-grade security protocols, including AES-256-GCM encryption for sensitive data, secure OAuth authentication, and granular role-based access controls. Your assets are stored in secure, encrypted environments, and we never use your private data to train public AI models.",
  },
  {
    question: "Can Zuperix handle large video files and high-resolution images?",
    answer: "Yes. Zuperix is designed for high-performance creative workflows. We support 4K/8K video previews, high-resolution RAW images, and large 3D assets. Our asynchronous processing engine handles the heavy lifting of generating low-latency previews and extracting AI insights in the background.",
  },
  {
    question: "What happens if I upload an asset that already exists?",
    answer: "Zuperix features a proactive Duplicate Manager that analyzes assets at the bit-level and visual-level during upload. If a duplicate is detected, the system notifies you instantly, preventing library clutter and saving valuable storage space.",
  },
]

function FaqItem({ faq, value }: { faq: FaqItemConfig; value: string }) {
  return (
    <Accordion.Item
      value={value}
      className="group border-b border-border/50 last:border-b-0 overflow-hidden"
    >
      <Accordion.Header className="flex">
        <Accordion.Trigger className="flex flex-1 items-center justify-between py-6 text-left font-medium text-lg transition-all hover:text-brand data-[state=open]:text-brand outline-none">
          <span className="flex-1 pr-4">{faq.question}</span>
          <Plus className="h-5 w-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45 text-muted-foreground group-data-[state=open]:text-brand" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="pb-6 leading-relaxed text-pretty">
          {faq.answer}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  )
}

export function Faq({ items = DEFAULT_FAQS }: { items?: FaqItemConfig[] }) {
  return (
    <section id="faq" className="py-24 sm:py-32 px-6 bg-accent/5 relative overflow-hidden" aria-labelledby="faq-heading">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          className="text-center mb-16"
        >
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">FAQ</p>
          <h2 
            id="faq-heading"
            className="text-balance font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5 tracking-tight"
          >
            Questions? We have answers.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
            Everything you need to know about Zuperix and how it transforms your asset management workflow.
          </p>
        </motion.div>

        {/* Faq list */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] as const }}
        >
          <Accordion.Root type="single" collapsible className="w-full">
            {items.map((faq, index) => (
              <FaqItem key={index} faq={faq} value={`item-${index}`} />
            ))}
          </Accordion.Root>
        </motion.div>

        {/* Support Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground italic">
            Still have questions? <a href="mailto:support@zuperix.com" className="text-brand hover:underline underline-offset-4 decoration-brand/30 transition-all font-medium">Contact our support team</a> and we'll be happy to help.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
