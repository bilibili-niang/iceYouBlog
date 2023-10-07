const {defineConfig} = require('@vue/cli-service')
// const webpack = require("webpack");
//打包配置自动忽略console.log等
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = defineConfig({
    pluginOptions: { // 第三方插件配置
        'style-resources-loader': {
            preProcessor: 'less',
            // less所在文件路径
            patterns: [path.resolve(__dirname, './src/assets/css/variables.less')]
        }
    },
    productionSourceMap: false,
    transpileDependencies: true,
    publicPath: '/',
    //代理
    devServer: {
        // 指定项目启动时的默认端口号
        port: 80,
        historyApiFallback: true,
        allowedHosts: 'all',
        proxy: {
            '/': {
                ws: false,
                target: "http://localhost:89",
                // target: "http://118.31.70.94:89/",
                changeOrigin: true,
                pathRewrite: {
                    '^/': '/'
                }
            }
        },
        // proxy: 'http://localhost:8090'
    },
    configureWebpack: {
        resolve: {
            symlinks: false,
            alias: {
                vue: path.resolve('./node_modules/vue')
            }
        },
        plugins: [
            //打包环境去掉console.log等
            /* @author icestone , 17:22
             * @date 2023/5/15
             * 下面这个应该在打包时才打开,开发时不要打开,编译消耗很多时间
            */
            /*new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        //warnings: false, 注释不然打包会报错如图下图
                        drop_console: true,  //注释console
                        drop_debugger: true, //注释debugger
                        pure_funcs: ['console.log'], //移除console.log
                    },
                },
            })*/
        ],
        output: {
            libraryExport: '../behind/src/static'
        },
    },
})
