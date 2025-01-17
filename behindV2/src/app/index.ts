// koa的挂载和静态资源开放等
import koa from 'koa'
import indexRouter from '@/router/index'
import koaBody from 'koa-body'
import path from 'path'
import onError from 'koa-onerror'
import staticFiles from 'koa-static'
import { error, trace } from '@/config/log4j'
import { ctxBody } from '@/utils'


const app = new koa()

// 监听错误的
onError(app, {
  json: function (err, ctx) {
    ctx.status = 500
    ctx.body = ctxBody({ msg: err.message })
  }
})

// 跨域
// @ts-ignore
app
  .on('error', async (err, ctx, next) => {
    ctx.status = 500

    ctx.body = ctxBody({ data: err.errors[0] })

    console.log(err.errors[0])

    error('响应错误,' + JSON.stringify(err))

  })
  .use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type')
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    await next()
  })
  .use(koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '../upload'), //设置上传目录
      keepExtensions: true //保留拓展名
    }
  }))
  //开放html模板的静态目录,你可以把打包后的html文件放到这个目录下
  .use(staticFiles(path.join(__dirname, '../static/views/'), { extensions: ['html'] }))
  .use(indexRouter.routes())
  // .use(validate)
  .on('error', async (err, ctx, next) => {
    ctx.status = 500
    ctx.body = err
    error('响应错误,' + JSON.stringify(err))
  })
  .use((ctx, next) => {
    console.log('最后的ctx')
    trace('未知url' + ctx.request.url)
    ctx.body = ctxBody({
      code: 500,
      msg: `这里是无人之境`,
    })
  })

export default app