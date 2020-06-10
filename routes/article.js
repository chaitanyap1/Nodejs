const express = require('express')
const router = express.Router()

const ArticleController = require('../controller/ArticleController')

router.post('/articles',ArticleController.article)
router.get('/articles',ArticleController.index)

module.exports = router