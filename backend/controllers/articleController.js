const Article = require('../models/Article');

// @desc    Get all articles
// @route   GET /articles
// @access  Public
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ publishedAt: -1 });
    return res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error fetching articles',
      error: error.message
    });
  }
};

// @desc    Get single article by slug or ID
// @route   GET /articles/:slug
// @access  Public
const getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let article = await Article.findOne({ slug });

    // Fallback: search by _id if slug was not matched and slug looks like a valid Mongo ObjectId
    if (!article && slug.match(/^[0-9a-fA-F]{24}$/)) {
      article = await Article.findById(slug);
    }

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error fetching article',
      error: error.message
    });
  }
};

// @desc    Get articles by category
// @route   GET /articles/category/:category
// @access  Public
const getArticlesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const articles = await Article.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') }
    }).sort({ publishedAt: -1 });

    return res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error fetching articles by category',
      error: error.message
    });
  }
};

module.exports = {
  getArticles,
  getArticleBySlug,
  getArticlesByCategory
};
