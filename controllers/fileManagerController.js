const fs = require('fs');
const path = require('path');
const multer = require('multer');

const Storage = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = 'uploads/';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname/* Date.now() + path.extname(file.originalname)*/); // unique filename with timestamp
    }
  });
  
  return storage;
};

// upload handler
const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file
  });
};

// retrieval handler
const getFile = (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.sendFile(filePath);
  });
};

// deletion handler
const deleteFile = (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.status(200).json({ message: 'File deleted successfully' });
  });
};

// update handler
/*const updateFile = (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({
      message: 'File updated successfully',
      file: req.file
    });
  });
};*/

module.exports = {
  uploadFile,
  getFile,
  deleteFile,
  Storage
};
