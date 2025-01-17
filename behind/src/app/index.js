const koa = require('koa')
const router = require('../router')
const koabody = require('koa-body')
const koaStatic = require('koa-static')
//参数校验
const parameter = require('koa-parameter')
const template = require('koa-html-template')
const static = require('koa-static')
const app = new koa()
const path = require('path')
const { logger } = require('../log/log')
const { router: swaggerDec } = require('../config/swagger')
require('babel-register')

// 跨域
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type')
  ctx.set('Access-Control-Allow-Methods', 'POST')
  await next()
})
  //开放html模板的静态目录
  .use(static(path.join(__dirname, '../static/views/'), { extension: 'html' }))
  .use(static(path.join(__dirname, '../static')))
  .use(static(path.join(__dirname, '../static/images/markdown')))
  .use(template())
  .use(koabody({
    multipart: true, //支持图片文件
    formidable: {
      uploadDir: path.join(__dirname, '../upload'), //设置上传目录
      keepExtensions: true //保留拓展名
    }
  }))
  .use(parameter(app))
  .use(koaStatic(path.join(__dirname, '../upload')))
  .use(koaStatic(path.join(__dirname, '../bonus')))
  .use(router.routes())
  .use(swaggerDec.routes(), swaggerDec.allowedMethods())
  .on('error', (ctx) => {
    console.log('错误统一处理')
    console.log(ctx)
    ctx.body = {
      code: 500,
      msg: '你遇到了一个错误'
    }
  })
// 接受文件
/*app.use(koaBody({
    multipart: true,
    formidable: {
        //设置保存文件的路径
        //在配置选项的option里,这里不推荐写相对路径
        //在option里的相对路径,不是相对的当前文件,而是相对于process.cwd()(脚本在哪里执行,相对于哪个路径)

        //也可以相对于服务器的相对路径:
        // uploadDir: './src/upload',
        //一般这里使用绝对路径
        uploadDir: path.join(__dirname, '../upload'),
        //是否保留文件扩展名
        keepExtensions: true,
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
}))*/
// 导出:
module.exports = app
