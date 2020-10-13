// 应用的启动模块
// 1. 通过express启动服务器
// 2. 通过mongoose连接数据库
//   说明: 只有当连接上数据库后才去启动服务器
// 3. 使用中间件

const mongoose = require('mongoose')
const express = require('express')
const app = express()

const path = require('path')

app.set('secret','xudongdong')

//挂载静态目录
app.use('/images',express.static(path.resolve('upload')))

//声明使用解析post请求的中间件
app.use(express.urlencoded({extended:true}))
app.use(express.json())  //解析josn结构 {name:1,age:2}
//可跨域
app.use(require('cors')())
//声明路由器中间件
const indexRouter = require('./routers/admin')

app.use('/admin/api/reset/:resource',async(req,res,next) =>{
    const modalName = require('inflection').classify(req.params.resource) //classfy转换为类名
    req.Model = require(path.resolve('models', modalName))
    next()
},indexRouter)



//引入multer 用来处理文件upload
const multer = require('multer')
//指定upload的目录
const upload = multer({dest:path.resolve(__dirname,'upload')})
app.post('/admin/api/upload',upload.single('file'),async(req,res) => {
    const file = req.file
    file.imgSrc = 'http://localhost:4000/images/'+file.filename
    res.send(file)
})


app.post('/admin/api/login',async (req,res) => {
    const userModal = require('./models/User')
    const user = await userModal.findOne({username:req.body.username}).select('+password')
    if(!user) {
        res.status(422).send({msg:'用户名不存在'})
    }else {
        const isVaild = require('bcrypt').compareSync(req.body.password,user.password)
        if(!isVaild) {
            res.status(422).send({msg:'用户密码错误'})
        }else {
            const token = require('jsonwebtoken').sign({id:user._id},app.get('secret'))
            res.send({token})
        }
    }
})


//错误捕获中间件
app.use(async(error,req,res,next) => {
    if(error) {
        res.status(error.status).send({msg:error})
    }
})


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