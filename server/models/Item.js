//创建CategoryModel

//1.引入mongoose
const mongoose = require('mongoose')
//2.创建约束 Schema
const schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    icon: {
        type:String
    }
})

//3.创建模型 与集合对应可以操作集合
const Model = mongoose.model('Item',schema)

//4.默认暴露
module.exports = Model