import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const baseUrl = 'https://diukivskyisad.com';
const locales = ['zh', 'en', 'ru', 'uk'];
const routes = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${baseUrl}/${locale}${route}`;
    }
    // Google uses the default (Russian) page as the x-default variant.
    languages['x-default'] = `${baseUrl}/ru${route}`;

    for (const locale of locales) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.5,
        alternates: { languages },
      });
    }
  }

  return sitemap;
}
