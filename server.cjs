/**
 * 英文闪卡园 · 静态站点服务器
 *
 * 站点本身是纯静态的（index.html + assets/），不依赖 Next.js、不需要构建。
 * 这里只做三件事：安全地映射文件路径、给正确的 Content-Type、处理 404。
 *
 * 启动：node server.cjs
 * 端口：PORT / DEPLOY_RUN_PORT，默认 5000
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.DEPLOY_RUN_PORT || process.env.PORT || 5000);
const HOST = process.env.HOSTNAME || '0.0.0.0';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.cjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
};

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(body);
}

function resolveFile(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch (e) {
    return null;
  }
  if (decoded.indexOf('\0') !== -1) return null;

  const relative = decoded.replace(/^\/+/, '');
  const target = path.resolve(ROOT, relative);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) return null;

  let stat;
  try {
    stat = fs.statSync(target);
  } catch (e) {
    return null;
  }
  if (stat.isDirectory()) {
    const indexFile = path.join(target, 'index.html');
    try {
      if (fs.statSync(indexFile).isFile()) return { file: indexFile, stat: fs.statSync(indexFile) };
    } catch (e) {
      return null;
    }
    return null;
  }
  if (!stat.isFile()) return null;
  return { file: target, stat };
}

const server = http.createServer(function (req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    send(res, 405, 'Method Not Allowed');
    return;
  }

  const urlPath = String(req.url || '/').split('?')[0].split('#')[0];
  const found = resolveFile(urlPath === '/' ? '/index.html' : urlPath);
  if (!found) {
    send(res, 404, 'Not Found');
    return;
  }

  const ext = path.extname(found.file).toLowerCase();
  const isHtml = ext === '.html';
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Content-Length': found.stat.size,
    'Cache-Control': isHtml ? 'no-cache' : 'public, max-age=604800',
    'X-Content-Type-Options': 'nosniff',
  });
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  const stream = fs.createReadStream(found.file);
  stream.on('error', function () {
    res.destroy();
  });
  stream.pipe(res);
});

server.on('error', function (err) {
  console.error(err);
  process.exit(1);
});

server.listen(PORT, HOST, function () {
  console.log('> 英文闪卡园 static server: http://' + HOST + ':' + PORT);
});