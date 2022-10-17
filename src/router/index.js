import Vue from 'vue';
import VueRouter from 'vue-router'

import routes from "./routes"

Vue.use(VueRouter)

// 引入store
import store from "@/store"


// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push和replace方法
// 第一个参数，告诉原来的push方法，你往哪儿跳（传哪些参数）
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        // call 和apply的区别
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数，call传递参数用逗号隔开，apply方法传递数组
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}


let router = new VueRouter({
    // 配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 每次跳转让滚动条在最上方
        return { y: 0 }
    },
})

// 全局守卫，前置守卫
router.beforeEach(async(to, from, next) => {
    // to： 去哪儿
    // from： 从哪儿
    // next：放行函数 next() 全放行  next(path) 放行到指定的path next(false) 劝退

    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        // 登录之后还想回登录页
        if (to.path == "/login" || to.path == "/register") {
            next("/")
        } else {
            // 去其他页面
            // 如果用户名存在
            if (name) {
                next();
            } else {
                try {
                    // 获取用户信息
                    await store.dispatch("getUserInfo");
                    next()
                } catch (error) {
                    // token 失效了，获取不到用户信息，重新登陆
                    // 清除token
                    await store.dispatch("userLogout")
                    next("/login")
                }
            }
        }
    } else {
        // 未登录：不能去交易相关页面、支付相关页面、个人中心
        let toPath = to.path
        if (toPath.indexOf("/trade") != -1 || toPath.indexOf("/pay") != -1 || toPath.indexOf("/center") != -1) {
            // 把未登录的时候想要去的页面地址存储在地址栏中
            next("/login?redirect=" + toPath)
        } else {
            next()
        }

    }
})

export default router;