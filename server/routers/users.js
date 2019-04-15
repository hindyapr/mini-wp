const express = require('express');
const router = express.Router();
const userControll = require('../controllers/user')

router.get('/', userControll.findAll);
router.get('/:id', userControll.findOne);
router.post('/', userControll.create);
router.post('/login', userControll.login);
router.post('/googleSignIn', userControll.create);
router.put('/:id', userControll.edit);
router.delete('/:id', userControll.delete);

module.exports = router;