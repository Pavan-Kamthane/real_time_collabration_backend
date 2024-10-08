const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  content: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);
