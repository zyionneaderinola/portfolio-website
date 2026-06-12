const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    category: { type: String, required: true },
    skills: { type: [String], required: true },
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Skill', skillSchema);