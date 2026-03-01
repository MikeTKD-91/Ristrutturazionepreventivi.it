import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const baseUrl = 'https://ristrutturazionepreventivi.it'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: ['/api/'] // se vuoi escludere qualcosa
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}