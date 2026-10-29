import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const content = fs.readFileSync('lib/content.ts', 'utf8');
const source = ['lib/content.ts', 'app/page.tsx', 'app/research/page.tsx', 'app/opengraph-image.tsx', 'app/projects/page.tsx', 'app/projects/[slug]/page.tsx']
  .map(f => fs.readFileSync(f, 'utf8')).join('\n');

test('unpublished research reveals no results or dataset details', () => {
  const enset = content.slice(content.indexOf('export const enset'), content.indexOf('// Software projects'));
  assert.match(enset, /Unpublished/);
  // Manuscript figures must stay out of the public source until the paper is out.
  for (const v of ['95.42', '0.63', '7,545', '7545', '695803', '696k', '97.08', '1.37', '510', 'MobileNetV3', 'Gurage']) assert.ok(!source.includes(v), v);
  assert.doesNotMatch(source, /href="\/research"/);
});

test('no private repositories, offline demos or credentials are linked', () => {
  assert.doesNotMatch(content, /Gosa5497\/qr_menu|hopeloungemenu\.com/);
  assert.doesNotMatch(source, /API_KEY|SECRET_KEY|ACCESS_TOKEN/);
});

test('a configured resume must exist and be a PDF', () => {
  const m = content.match(/resume: (null|'([^']+)')/);
  assert.ok(m, 'profile.resume is declared');
  if (m[1] === 'null') return;
  const pdf = fs.readFileSync('public' + m[2]);
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
});
