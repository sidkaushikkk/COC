const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticleBySlug,
  getArticlesByCategory
} = require('../controllers/articleController');

router.get('/', getArticles);
router.get('/category/:category', getArticlesByCategory);
router.get('/:slug', getArticleBySlug);

module.exports = router;
