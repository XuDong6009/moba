import axios from 'axios'
import router from './router/index'
import {
    Message
} from 'element-ui'
const http = axios.create({
    baseURL: 'http://localhost:4000/admin/api'
})


//添加axios request 拦截器
http.interceptors.request.use((config) => {
    //如果存在 则传入token
    if(localStorage.getItem('token')){
        config.headers.Authorization = 'Bearer '+ localStorage.token
    }
    return config
},error => {
    return Promise.reject(error)
})


//添加一个axios response 拦截器
http.interceptors.response.use(res => {
    return res
}, error => {
    debugger
    if(error.response.status === 401 || error.response.status === 402){
        router.push('/login')
    }
    Message.error(error.response.data.msg) 

    return Promise.reject(error)
})
export default http