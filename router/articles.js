const express = require('express');
const articleController = require('../controllers/articles');

const router = express.Router();

router.get('/', articleController.findAll);
router.post('/', articleController.create);

module.exports = router;
