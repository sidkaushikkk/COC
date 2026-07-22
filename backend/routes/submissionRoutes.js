const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { submitArticle } = require('../controllers/submissionController');

router.post('/', upload.single('coverImage'), submitArticle);

module.exports = router;
