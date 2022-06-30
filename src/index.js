const express = require('express');
const app = express();

// ATENÇÃO
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});