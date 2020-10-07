//vue.config.js

module.exports = {
  devServer: {
    port: 8080, // 端口号
    host: 'localhost', // 'localhost'
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: {
    //     '/admin/api': {
    //         target: 'http://localhost:4000',
    //         changeOrigin: true
    //     },
    
    // },
  }
}