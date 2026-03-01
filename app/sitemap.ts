import { MetadataRoute } from 'next'
import { comuni } from '@/data/comuni'
import { servizi } from '@/data/servizi'
import { articoli } from '@/data/blog'

export const dynamic = 'force-static'   // ← Questa riga risolve l'errore di export statico

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ristrutturazionepreventivi.it'
  
  // URL statiche principali
  const staticUrls = [
    { route: '', priority: 1.0, changefreq: 'weekly' },
    { route: '/servizi', priority: 0.9, changefreq: 'weekly' },
    { route: '/zone-servite', priority: 0.9, changefreq: 'monthly' },
    { route: '/bonus-ristrutturazione', priority: 0.8, changefreq: 'monthly' },
    { route: '/blog', priority: 0.8, changefreq: 'weekly' },
    { route: '/napoli', priority: 0.8, changefreq: 'monthly' },
    { route: '/caserta', priority: 0.8, changefreq: 'monthly' },
    { route: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
    { route: '/cookie-policy', priority: 0.3, changefreq: 'yearly' },
  ].map(({ route, priority, changefreq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: changefreq as 'weekly' | 'monthly' | 'yearly',
    priority,
  }))
  
  // URL dinamici: 33 comuni
  const comuniUrls = comuni.map(comune => ({
    url: `${baseUrl}/comune/${comune.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  // URL dinamici: 7 servizi
  const serviziUrls = servizi.map(servizio => ({
    url: `${baseUrl}/servizi/${servizio.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  // URL dinamici: 10 articoli blog
  const blogUrls = articoli.map(articolo => ({
    url: `${baseUrl}/blog/${articolo.slug}`,
    lastModified: new Date(articolo.data), // Usa la data dell'articolo!
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  return [...staticUrls, ...comuniUrls, ...serviziUrls, ...blogUrls]
}