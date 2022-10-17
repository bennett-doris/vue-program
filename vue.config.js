module.exports = {
    // 不设置会生成.map 文件，找到出错行用的（上线不需要）
    productionSourceMap: false,
    // 关闭ESLINT校验工具
    lintOnSave: false,
    //配置代理跨域
    devServer: {
        proxy: {
            "/api": {
                target: "http://gmall-h5-api.atguigu.cn",
            },
        },
    },
};