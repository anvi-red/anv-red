import './check.mjs';
import { mkdirSync, copyFileSync, cpSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
mkdirSync(dist, { recursive: true });
copyFileSync(resolve(root, 'index.html'), resolve(dist, 'index.html'));
copyFileSync(resolve(root, 'communities.html'), resolve(dist, 'communities.html'));
copyFileSync(resolve(root, 'resume.pdf'), resolve(dist, 'resume.pdf'));
cpSync(resolve(root, 'media'), resolve(dist, 'media'), { recursive: true });
console.log('Packaged portfolio, communities page, media, and résumé for Cloudflare.');

