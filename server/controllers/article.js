const Article = require('../models/article');
const jwt = require('jsonwebtoken');


class ArticleController {


    static create(req, res) {

        try {
            const decoded = jwt.verify(req.headers.token, process.env.SECRET);

            let createObj = {
                title: req.body.title,
                content: req.body.content,
                published: req.body.published,
                author: decoded.userId,
                createdAt: new Date,
                updatedAt: new Date
            };



            if (req.body.published === 'true') {
                createObj.publishedAt = new Date
            }

            if (req.file) {
                editObj.featuredImage = req.file.cloudStoragePublicUrl;
            }

            Article
                .create(createObj)
                .then(data => {
                    res
                        .status(200)
                        .json(data);
                })
                .catch(err => {
                    res
                        .status(500);
                    console.log(err);
                })



        } catch (error) {
            throw 'Token is invalid'
        }



    }

    static findAllPublished(req, res) {
        Article
            .find({
                status: "published"
            })
            .populate('author')
            .then(articles => {
                res.json(articles);
            })
            .catch(err => {
                res.status(500)
            })
    }

    static findAllDraft(req, res) {
        Article
            .find({
                status: "draft"
            })
            .populate('author')
            .then(articles => {
                res.json(articles);
            })
            .catch(err => {
                res.status(500)
            })
    }

    static findAll(req, res) {
        console.log('masuk')
        Article
            .find({})
            .populate('author')
            .then(articles => {
                res.json(articles);
            })
            .catch(err => {
                res.status(500)
            })
    }

    static findOne(req, res) {
        Article
            .findById(req.params.id)
            .populate('author')
            .then(data => {
                res
                    .json(data);
            })
            .catch(err => {
                res
                    .status(500);
            })
    }

    static edit(req, res) {
        let editObj = {
            title: req.body.title,
            content: req.body.content,
            published: req.body.status,
            updatedAt: new Date
        }

        if (req.body.published) {
            editObj.publishedAt = new Date
        }

        if (req.file) {
            editObj.featuredImage = req.file.cloudStoragePublicUrl;
        }

        Article
            .findByIdAndUpdate(req.params.id, {
                $set: editObj
            }, {
                new: true
            })
            .then(data => {
                res
                    .json(data);
            })
            .catch(err => {
                res
                    .status(500);
            })
    }

    static delete(req, res) {
        Article
            .findByIdAndDelete(req.params.id)
            .then(data => {
                res
                    .json(data);
            })
            .catch(err => {
                res
                    .status(500);
            })




    }
}

module.exports = ArticleController;