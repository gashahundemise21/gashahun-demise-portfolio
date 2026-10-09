"use client";
import { Analytics } from '@vercel/analytics/next';
export function SiteAnalytics({enabled}:{enabled:boolean}){if(!enabled)return null;return <Analytics beforeSend={event=>({...event,url:event.url.split('?')[0].split('#')[0]})}/>;}
