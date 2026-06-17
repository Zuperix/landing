import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://zuperix.com'

  // Static routes
  const routes = [
    '',
    '/pricing',
    '/integrations',
    '/blog',
    '/about',
    '/roadmap',
    '/tools',
    '/tools/metadata-exif-viewer',
    '/tools/image-converter',
    '/tools/svg-optimizer',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic blog routes
  const posts = await getBlogPosts()
  const blogRoutes = posts.map((post) => {
    let lastMod = new Date()
    try {
      const parsed = Date.parse(post.date)
      if (!isNaN(parsed)) {
        lastMod = new Date(parsed)
      }
    } catch (_) {}

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  })

  return [...routes, ...blogRoutes]
}
