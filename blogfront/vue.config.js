const {defineConfig} = require('@vue/cli-service')
const webpack = require("webpack");
//打包配置自动忽略console.log等
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = defineConfig({
    transpileDependencies: true,
    //代理
    devServer: {
        // 指定项目启动时的默认端口号
        port: 80,
        historyApiFallback: true,
        allowedHosts: 'all',
        proxy: {
            '/': {
                ws: false,
                // target: "http://icestone.top:8090",
                target: "http://localhost:89",
                changeOrigin: true,
                pathRewrite: {
                    '^/': '/'
                }
            }
        },
        // proxy: 'http://localhost:8090'
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default']
            }),
            //打包环境去掉console.log等
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        //warnings: false, 注释不然打包会报错如图下图
                        drop_console: true,  //注释console
                        drop_debugger: true, //注释debugger
                        pure_funcs: ['console.log'], //移除console.log
                    },
                },
            })
        ],

        output: {
            libraryExport: '../behind/src/static'
        },
    },
})
