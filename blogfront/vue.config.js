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
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"]
      },
    },
  })
];

module.exports = defineConfig({
  lintOnSave: false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/style/variables.less")]
    }
  },
  productionSourceMap: false,
  transpileDependencies: true,
  publicPath: "/",
  devServer: {
    port: 80,
    historyApiFallback: true,
    allowedHosts: "all",
    proxy: {
      "/": {
        ws: false,
        // target: env === "development" ? devBaseUrl : onlineEnvironment,
        target: devBaseUrl,
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
        vue: path.resolve("./node_modules/vue"),
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.js', '.json', '.vue', '.ts', '.tsx'], // 自动扩展文件后缀名
    },
    module: {
      rules: [
        // 添加 TypeScript 规则
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@vue/babel-preset-jsx']
              }
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
                happyPackMode: true
              }
            }
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-transform-private-methods"],
            },
          },
        },
      ]
    },
    plugins: plugins,
    output: {
      libraryExport: "../behind/src/static"
    }
  },
});