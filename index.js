// server/index.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');



const app = express();
app.use(cors());

const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  const username = socket.handshake.query.username || 'Unknown';
  console.log(`🟢 ${username} connected (ID: ${socket.id})`);

  socket.on('disconnect', () => {
    console.log(`🔴 ${username} disconnected (ID: ${socket.id})`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
