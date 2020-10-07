//暴露路由
const express = require('express')
const router = express.Router()

const categoryModel = require('../models/Category')

router.post('/categories', (req, res) => {
    console.log(req.body);
    categoryModel.create({
        name: '皮卡丘'
    }).then(val => {
        res.send(val)
    })
})

6
module.exports = router