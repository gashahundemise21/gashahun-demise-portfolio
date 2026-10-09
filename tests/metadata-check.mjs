import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage();
await page.addInitScript(()=>{window.qa={cls:0,lcp:0};new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)window.qa.cls+=entry.value;}).observe({type:'layout-shift',buffered:true});new PerformanceObserver(list=>{for(const entry of list.getEntries())window.qa.lcp=entry.startTime;}).observe({type:'largest-contentful-paint',buffered:true});});
const response=await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
const headers=response.headers();assert.equal(headers['x-frame-options'],'DENY');assert.equal(headers['x-content-type-options'],'nosniff');assert.equal(headers['referrer-policy'],'strict-origin-when-cross-origin');assert.equal(headers['x-powered-by'],undefined);
assert.equal(await page.title(),'Gashahun Demise | Computer Vision & Machine Learning');
assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'http://localhost:3000');
assert.equal(await page.locator('meta[property="og:image"]').count(),1);
assert.equal(await page.locator('script[type="application/ld+json"]').count(),1);
assert.equal(await page.locator('script[src*="insights"]').count(),0);
console.log('PASS: security headers, title, canonical, social image metadata, Person schema, local analytics disabled.');
console.log('Local desktop performance observation:',await page.evaluate(()=>({...window.qa,resources:performance.getEntriesByType('resource').length})));
if(process.env.PORTFOLIO_QA_OUTPUT) await page.screenshot({path:process.env.PORTFOLIO_QA_OUTPUT+'/preview.png'});
} finally {await browser.close();}
