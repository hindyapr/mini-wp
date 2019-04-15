const express = require('express');
const router = express.Router();
const articleControll = require('../controllers/article');
const { cekUser } = require('../middlewares/cekUser');
const {
    getPublicUrl,
    sendUploadToGCS,
    multer
} = require('../middlewares/multer');


router.get('/', articleControll.findAll);
router.get('/published', articleControll.findAllPublished);
router.get('/draft', articleControll.findAllDraft);
router.get('/:id', articleControll.findOne);
router.post('/', multer.single('image'), sendUploadToGCS, articleControll.create);
router.put('/:id', cekUser, multer.single('image'), sendUploadToGCS, articleControll.edit);
router.delete('/:id', cekUser, articleControll.delete);

module.exports = router;