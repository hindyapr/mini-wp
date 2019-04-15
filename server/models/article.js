const mongoose = require('mongoose');
const User = require('./user')


const articleSchema = new mongoose.Schema({
    title: 'string',
    content: 'string',
    published: 'boolean',
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: 'date',
    publishedAt: 'date',
    updatedAt: 'date'
})

const Article = mongoose.model('Article', articleSchema);


module.exports = Article;