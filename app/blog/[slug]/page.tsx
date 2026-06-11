import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { ClientBlogPost } from "@/components/client-blog-post"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post || !post.title || !post.description) return { title: "Post Not Found" }

  return {
    title: `${post.title} | Zuperix Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const allPosts = await getBlogPosts()
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": [`https://zuperix.com${post.image}`],
    "datePublished": new Date(post.date).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Zuperix Team",
      "url": "https://zuperix.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zuperix",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zuperix.com/logo_transparant.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://zuperix.com/blog/${post.slug}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <ClientBlogPost post={post} relatedPosts={relatedPosts} />
      <Footer />
    </>
  )
}
