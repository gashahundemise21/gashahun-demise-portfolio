import type { MetadataRoute } from 'next';
import { projects } from '@/lib/content';
import { siteUrl } from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{return ['','/privacy',...projects.map(p=>'/projects/'+p.slug)].map(path=>({url:siteUrl+path,changeFrequency:'monthly',priority:path===''?1:0.7}));}