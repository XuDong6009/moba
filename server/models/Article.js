//创建CategoryModel
//1.引入mongoose
const mongoose = require('mongoose')
//2.创建约束 Schema
const schema = mongoose.Schema({
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}], //关联的模型是Category
    title:{type:String},
    body:''  //富文本详情
    
})

//3.创建模型 与集合对应可以操作集合
const model = mongoose.model('Article',schema)

//4.默认暴露
module.exports = model



