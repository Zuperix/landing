"use client"

import { useAnimateInView } from "@/hooks/use-animate-in-view"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
}

export function SectionWrapper({ children, className, id, delay = 0 }: SectionWrapperProps) {
  const { ref, isInView } = useAnimateInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "transition-all duration-700 ease-out",
        isInView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  )
}

interface AnimatedChildProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: keyof JSX.IntrinsicElements
}

export function AnimatedChild({ children, className, delay = 0, as: Component = "div" }: AnimatedChildProps) {
  const { ref, isInView } = useAnimateInView<HTMLDivElement>()

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "transition-all duration-500 ease-out",
        isInView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  )
}
