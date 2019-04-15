const express = require('express');
const router = express.Router();
const articles = require('./articles');
const users = require('./users');
const {
    getPublicUrl,
    sendUploadToGCS,
    multer
} = require('../middlewares/multer');



router.use('/articles', articles);
router.use('/users', users);
router.post('/upload',
    multer.single('image'),
    sendUploadToGCS,
    (req, res) => {
        let testObj = {}
        if (req.file) {
            testObj = {
                status: 200,
                message: 'Your file is successfully uploaded',
                link: req.file.cloudStoragePublicUrl
            }
        } else {
            testObj = {
                status: 400,
                message: 'there is not choosen file',
            }
        }

        res.send({ testObj })
    })


module.exports = router;