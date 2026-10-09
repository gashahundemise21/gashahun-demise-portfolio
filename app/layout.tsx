import type { Metadata } from 'next';
import { SiteAnalytics } from '@/components/SiteAnalytics';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteUrl } from '@/lib/site';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'Gashahun Demise | Computer Vision & Machine Learning',template:'%s | Gashahun Demise'},description:'Computer Vision Researcher and Machine Learning Engineer. Explore Gashahun Demise’s research interests and public software projects.',openGraph:{type:'website',siteName:'Gashahun Demise',title:'Gashahun Demise | Practical AI & Computer Vision',description:'Research-minded. Engineering-focused. Building practical AI systems.',images:[{url:'/opengraph-image',width:1200,height:630}]},twitter:{card:'summary_large_image'},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><Header/>{children}<Footer/><SiteAnalytics enabled={process.env.VERCEL==='1'}/></body></html>}
