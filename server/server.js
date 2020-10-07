// 应用的启动模块
// 1. 通过express启动服务器
// 2. 通过mongoose连接数据库
//   说明: 只有当连接上数据库后才去启动服务器
// 3. 使用中间件

const mongoose = require('mongoose')
const express = require('express')
const app = express()


//声明使用解析post请求的中间件
app.use(express.urlencoded({extended:true}))
app.use(express.json())  //解析josn结构 {name:1,age:2}
//可跨域
app.use(require('cors')())
//声明路由器中间件
const indexRouter = require('./routers/admin')
app.use('/admin/api',indexRouter)


//链接数据库
mongoose.connect('mongodb://localhost:27017/node-moba', {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log('数据库链接成功！')
    app.listen(4000, () => {
        console.log('4000端口启动')
    })
}).catch(error => console.log('数据库链接失败' + error))