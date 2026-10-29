import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';

// Browser QA against a running production server (npm run build && npm start).
const base = 'http://localhost:3000';
const outputDir = process.env.PORTFOLIO_QA_OUTPUT || 'test-results';
fs.mkdirSync(outputDir, { recursive: true });
const axe = async page => (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }));
const routes = ['/', '/research', '/projects', '/projects/hope-lounge', '/projects/internship-hub', '/projects/saasforge', '/projects/taskflow', '/privacy'];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const errors = [];
  for (const colorScheme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, route);
      assert.equal(await page.locator('h1').count(), 1, 'one h1 on ' + route);
      assert.deepEqual(await axe(page), [], `axe ${colorScheme} ${route}`);
    }
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${outputDir}/desktop-${colorScheme}.png`, fullPage: true });
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base, { waitUntil: 'networkidle' });

  // Contact and resume: email link present; resume is either a real PDF download or an email request.
  assert.ok(await page.locator('a[href="mailto:gashahundemise21@gmail.com"]').count() >= 1);
  const resume = page.getByRole('link', { name: /Download resume|Request resume/ }).first();
  const href = await resume.getAttribute('href');
  if (href.startsWith('/')) {
    const r = await page.request.get(base + href);
    assert.equal(r.status(), 200);
    assert.match(r.headers()['content-type'], /application\/pdf/);
  } else assert.match(href, /^mailto:gashahundemise21@gmail\.com/);

  // Every in-page anchor and internal link resolves.
  const hrefs = await page.$$eval('a[href^="/"], a[href^="#"]', as => [...new Set(as.map(a => a.getAttribute('href')))]);
  for (const h of hrefs) {
    const [path, hash] = h.split('#');
    if (path) assert.equal((await page.request.get(base + path)).status(), 200, h);
    if (hash) assert.equal(await page.locator('#' + hash).count(), 1, 'anchor ' + h);
  }

  // Old URLs redirect to their new homes.
  for (const [from, to] of [['/skills', '/#skills'], ['/experience', '/#experience'], ['/education', '/#education'], ['/projects/enset', '/research']]) {
    const r = await page.request.get(base + from, { maxRedirects: 0 });
    assert.equal(r.status(), 308, from);
    assert.equal(r.headers().location, to, from);
  }

  // Responsive widths without horizontal overflow, and the mobile menu.
  for (const width of [360, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ['/', '/research', '/projects/hope-lounge']) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `overflow at ${width} on ${route}`);
    }
    if (width === 390) {
      await page.goto(base);
      await page.getByRole('button', { name: 'Open navigation' }).click();
      assert.equal(await page.getByRole('button', { name: 'Close navigation' }).getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(() => document.activeElement.getAttribute('aria-label')), 'Open navigation');
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await page.locator('#main-nav').getByRole('link', { name: 'Experience', exact: true }).click();
      await page.waitForFunction(() => location.hash === '#experience');
      assert.equal(await page.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded'), 'false');
      await page.goto(base, { waitUntil: 'networkidle' });
      await page.screenshot({ path: outputDir + '/mobile.png', fullPage: true });
      assert.deepEqual(await axe(page), [], 'axe mobile');
    }
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  const missing = await page.goto(base + '/missing-page');
  assert.equal(missing.status(), 404);
  await page.getByRole('link', { name: 'Return home' }).click();
  await page.goto(base);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Skip to content');
  const image = await page.request.get(base + '/opengraph-image');
  assert.equal(image.status(), 200);
  assert.match(image.headers()['content-type'], /image\/png/);
  fs.writeFileSync(outputDir + '/opengraph.png', await image.body());
  for (const route of ['/sitemap.xml', '/robots.txt', '/icon.svg']) assert.equal((await page.request.get(base + route)).status(), 200, route);
  assert.deepEqual(errors, []);
  console.log('PASS: 8 routes × light/dark with axe WCAG A/AA; internal links and anchors; legacy redirects; resume/contact; 4 widths × 3 pages without overflow; mobile menu; reduced motion; 404; skip link; OG image; sitemap; robots; no page errors.');
} finally {
  await browser.close();
}
