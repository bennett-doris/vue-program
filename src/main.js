import Vue from 'vue'
import App from './App.vue'

// 三级联动组件
import TypeNav from "@/components/TypeNav"
import Carousel from '@/components/Carousel'
import Pagination from "@/components/Pagination"
import { Button, MessageBox } from 'element-ui';


// 第一个参数是：全局组件的名字，第二个参数：哪一个组件、
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)

Vue.config.productionTip = false

// 引入路由
import router from '@/router';

// 引入仓库
import store from "@/store"

// 测试
// import { reqGoodsInfo } from "@/api"
// console.log(reqGoodsInfo(5))

// 引入mockServe
import '@/mock/mockServe'

// 引入Swiper样式
import 'swiper/css/swiper.css'

// 统一接口 api 文件夹里面全部请求函数
import * as API from "@/api"
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import atm from "@/assets/atm.gif"
// 注册插件
Vue.use(VueLazyload, {
    loading: atm
})

// 引入自定义插件
import myPlugins from "@/plugins/myPlugins"
import "@/plugins/validate"
Vue.use(myPlugins, {
    nema: "upper"
})

new Vue({
    render: h => h(App),
    // 全局事件总线$bus配置
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
        Vue.prototype.$msgbox = MessageBox
        Vue.prototype.$alert = MessageBox.alert
    },
    // 注册路由
    router,
    // 注册仓库：组件实例的身上会多多一个属性$store属性
    store
}).$mount('#app')