const express = require('express');
const fileController = require('../controllers/fileManagerController');


const router = express.Router();

// Upload file route
router.post('/upload', async (req, res) => fileController.uploadFile(req, res));

// Retrieve file route
router.get('/:filename', (req, res) => fileController.getFile(req, res));

// Delete file route
router.delete('/:filename', (req, res) => fileController.deleteFile(req, res));

// Update file route
router.put('/:filename', (req, res) => fileController.updateFile(req, res));

module.exports = (upload) => {
  router.post('/upload', upload.single('file'), (req, res) => fileController.uploadFile(req, res));
  router.put('/:filename', upload.single('file'), (req, res) => fileController.updateFile(req, res));

  return router;
};
