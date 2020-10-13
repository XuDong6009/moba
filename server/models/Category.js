//创建CategoryModel

//1.引入mongoose
const mongoose = require('mongoose')
//2.创建约束 Schema
const schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    parent: {
        type:mongoose.SchemaTypes.ObjectId,
        require:false,
        ref:'Category'
    }
})

//3.创建模型 与集合对应可以操作集合
const model = mongoose.model('Category',schema)

//4.默认暴露
module.exports = model