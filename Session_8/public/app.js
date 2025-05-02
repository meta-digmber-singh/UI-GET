const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
  fs.readFile('index.html', (err, data) => {
    if(err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});