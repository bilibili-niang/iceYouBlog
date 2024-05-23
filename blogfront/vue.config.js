const {defineConfig} = require("@vue/cli-service");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const {onlineEnvironment, devBaseUrl} = require("./src/config");

console.log("process.env.NODE_ENV:");
console.log(process.env.NODE_ENV);
const env = process.env.NODE_ENV;
const plugins = env === "development" ? [] : [
    /*
     * 线上环境才会使用的插件
     * 打包环境去掉console.log等
     * 下面这个应该在打包时才打开,开发时不要打开,编译消耗很多时间
    */
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
                target: env === "development" ? devBaseUrl : onlineEnvironment,
                changeOrigin: true,
                pathRewrite: {
                    "^/": "/"
                }
            }
        },
        // proxy: 'http://localhost:8090'
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
        },
    },
});
