//创建CategoryModel

//1.引入mongoose
const mongoose = require('mongoose')
//2.创建约束 Schema
const schema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type:String,
        select:false,
        set(val) {
            return require('bcrypt').hashSync(val,10)
        }
    }
})

//3.创建模型 与集合对应可以操作集合
const model = mongoose.model('User', schema)

//4.默认暴露
module.exports = model