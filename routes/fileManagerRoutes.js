const express = require('express');
const fileController = require('../controllers/fileManagerController');


const router = express.Router();

/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: Upload a file
 *     description: Uploads a file to the server and returns the file information if successful.
 *     tags:
 *       - File Management
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to be uploaded.
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *                 file:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *                       example: example.jpg
 *                       description: The name of the uploaded file.
 *                     path:
 *                       type: string
 *                       example: /uploads/example.jpg
 *                       description: The path where the file is stored.
 *       400:
 *         description: Bad request, file upload failed
 *       500:
 *         description: Server error
 * 
 * /file/uploaded/{filename}:
 *   get:
 *     summary: Retrieve a file
 *     description: Retrieves a file from the server by its filename.
 *     tags:
 *       - File Management
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the file to retrieve.
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 file:
 *                   type: string
 *                   example: /uploads/example.jpg
 *                   description: The file's path.
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 * 
 * /file/uploaded/delete/{filename}:
 *   delete:
 *     summary: Delete a file
 *     description: Deletes a file from the server by its filename.
 *     tags:
 *       - File Management
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the file to delete.
 *     responses:
 *       200:
 *         description: File deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File deleted successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */


// upload file route
router.post('/file/upload', async (req, res) => fileController.uploadFile(req, res));

// Retrieve file route
router.get('/file/uploaded/:filename', async (req, res) => fileController.getFile(req, res));

// Delete file route
router.delete('/file/uploaded/:filename', async (req, res) => fileController.deleteFile(req, res));

// Update file route
//router.put('/file/uploaded/:filename', (req, res) => fileController.updateFile(req, res));

module.exports = (upload) => {
  router.post('/file/upload', upload.single('file'), async (req, res) => fileController.uploadFile(req, res));

  return router;
};
