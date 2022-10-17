// vue 插件一定暴露一个对象

let myPlugins = {};

myPlugins.install = function(Vue, options) {
    console.log(options)
    Vue.directive(options.nema, (element, params) => {
        console.log("执行")
        element.innerHTML = params.value.toUpperCase();
    })
}

export default myPlugins