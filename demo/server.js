const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the CORS package

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Enable CORS for all origins (you can restrict it to specific domains)
app.use(cors({
  origin: '*', // Allow only localhost:4200
  methods: ['GET', 'POST','*'], // Specify allowed methods
  allowedHeaders: ['Content-Type'] // Specify allowed headers
}));

// server.use(cors({
//   origin: '*', // Allow only localhost:4200
//   methods: ['GET', 'POST','*'], // Specify allowed methods
//   allowedHeaders: ['Content-Type'] // Specify allowed headers
// }));
// Serve static files (optional)
app.use(express.static('public'));

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast message
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
