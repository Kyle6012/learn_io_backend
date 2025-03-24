const express = require('express');
const articlesController = require('../controllers/articlesController');
const { authenticateUser, authorizeRoles } = require('../middlewares/authourizationMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Article management endpoints
 */

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               conclusion:
 *                 type: string
 *               author:
 *                 type: string
 *               tags:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Article created successfully
 *       400:
 *         description: Bad request
 */
router.post(
    '/articles',
    authenticateUser,
    authorizeRoles('admin', 'staff', 'student'),
    articlesController.createArticle
);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Update an article
 *     tags: [Articles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               conclusion:
 *                 type: string
 *               author:
 *                 type: string
 *               tags:
 *                 type: string
 *     responses:
 *       200:
 *         description: Article updated
 *       400:
 *         description: Bad request
 */
router.put(
    '/articles/:id',
    authenticateUser,
    authorizeRoles('admin', 'staff'),
    articlesController.updateArticle
);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Delete an article
 *     tags: [Articles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       404:
 *         description: Article not found
 */
router.delete(
    '/articles/:id',
    authenticateUser,
    authorizeRoles('admin'),
    articlesController.deleteArticle
);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of all articles
 */
router.get('/articles', articlesController.getAllArticles);

module.exports = router;