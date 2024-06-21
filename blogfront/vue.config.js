const {defineConfig} = require("@vue/cli-service");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const {onlineEnvironment, devBaseUrl} = require("./src/config");

const env = process.env.NODE_ENV;
// 正式环境插件
const plugins = env === "development" ? [] : [
    new UglifyJsPlugin({
        uglifyOptions: {
            compress: {
                //warnings: false, 注释不然打包会报错如图下图
                drop_console: true,  //注释console
                drop_debugger: true, //注释debugger
                pure_funcs: ["console.log"], //移除console.log
            },
        },
    })
];


module.exports = defineConfig({
    lintOnSave: true,
    pluginOptions: { // 第三方插件配置
        "style-resources-loader": {
            preProcessor: "less",
            // less所在文件路径
            patterns: [path.resolve(__dirname, "./src/assets/css/variables.less")]
        }
    },
    productionSourceMap: false,
    transpileDependencies: true,
    publicPath: "/",
    //代理
    devServer: {
        // 指定项目启动时的默认端口号
        port: 80,
        historyApiFallback: true,
        allowedHosts: "all",
        proxy: {
            "/": {
                ws: false,
                // TEST 开发测试
                target: env === "development" ? devBaseUrl : onlineEnvironment,
                changeOrigin: true,
                pathRewrite: {
                    "^/": "/"
                }
            }
        }
    },
    configureWebpack: {
        resolve: {
            symlinks: false,
            alias: {
                vue: path.resolve("./node_modules/vue")
            }
        },
        plugins: plugins,
        output: {
            libraryExport: "../behind/src/static"
        }
    },
})
