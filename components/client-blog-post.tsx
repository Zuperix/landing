"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { Share2, ArrowLeft, User, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BlogPost } from "@/lib/blog"

interface ClientBlogPostProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export function ClientBlogPost({ post, relatedPosts }: ClientBlogPostProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <main className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24 px-6">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-brand/5 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-brand/3 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
        
        <article className="max-w-3xl mx-auto relative">
          {/* Back Button */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Insights
          </Link>

          {/* Header */}
          <header className="mb-12">
            {/* Category and Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-brand/10 border border-brand/20 text-brand">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-md bg-secondary border border-border text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.15] text-pretty">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-border/50">
              <div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2.5 text-foreground">
                  <div className="w-8 h-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-brand" />
                  </div>
                  <span className="font-semibold">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand/60" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand/60" />
                  <span>5 min read</span>
                </div>
              </div>
              
              <button 
                className="p-2.5 rounded-full bg-secondary border border-border hover:border-brand/40 hover:text-brand transition-all active:scale-90"
                title="Share Article"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Summary / Lead Paragraph */}
          <div className="mb-16 p-8 rounded-3xl bg-brand/5 border border-brand/20 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-3xl rounded-full -mr-16 -mt-16" aria-hidden="true" />
            <p className="text-xl text-white leading-relaxed font-medium italic relative z-10 text-pretty">
              {post.description}
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative w-full aspect-[16/9] rounded-[2.5rem] overflow-hidden mb-20 shadow-2xl border border-white/5 group">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
          </div>

          {/* Post Content with explicitly styled spacing */}
          <div 
            className="blog-content-rendering relative [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-16 [&>h2]:mb-8 [&>p]:text-lg [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-8 [&>ul]:list-disc [&>ul]:pl-8 [&>ul]:mb-8 [&>li]:text-muted-foreground [&>li]:mb-2 [&>div]:my-16"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          {/* Related Articles */}
          {relatedPosts && relatedPosts.length > 0 && (
            <section className="mt-24 pt-16 border-t border-border/50">
              <h3 className="text-2xl font-bold text-white mb-10">Recommended Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {relatedPosts.map((rPost) => (
                  <article 
                    key={rPost.slug}
                    className="group flex flex-col bg-card/30 backdrop-blur-md border border-border/40 rounded-3xl overflow-hidden hover:border-brand/30 transition-all duration-300 shadow-xl"
                  >
                    <Link href={`/blog/${rPost.slug}`} className="relative h-48 overflow-hidden">
                      <Image
                        src={rPost.image}
                        alt={rPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-brand/10 border border-brand/20 text-brand">
                          {rPost.category}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{rPost.date}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-brand transition-colors line-clamp-2">
                        <Link href={`/blog/${rPost.slug}`}>
                          {rPost.title}
                        </Link>
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                        {rPost.description}
                      </p>
                      <Link 
                        href={`/blog/${rPost.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs text-brand font-bold hover:gap-2 transition-all"
                      >
                        Read Article &rarr;
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Article Footer CTA */}
          <footer className="mt-24 pt-16 border-t border-border/50">
            <div className="rounded-[2.5rem] p-10 sm:p-16 bg-brand/5 border border-brand/20 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand/10 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
              <h3 className="text-3xl font-bold text-white mb-6 relative z-10">Stop searching. Start finding.</h3>
              <p className="text-muted-foreground mb-10 max-w-lg mx-auto relative z-10 text-lg">
                Join high-velocity teams using Zuperix to manage their entire digital world with AI.
              </p>
              <Link 
                href="/pricing"
                className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-12 text-sm font-bold text-white hover:bg-brand-dim transition-all active:scale-95 shadow-lg shadow-brand/40 relative z-10"
              >
                Get Started Now
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </>
  )
}
