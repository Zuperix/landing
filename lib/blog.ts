import { renderRichText } from "@storyblok/react";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  content: string;
  category: string;
  tags: string[];
  relatedSlugs?: string[];
}

export const BLOG_POSTS: BlogPost[] = [];

const STORYBLOK_TOKEN = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;

function mapStoryToBlogPost(story: any): BlogPost {
  const content = story.content;
  const image = typeof content.image === "object" ? content.image.filename : (content.image || "");
  let tags: string[] = [];
  if (content.tags) {
    tags = content.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
  }
  
  let formattedDate = content.date || "";
  if (formattedDate) {
    try {
      const d = new Date(formattedDate);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });
      }
    } catch (e) {
      // Keep original if parsing fails
    }
  }

  // Render RichText object to HTML, or fallback to plain HTML string if it is already a string
  const htmlContent = content.content && typeof content.content === "object" 
    ? renderRichText(content.content) 
    : (content.content || "");

  return {
    slug: story.slug,
    title: content.title || story.name || "",
    description: content.description || "",
    date: formattedDate,
    author: content.author || "Zuperix Team",
    image: image,
    content: htmlContent,
    category: content.category || "Guides",
    tags: tags
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!STORYBLOK_TOKEN) {
    return BLOG_POSTS;
  }

  try {
    const res = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${STORYBLOK_TOKEN}&starts_with=blog/&cv=${Date.now()}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      throw new Error(`Storyblok API returned status ${res.status}`);
    }
    const data = await res.json();
    if (data.stories && data.stories.length > 0) {
      return data.stories.map(mapStoryToBlogPost);
    }
  } catch (error) {
    console.error("Failed to fetch blog posts from Storyblok, falling back to static posts:", error);
  }

  return BLOG_POSTS;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!STORYBLOK_TOKEN) {
    return BLOG_POSTS.find((p) => p.slug === slug);
  }

  try {
    const res = await fetch(`https://api.storyblok.com/v2/cdn/stories/blog/${slug}?token=${STORYBLOK_TOKEN}&cv=${Date.now()}`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.story) {
        return mapStoryToBlogPost(data.story);
      }
    }
  } catch (error) {
    console.error(`Failed to fetch blog post by slug (${slug}) from Storyblok, falling back to static search:`, error);
  }

  return BLOG_POSTS.find((p) => p.slug === slug);
}
