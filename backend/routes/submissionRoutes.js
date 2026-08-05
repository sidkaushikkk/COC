const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { submitArticle } = require('../controllers/submissionController');

router.post(
  '/',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'attachment', maxCount: 1 }
  ]),
  submitArticle
);

module.exports = router;
