//暴露路由
const express = require('express')
const {
    deleteOne
} = require('../models/User')
const router = express.Router({
    mergeParams: true
})
const app = express()
app.set('secret', 'xudongdong')


const authMidWare = require('../midware/auth')

//查找全部
router.get('/', authMidWare(), async (req, res) => {
    const model = await req.Model.find().populate('parent').limit(10)
    res.send(model)
})



//创建
router.post('/', async (req, res) => {
    const modal = await req.Model.create(req.body)
    res.send(modal)
})

//更新
router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
})

//根据id删除
router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id)
    res.send(model)
})


//根据id进行查找
router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
})



module.exports = router