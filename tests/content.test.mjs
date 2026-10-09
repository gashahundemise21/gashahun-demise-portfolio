import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('research direction never claims a measured result',()=>{const content=fs.readFileSync('lib/content.ts','utf8');const enset=content.slice(content.indexOf("slug:'enset'"));assert.match(enset,/Repository scaffold/);assert.match(enset,/does not claim a completed classifier/);assert.doesNotMatch(enset,/\d+\s*%/);});
test('published resume is a PDF and frontend has no credentials',()=>{const page=fs.readFileSync('app/page.tsx','utf8');const pdf=fs.readFileSync('public/resume/gashahun-demise-resume.pdf');assert.equal(pdf.subarray(0,5).toString(),'%PDF-');assert.match(pdf.subarray(-100).toString(),/%%EOF/);assert.doesNotMatch(page,/API_KEY|SECRET_KEY|ACCESS_TOKEN/);});
