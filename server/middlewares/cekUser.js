const jwt = require('jsonwebtoken');
const article = require('../models/article')

module.exports = {
    cekUser(req, res, next) {
        try {
            const decoded = jwt.verify(req.headers.token, process.env.SECRET);

            article
                .findById(req.params.id)
                .populate('author')
                .then(data => {
                    if (decoded.userId === data.author.id) {
                        next();
                    } else {
                        throw `this user didn't have authorization`
                    }
                })
                .catch(err => {
                    res
                        .status(500)
                })

        } catch (error) {
            throw 'Token is invalid'
        }
    }
}