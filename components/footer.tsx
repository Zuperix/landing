"use client"

import Link from "next/link"
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
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Use cases", href: "/#use-cases" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "https://docs.zuperix.com/" },
      { label: "Community", href: "#" },
      { label: "GitHub", href: "https://github.com/zuperix/zuperix" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Status", href: "https://status.zuperix.com/" },
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
            <Link
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
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
              AI-powered digital asset management for creative teams. Organize, discover, and share your media library with ease.
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
                  <li key={link.label} className="flex items-center gap-2">
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:text-brand"
                    >
                      {link.label}
                    </Link>
                    {link.label === "Status" && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* All services are online badge - Image 2 */}
        <div className="flex justify-center mb-12">
          <Link
            href="https://status.zuperix.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-accent/30 hover:bg-accent/50 transition-all group"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3 text-emerald-500"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              All services are online
            </span>
          </Link>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Zuperix. Open source under the GNU AGPL v3.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:text-brand"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:text-brand"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
