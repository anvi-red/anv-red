import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fail = message => { throw new Error(message); };
for (const page of ['index.html', 'communities.html']) {
const html = readFileSync(resolve(root, page), 'utf8');
if (!/<!doctype html>/i.test(html)) fail('HTML doctype missing.');
if ((html.match(/<h1[\s>]/gi) || []).length !== 1) fail('Expected one main heading.');
if (!html.includes('name="viewport"')) fail('Mobile viewport missing.');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
if (new Set(ids).size !== ids.length) fail('Duplicate element IDs.');
for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
  const target = match[1];
  if (/^(https?:|mailto:|data:|blob:|\/\/)/.test(target)) continue;
  if (target.startsWith('#')) {
    if (target.length > 1 && !ids.includes(target.slice(1))) fail(`Missing section: ${target}`);
    continue;
  }
  const file = resolve(root, target.split(/[?#]/)[0].replace(/^\//, ''));
  if (!file.startsWith(root + '/') && !file.startsWith(root + '\\')) fail(`Asset outside site: ${target}`);
  if (!existsSync(file)) fail(`Missing file: ${target}`);
  if (statSync(file).size > 25 * 1024 * 1024) fail(`Cloudflare asset exceeds 25 MiB: ${target}`);
}
for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
  if (!/\bsrc=/.test(match[1])) new Script(match[2]);
}
}
console.log('Portfolio and communities checks passed: page structure, navigation, assets, and JavaScript.');

