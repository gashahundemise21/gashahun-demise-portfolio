"use client";
import { track } from '@vercel/analytics';
import type { ComponentProps } from 'react';
export function TrackedLink({event,children,...props}:ComponentProps<'a'> & {event:string}) {
 return <a {...props} onClick={()=>{if(process.env.NEXT_PUBLIC_ANALYTICS_EVENTS==='true') track(event);}}>{children}</a>;
}
