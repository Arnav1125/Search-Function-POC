const express = require('express');
const router = express.Router();
const { searchArticles } = require('../controllers/articleController');

router.get('/', searchArticles);

module.exports = router;
