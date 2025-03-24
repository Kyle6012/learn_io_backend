const Articles = require('../models/artticlesModel');
const multer = require('multer');
const { Storage } = require('./fileManagerController'); // Import Storage

const upload = multer({ storage: Storage() }).single('file'); // Middleware for handling file uploads

exports.createArticle = async(req, res) => {
    upload(req, res, async(err) => {
        if (err) {
            return res.status(500).json({ message: "File upload failed", error: err.message });
        }

        try {
            const article = new Articles({
                title: req.body.title,
                body: req.body.body,
                conclusion: req.body.conclusion,
                author: req.body.author,
                tags: req.body.tags,
                filePath: req.file ? req.file.path : null, // Save file path if uploaded
                createdAt: new Date()
            });

            const savedArticle = await article.save();
            res.status(201).json(savedArticle);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};


exports.updateArticle = async(req, res) => {
    try {
        const updatedArticle = await Articles.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteArticle = async(req, res) => {
    try {
        const deletedArticle = await Articles.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getAllArticles = async(req, res) => {
    try {
        const articles = await Articles.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}