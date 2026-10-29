import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const content = fs.readFileSync('lib/content.ts', 'utf8');
const section = (from, to) => content.slice(content.indexOf(from), to ? content.indexOf(to) : undefined);

test('research is labelled as unpublished and only manuscript numbers are used', () => {
  const enset = section('export const enset', 'export type CaseSection');
  assert.match(enset, /Unpublished manuscript/);
  // Values from the manuscript tables.
  for (const v of ['95.42', '0.63', '7545', '695803', '97.08', '1.37%']) assert.ok(enset.includes(v), v);
  // The resume's "custom model 97.5%" figure is not supported by the manuscript and must not appear.
  assert.doesNotMatch(content, /97\.5\b/);
  assert.doesNotMatch(enset, /\bpublished in\b|\baccepted\b/i);
});

test('confusion matrix is internally consistent with the reported rates', () => {
  const m = section('matrix: [', 'binary:').match(/\[(\d+), (\d+), (\d+)\]/g).map(r => r.match(/\d+/g).map(Number));
  const aged = m[2];
  assert.equal(aged.reduce((a, b) => a + b, 0), 510);
  assert.equal(aged[1], 7);
  assert.equal(((aged[1] / 510) * 100).toFixed(2), '1.37');
});

test('fold means and SDs match the per-fold values', () => {
  const rows = [...content.matchAll(/folds: \[([^\]]+)\], mean: ([\d.]+), sd: ([\d.]+)/g)];
  assert.equal(rows.length, 5);
  for (const [, folds, mean, sd] of rows) {
    const f = folds.split(',').map(Number);
    const mu = f.reduce((a, b) => a + b, 0) / f.length;
    const s = Math.sqrt(f.reduce((a, b) => a + (b - mu) ** 2, 0) / (f.length - 1));
    assert.ok(Math.abs(mu - Number(mean)) < 0.011, `mean ${mean} vs ${mu}`);
    assert.ok(Math.abs(s - Number(sd)) < 0.011, `sd ${sd} vs ${s}`);
  }
});

test('no private repositories, offline demos or credentials are linked', () => {
  assert.doesNotMatch(content, /Gosa5497\/qr_menu|hopeloungemenu\.com/);
  for (const f of ['app/page.tsx', 'lib/content.ts']) assert.doesNotMatch(fs.readFileSync(f, 'utf8'), /API_KEY|SECRET_KEY|ACCESS_TOKEN/);
});

test('a configured resume must exist and be a PDF', () => {
  const m = content.match(/resume: (null|'([^']+)')/);
  assert.ok(m, 'profile.resume is declared');
  if (m[1] === 'null') return;
  const pdf = fs.readFileSync('public' + m[2]);
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
});
