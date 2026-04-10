"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { cn } from "@/lib/utils"

interface Feature {
  image: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    image: "/images/feature-duplicate-manager.jpg",
    title: "Duplicate Manager",
    description:
      "Keep your DAM clean, organized, and duplicate-free by easily finding and managing duplicate assets.",
  },
  {
    image: "/images/feature-natural-search.jpg",
    title: "Natural Language Search",
    description:
      "Find the assets you need with unmatched accuracy by describing what you are looking for in simple, everyday language.",
  },
  {
    image: "/images/feature-face-recognition.jpg",
    title: "Face Recognition",
    description:
      "Quickly tag and find images of specific individuals by typing their name or using smart filters.",
  },
  {
    image: "/images/feature-duplicate-finder.jpg",
    title: "Duplicate Finder at Upload",
    description:
      "A powerful mechanism that prevents accidental asset duplicates that clutter your asset bank.",
  },
  {
    image: "/images/feature-reverse-search.jpg",
    title: "Reverse Image Search",
    description:
      "Upload any image to find visually similar assets in your library. Perfect for finding variants and related content.",
  },
  {
    image: "/images/feature-transcription.png",
    title: "AI Video Transcription",
    description:
      "Automatically convert video and audio into searchable text. Generate captions and export transcripts in multiple formats with AI precision.",
  },
  {
    image: "/images/feature-ocr.jpg",
    title: "OCR & Text Extraction",
    description:
      "Extract and index text from images, PDFs, and screenshots. Make every pixel in your library searchable.",
  },
  {
    image: "/images/comment.png",
    title: "Collaborative Annotations",
    description:
      "Engage with your team through precision annotations and real-time commentary directly on your assets.",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay: (index % 4) * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98] as const
      }}
      className="h-full"
    >
      <SpotlightCard className="h-full flex flex-col p-5 border-border/50 hover:border-brand/40 transition-colors duration-500">
        {/* Image container with gradient background */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-accent to-accent/50 border border-border/50 mb-5">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        {/* Text content */}
        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-brand transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {feature.description}
        </p>
      </SpotlightCard>
    </motion.div>
  )
}

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 px-6" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          className="text-center mb-16"
        >
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">Features</p>
          <h2 
            id="features-heading"
            className="text-balance font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5"
          >
            Everything your assets need
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
            From upload to insight, Zuperix handles the entire lifecycle with AI at every step. Discover features built for modern teams.
          </p>
        </motion.div>

        {/* Features grid - 4 columns on large screens */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          role="list"
          aria-label="Features list"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
