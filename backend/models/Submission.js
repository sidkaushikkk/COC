const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required']
    },
    description: {
      type: String,
      default: ''
    },
    readingTime: {
      type: String,
      default: ''
    },
    coverImage: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    bio: {
      type: String,
      default: ''
    },
    linkedin: {
      type: String,
      default: ''
    },
    website: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);
