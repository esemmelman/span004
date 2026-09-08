const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const server = http.createServer((request, response) => {
  if (request.url !== '/' && request.url !== '/index.html') {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  fs.readFile(path.join(__dirname, 'index.html'), (error, page) => {
    if (error) {
      response.writeHead(500);
      response.end('Unable to read index.html');
      return;
    }
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(page);
  });
});
server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE'
    ? 'Port 8000 is already in use. If this app is already running, use its existing window.'
    : error.message);
  process.exitCode = 1;
});
server.listen(8000, '127.0.0.1', () => {
  console.log('Spanish practice is running at http://localhost:8000');
  console.log('Keep this window open while practicing. Close it to stop the server.');
  require('node:child_process').spawn('cmd.exe', ['/c', 'start', '', 'http://localhost:8000'], { windowsHide: true });
});
