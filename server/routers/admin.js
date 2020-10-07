//暴露路由
const express = require('express')
const router = express.Router()

const categoryModel = require('../models/Category')

//创建
router.post('/categories', async (req, res) => {
    const model = await categoryModel.create(req.body)
    res.send(model)
})

//更新
router.put('/categories/:id', async (req, res) => {
    const model = await categoryModel.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
})

//根据id删除
router.delete('/categories/:id', async (req, res) => {
    const model = await categoryModel.findByIdAndDelete(req.params.id)
    res.send(model)
})



//查找全部
router.get('/categories', async (req, res) => {
    const model = await categoryModel.find().limit(10)
    res.send(model)
})

//根据id进行查找
router.get('/categories/:id', async (req, res) => {
    const id = req.params.id
    const model = await categoryModel.findById(id)
    res.send(model)
})


module.exports = router