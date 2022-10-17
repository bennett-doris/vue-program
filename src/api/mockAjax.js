// 对于axios进行二次封装
import axios from "axios";

// 引入进度条
import nProgress from "nprogress";
// start：进度条开始  done：进度条结束
// 引入进度条样式
import "nprogress/nprogress.css"


// 利用axios对象的方法create，去创建一个axios实例
// request就是axios，只不过稍微配置一下
let requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL: "/mock",
    // 代表请求超时的时间 5s
    timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // config: 配置对象，对象里面有一个属性很重要，header请求头
    nProgress.start()
    return config;
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数：服务器响应数据回来后，相应拦截器可以检测到，做一些事情
    nProgress.done()
    return res.data
}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error(error));
});

// 对外暴露
export default requests;