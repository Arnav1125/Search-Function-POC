const express = require('express');
const router = express.Router();
const academicController = require('../controllers/academicController');

// Define your route for academic search
router.get('/', academicController.searchAcademicPapers); // Adjust the path as needed

module.exports = router;
