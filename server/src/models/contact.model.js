const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: String,
    trim: true,
    required:true
  },
  company: {
    type: String,
  },
  tags: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    trim: true
  },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);