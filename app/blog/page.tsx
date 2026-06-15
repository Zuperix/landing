import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getBlogPosts } from "@/lib/blog"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { Calendar, User, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Zuperix Blog – Insights on AI and Digital Asset Management",
  description: "Stay updated with the latest in Digital Asset Management, AI-powered search, and how to scale your creative workflows with Zuperix.",
  openGraph: {
    title: "Zuperix Blog – AI and Digital Asset Management",
    description: "Expert insights on managing digital assets at scale using AI.",
    images: ["/blog-why-dam.png"],
  },
}

interface BlogListingPageProps {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function BlogListingPage({ searchParams }: BlogListingPageProps) {
  const { category } = await searchParams;
  const posts = await getBlogPosts();

  const categories = ["All", "Guides", "Comparisons", "Industry", "Product", "Integrations"];
  const activeCategory = category || "All";

  const filteredPosts = activeCategory.toLowerCase() === "all"
    ? posts
    : posts.filter((post) => post.category.toLowerCase() === activeCategory.toLowerCase());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Zuperix Blog",
    "description": "Stay updated with the latest in Digital Asset Management, AI-powered search, and how to scale your creative workflows with Zuperix.",
    "url": "https://zuperix.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Zuperix",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zuperix.com/logo_transparant.png"
      }
    },
    "blogPost": filteredPosts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "datePublished": new Date(post.date).toISOString(),
      "url": `https://zuperix.com/blog/${post.slug}`,
      "image": `https://zuperix.com${post.image}`
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Insights from the <span className="text-brand">Zuperix Team</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our latest articles on Digital Asset Management, AI-powered discovery, and how to optimize your team's creative production.
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-16 max-w-4xl mx-auto">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <Link
                  key={cat}
                  href={cat === "All" ? "/blog" : `/blog?category=${cat}`}
                  scroll={false}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    isActive
                      ? "bg-brand/10 text-brand border-brand/40 shadow-lg shadow-brand/5"
                      : "bg-white/[0.02] text-muted-foreground border-white/5 hover:border-brand/35 hover:text-white"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {filteredPosts.map((post) => (
              <article 
                key={post.slug}
                className="group flex flex-col bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden hover:border-brand/40 transition-all duration-500 shadow-2xl hover:shadow-brand/5"
              >
                {/* Image Container */}
                <Link href={`/blog/${post.slug}`} className="relative h-64 sm:h-80 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                </Link>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  {/* Category and Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-brand/10 border border-brand/20 text-brand">
                      {post.category}
                    </span>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-[10px] font-medium rounded-md bg-secondary border border-border text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary border border-border">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary border border-border">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-foreground mb-4 group-hover:text-brand transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-muted-foreground leading-relaxed mb-8 flex-1 line-clamp-3">
                    {post.description}
                  </p>

                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-brand font-bold hover:gap-3 transition-all"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
