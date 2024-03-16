const { Router } = require('express');
const router = Router();
const {convertMusic} = require('../controllers/convertController.js');

router.post('/convert', convertMusic);

module.exports = {
    router
}