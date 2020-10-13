const assert = require('http-assert')
const userModal = require('../models/User')
module.exports = (options) => {
    return async (req,res,next) =>{
        const token = req.headers.authorization
        console.log(token);
        if (!token) {
            //当没有token
            assert(token,401,'用户验证失败')
        } else {
            try {
                const tokenData = token.split(' ').pop()
                //验证用户信息
                const {
                    id
                } = require('jsonwebtoken').verify(tokenData, app.get('secret'))
                if (id) {
                    const resultData = await userModal.findById(id)
                    req.user = resultData
                }
            } catch {
                assert(token,401,'对不起,我错了')
            }
    
        }
        next()
    }
}