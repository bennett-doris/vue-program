// 路由配置信息

// 引入路由组件
// import Home from "@/pages/Home"
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
// 引入二级路由组件
import myOrder from "@/pages/Center/myOrder"
import groupOrder from "@/pages/Center/groupOrder"

// 路由懒加载
// 把不通路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件

export default [{
        path: "/home",
        // 路由懒加载
        component: () =>
            import ("@/pages/Home"),
        meta: { show: true }
    },
    {
        path: "/center",
        component: Center,
        meta: { show: true },
        redirect: "/center/myorder",
        // 二级路由组件
        children: [{
                path: "myorder",
                component: myOrder
            },
            {
                path: "grouporder",
                component: groupOrder
            }
        ]
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: "/pay",
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: "/trade",
        component: Trade,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == "/shopcart") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { show: true }

    },
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: "/detail/:id?",
        component: Detail,
        meta: { show: true }
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/search/:keyword?",
        component: Search,
        meta: { show: true },
        name: "search",
        // 布尔值写法，只能传递params参数
        // props: true
        // 对象写法,额外给路由组件传递一些props
        // props: { a: 1, b: 2 }
        // 函数写法，可以把params参数，query参数，通过props传递给路由组件
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        }
    },
    {
        path: "/register",
        component: Register
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: "*",
        redirect: "/home"
    }
]