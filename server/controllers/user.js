const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { decode } = require('../helpers/bcrypt')


class UserController {
    static create(req, res) {
        User
            .create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                createdAt: new Date,
                updatedAt: new Date,
            })
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
    }

    static login(req, res) {
        console.log('masuk', req.body);
        User
            .find({
                email: req.body.email
            })
            .then(data => {
                console.log('masuk', data);
                if (data.length < 1) {
                    console.log('masuk')
                    res
                        .status(404)
                        .json({ message: 'Email tidak ditemukan' })
                } else {
                    if (decode(req.body.password, data[0].password)) {
                        console.log('masuk decode');
                        let access_token = jwt.sign({
                            userId: data.id,
                            email: data.email
                        }, process.env.SECRET);
                        console.log('masuk');
                        res
                            .status(201)
                            .json(access_token);
                    } else {
                        res
                            .status(404)
                            .json({ message: 'Password salah' })
                    }
                }
            })
            .catch(err => {
                res
                    .status(500)
            })
    }

    static findAll(req, res) {
        console.log('masuk')
        User
            .find({})
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                res.status(500)
            })
    }

    static findOne(req, res) {
        User
            .findById(req.params.id)
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
        User
            .findByIdAndUpdate(req.params.id, {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    status: req.body.status
                }
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
        User
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

module.exports = UserController;