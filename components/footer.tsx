"use client"

import Image from "next/image"
import { Github, Twitter, MessageCircle } from "lucide-react"
import { useAnimateInView } from "@/hooks/use-animate-in-view"
import { cn } from "@/lib/utils"

interface FooterLinkGroup {
  heading: string
  links: { label: string; href: string }[]
}

const footerLinks: FooterLinkGroup[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Use cases", href: "#use-cases" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "GitHub", href: "https://github.com/zuperix/zuperix" },
      { label: "SDK", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/zuperix/zuperix", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: MessageCircle, href: "https://discord.gg", label: "Discord" },
]

export function Footer() {
  const { ref, isInView } = useAnimateInView<HTMLElement>()

  return (
    <footer 
      ref={ref}
      className={cn(
        "border-t border-border bg-card px-6 py-16 sm:py-20 transition-all duration-700",
        isInView ? "opacity-100" : "opacity-0"
      )}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a 
              href="/" 
              className="inline-flex items-center gap-2.5 mb-5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-lg"
              aria-label="Zuperix Home"
            >
              <div className="w-9 h-9 relative transition-transform group-hover:scale-105">
                <Image 
                  src="/logo_transparant.png" 
                  alt="Zuperix Logo" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-semibold text-foreground tracking-tight text-lg">Zuperix</span>
            </a>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
              AI-powered digital asset management. Open source, self-hostable, and built for teams that move fast.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:border-brand/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <nav key={group.heading} aria-label={`${group.heading} links`}>
              <h3 className="text-xs font-semibold text-foreground tracking-widest uppercase mb-4">
                {group.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:text-brand"
                      {...(link.href.startsWith("http") && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Zuperix. Open-source under the MIT License.
          </p>
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:text-brand"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:text-brand"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
