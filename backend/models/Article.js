const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image URL is required']
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required']
    },
    author: {
      name: { type: String, default: 'Anviksha Singh' },
      role: { type: String, default: 'Founder & Editor, Children of Capital' },
      bio: { type: String, default: '' },
      photo: { type: String, default: '' },
      linkedin: { type: String, default: '' }
    },
    featured: {
      type: Boolean,
      default: false
    },
    editorPick: {
      type: Boolean,
      default: false
    },
    readingTime: {
      type: String,
      default: '5 min read'
    },
    publishedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
