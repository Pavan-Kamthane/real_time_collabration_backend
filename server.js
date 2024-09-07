const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",  // Allow all origins during development
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://pavankamthane:pavan@main.7mnfj.mongodb.net/main?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Socket.io event handlers
io.on('connection', (socket) => {
  console.log('New client connected: ', socket.id);

  socket.on('message', (message) => {
    console.log('Message received: ', message);
    io.emit('message', message);  // Broadcast the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected: ', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
