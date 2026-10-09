import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('research direction never claims a measured result',()=>{const content=fs.readFileSync('lib/content.ts','utf8');const enset=content.slice(content.indexOf("slug:'enset'"));assert.match(enset,/Repository scaffold/);assert.match(enset,/does not claim a completed classifier/);assert.doesNotMatch(enset,/\d+\s*%/);});
test('no fabricated CV link or client credentials',()=>{const page=fs.readFileSync('app/page.tsx','utf8');assert.doesNotMatch(page,/href=.*\.pdf/);assert.doesNotMatch(page,/API_KEY|SECRET_KEY|ACCESS_TOKEN/);});
