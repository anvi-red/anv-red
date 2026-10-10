import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const types = {'.html':'text/html; charset=utf-8','.png':'image/png','.gif':'image/gif','.mp4':'video/mp4','.pdf':'application/pdf','.css':'text/css','.js':'text/javascript'};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    const rel = file.slice(root.length).split(/[\\/]/);
    if (!file.startsWith(root + sep) || rel.some(p => p.startsWith('.')) || !['.html','.png','.gif','.mp4','.pdf','.css','.js','.svg','.jpg','.webp'].includes(extname(file))) { res.writeHead(403).end(); return; }
    const info = await stat(file);
    if (!info.isFile()) throw new Error();
    res.writeHead(200, {'Content-Type': types[extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
    res.end(await readFile(file));
  } catch {res.writeHead(404).end('Not found');}
}).listen(8787, '127.0.0.1', () => console.log('Portfolio preview: http://127.0.0.1:8787'));
