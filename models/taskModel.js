const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: '',
    trim: true
  },
  description: {
    type: String,
    required: true,
    default: '',
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming your user model is named 'User'
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// model name changed from 'Node' to 'Note'
const Node = mongoose.model('Note', noteSchema);

module.exports = Node;
