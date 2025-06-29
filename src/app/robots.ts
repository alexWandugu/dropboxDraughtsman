
import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // You can set this in your environment variables (e.g., .env.local)
  // as NEXT_PUBLIC_SITE_URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dropboxdraughtsman.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
