const path = require('path')

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// if (process.env.NODE_ENV === 'production') {
//     plugins.push("transform-remove-console")
// }
//vue.config.js 完整默认配置 注意版本 "uglifyjs-webpack-plugin": "^1.1.1"
module.exports = {
    // 基本路径
    baseUrl: '/',
    // 输出文件目录
    outputDir: 'dist',
    // 用于嵌套生成的静态资产（js，css，img，fonts）的目录。
    assetsDir: '',
    // 以多页模式构建应用程序。
    pages: undefined,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 是否使用包含运行时编译器的Vue核心的构建。
    runtimeCompiler: false,
    // 默认情况下babel-loader忽略其中的所有文件node_modules。
    transpileDependencies: [],
    // 生产环境sourceMap// 打包时不生成.map文件
    productionSourceMap: false,
    // webpack配置
    configureWebpack: config => {
        config.optimization = {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_debugger: true,
                            drop_console: true
                        }
                    }
                })
            ]
        };
        config.externals = {
            //格式为 '资源的名字' : '给外部引用的名字',
            //由对应的库自定。例如，vue为Vue，vue-router为VueRouter.
            vue: "Vue",
            iview: "iView",
            "vue-router": "VueRouter",
            axios: "axios",
            vuex: "Vuex"
        };
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },
    chainWebpack: () => { },
    // css相关配置
    css: {
        // 启用 CSS modules
        modules: false,
        // 是否使用css分离插件
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
    },
    // webpack-dev-server 相关配置
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        // autoOpenBrowser: true,
        before: app => { }
    },
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    pwa: {},
    // 第三方插件配置
    pluginOptions: {
        // ...

    }
}