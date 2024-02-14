const express = require('express');
const jsynchronous = require('jsynchronous');
const { Server } = require("socket.io");
const compression = require('compression');

const app = express();
const port = 9000;
app.use(compression());

// Jsynchronous
jsynchronous.send = (websocket, data) => {
  websocket.emit('msg', data);
  console.log(`${(data.length/1000).toFixed(2)} kB`);   
}

$ynchronized = jsynchronous({x: 0});

setInterval(() => {
  $ynchronized.x = $ynchronized.x + 1;
}, 2500);

// Express
const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Socket.io
const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('msg', (data) => jsynchronous.onmessage(socket, data));
  $ynchronized.$ync(socket);
  socket.on('disconnect', () => $ynchronized.$unsync(socket));
});


// Routes
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/dist/index.html');
})

app.get('/bundle.js', (req, res) => {
  res.sendFile(process.cwd() + '/dist/bundle.js');
})


app.get('/jsynchronous-client.js', (req, res) => {
  res.sendFile('/node_modules/jsynchronous/jsynchronous-client.js', {'root': __dirname});
})
