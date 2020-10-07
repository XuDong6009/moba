//创建CategoryModel

//1.引入mongoose
const mongoose = require('mongoose')
//2.创建约束 Schema
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})

//3.创建模型 与集合对应可以操作集合
const categoryModel = mongoose.model('categories',categorySchema)

//4.默认暴露
module.exports = categoryModel