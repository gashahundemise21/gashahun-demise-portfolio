import type { MetadataRoute } from 'next';
import { projects } from '@/lib/content';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/research', '/projects', ...projects.map(p => '/projects/' + p.slug), '/privacy'];
  return paths.map(path => ({ url: siteUrl + path, changeFrequency: 'monthly', priority: path === '' ? 1 : path === '/research' ? 0.9 : 0.7 }));
}
