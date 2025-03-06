const articlesController = require('../controllers/articlesController');
const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeRoles } = require('../middlewares/authourizationMiddleware');

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Create a new article
 *     description: Create a new article in the system.
 *     tags:
 *       - Articles
 *     security:
 *       - BearerAuth: []  # Requires JWT authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Article
 *                 description: The title of the article.
 *               body:
 *                 type: string
 *                 example: This is the content of the article.
 *                 description: The content of the article.
 *     responses:
 *       201:
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Article created successfully
 *                 article:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     body:
 *                       type: string
 *       400:
 *         description: Bad request, validation failed
 *       500:
 *         description: Server error
 */
router.post('/articles', authenticateUser, authorizeRoles('admin', 'staff', 'student'), articlesController.createArticle);


/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Update an existing article
 *     description: Update the details of an existing article.
 *     tags:
 *       - Articles
 *     security:
 *       - BearerAuth: []  # Requires JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Article Title
 *                 description: The new title of the article.
 *               body:
 *                 type: string
 *                 example: This is the updated content of the article.
 *                 description: The new content of the article.
 *     responses:
 *       200:
 *         description: Article updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Article updated successfully
 *                 article:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *       400:
 *         description: Bad request, validation failed
 *       404:
 *         description: Article not found
 *       500:
 *         description: Server error
 */
router.put('/articles/:id', articlesController.updateArticle);
// authenticateUser, authorizeRoles('admin', 'staff'),
/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Delete an article
 *     description: Delete an article by its ID.
 *     tags:
 *       - Articles
 *     security:
 *       - BearerAuth: []  # Requires JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to delete.
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Article deleted successfully
 *       404:
 *         description: Article not found
 *       500:
 *         description: Server error
 */
router.delete('/articles/:id', authenticateUser, authorizeRoles('admin'), articlesController.deleteArticle);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     description: Retrieve a list of all articles.
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/articles', articlesController.getAllArticles);

module.exports = router;