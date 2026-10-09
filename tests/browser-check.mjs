import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const outputDir=process.env.PORTFOLIO_QA_OUTPUT || 'test-results';fs.mkdirSync(outputDir,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 await page.screenshot({path:outputDir+'/desktop.png',fullPage:true});
 assert.equal(await page.locator('h1').count(),1);
 assert.equal(await page.locator('a[href="mailto:gashahundemise21@gmail.com"]').count(),2);
 const resume=await page.request.get('http://localhost:3000/resume/gashahun-demise-resume.pdf');assert.equal(resume.status(),200);assert.match(resume.headers()['content-type'],/application\/pdf/);assert.match(resume.headers()['content-disposition'],/attachment/);
 const downloadPromise=page.waitForEvent('download');await page.getByRole('link',{name:'Download resume',exact:true}).click();const download=await downloadPromise;assert.equal(download.suggestedFilename(),'Gashahun-Demise-Resume.pdf');assert.deepEqual(fs.readFileSync(await download.path()),fs.readFileSync('public/resume/gashahun-demise-resume.pdf'));

 const desktopAxe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 assert.deepEqual(desktopAxe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
 for(const route of ['/projects/saasforge','/projects/taskflow','/projects/enset','/privacy']){
  const response=await page.goto('http://localhost:3000'+route);assert.equal(response.status(),200);
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(results.violations.map(v=>v.id),[]);
 }
 for(const width of [375,390,768,1024]){
  await page.setViewportSize({width,height:844});await page.goto('http://localhost:3000');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'overflow at '+width);
  if(width===390){
   await page.getByRole('button',{name:'Open navigation'}).click();assert.equal(await page.getByRole('button',{name:'Close navigation'}).getAttribute('aria-expanded'),'true');
   await page.locator('#main-nav').getByRole('link',{name:'Work',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded'),'false');
   await page.screenshot({path:outputDir+'/mobile.png',fullPage:true});
   const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(results.violations.map(v=>v.id),[]);
  }
 }
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
 const response=await page.goto('http://localhost:3000/missing-page');assert.equal(response.status(),404);await page.getByRole('link',{name:'Return home'}).click();
 await page.goto('http://localhost:3000');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Skip to content');
 const image=await page.request.get('http://localhost:3000/opengraph-image');assert.equal(image.status(),200);assert.match(image.headers()['content-type'],/image\/png/);
 for(const route of ['/sitemap.xml','/robots.txt','/icon.svg'])assert.equal((await page.request.get('http://localhost:3000'+route)).status(),200);
 assert.deepEqual(errors,[]);
 console.log('PASS: desktop and mobile layouts; four widths without overflow; navigation; all case studies; privacy; 404; reduced motion; keyboard skip link; Open Graph image; sitemap; robots; no page errors; axe WCAG A/AA checks.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
