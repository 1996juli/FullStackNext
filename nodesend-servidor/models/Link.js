const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linksSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    name_original: {
        type: String,
        required: true
    },
    download: {
        type: Number, 
        default: 1
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    },
    password: {
        type: String, 
        default: null
    },
    create: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Links', linksSchema);