"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { SpotlightCard } from "@/components/ui/spotlight-card"

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    quote: "Zuperix cut our asset search time from minutes to milliseconds. The natural language search is a game-changer for our creative team.",
    author: "Sarah Chen",
    role: "Head of Creative",
    company: "Acme Inc",
    avatar: "SC",
  },
  {
    quote: "Finally, a DAM that speaks our language. We self-host it on our infrastructure and the API-first approach integrates perfectly with our CI/CD.",
    author: "Marcus Johnson",
    role: "Staff Engineer",
    company: "TechFlow",
    avatar: "MJ",
  },
  {
    quote: "The face recognition feature alone saved us hundreds of hours organizing our photo library. It's like having an AI assistant that never sleeps.",
    author: "Elena Rodriguez",
    role: "Content Director",
    company: "MediaPro",
    avatar: "ER",
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98] as const 
      }}
      className="h-full"
    >
      <SpotlightCard className="h-full flex flex-col p-6 sm:p-8 hover:border-brand/30 transition-all duration-300">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-brand text-brand" aria-hidden="true" />
          ))}
        </div>
        
        {/* Quote */}
        <blockquote className="flex-1 mb-6">
          <p className="text-foreground leading-relaxed text-pretty italic">
            "{testimonial.quote}"
          </p>
        </blockquote>
        
        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
          <div 
            className="w-11 h-11 rounded-full bg-gradient-to-br from-brand to-[oklch(0.65_0.25_280)] flex items-center justify-center text-sm font-bold text-white shrink-0"
            aria-hidden="true"
          >
            {testimonial.avatar}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-foreground truncate">{testimonial.author}</p>
            <p className="text-xs text-muted-foreground truncate">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20 px-6" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          className="text-center mb-16"
        >
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-4">Testimonials</p>
          <h2 
            id="testimonials-heading"
            className="text-balance font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5"
          >
            Loved by teams worldwide
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty leading-relaxed">
            See what developers and teams are saying about Zuperix.
          </p>
        </motion.div>

        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
          aria-label="Customer testimonials"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
