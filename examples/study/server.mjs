import { createServer } from 'node:http';

// Deliberately deterministic: this is a practice API, not an AI model.
export function createStudyServer() {
  return createServer(async (req, res) => {
    const send = (status, body) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)); };
    if (req.method !== 'POST' || req.url !== '/chat') { send(404, { error: 'Use POST /chat' }); return; }
    let body = '';
    try {
      for await (const chunk of req) {
        body += chunk;
        if (Buffer.byteLength(body) > 8192) { send(413, { error: 'Request exceeds 8 KiB' }); return; }
      }
      const { input } = JSON.parse(body);
      if (typeof input !== 'string' || !input.trim()) { send(400, { error: 'input must be a non-empty string' }); return; }
      send(200, { reply: `Practice topic: ${input.trim()}\n1. Define the concept.\n2. Write a small example.\n3. Test an edge case.\nDemo response only; no AI inference was performed.` });
    } catch { send(400, { error: 'Invalid JSON request' }); }
  });
}

if (process.argv[1] && import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1]).href) {
  createStudyServer().listen(8787, '127.0.0.1', () => console.log('Practice API: http://127.0.0.1:8787/chat'));
}
