const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    body: { type: String, required: true },
    conclusion: { type: String },
    author: { type: String },
    tags: { type: [String] },
    filePath: { type: String } // New field for storing file path
});

module.exports = mongoose.model("Articles", articleSchema);