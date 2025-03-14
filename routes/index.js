const express = require('express');
const userRoutes = require('./userRoutes');
const lessonRoutes = require('./lessonRoutes');

const articlesRoutes = require('./articlesRoutes');

const router = express.Router();

// Use specific routes with their respective paths
router.use('/api', userRoutes);
router.use('/api', lessonRoutes);
router.use('/api', articlesRoutes);


module.exports = router;