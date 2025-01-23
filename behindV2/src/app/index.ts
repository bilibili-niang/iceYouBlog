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

// 处理 Zod 验证错误的辅助函数
const formatZodError = (err: any) => {
  if (Array.isArray(err) && err[0]?.code === 'invalid_type') {
    // Zod 验证错误
    const errors = err.map(e => ({
      field: e.path.join('.'),
      message: `${e.path.join('.')} ${e.message}`
    }))
    return {
      msg: '参数验证失败',
      errors
    }
  }
  return {
    msg: err.message || '服务器内部错误',
    errors: err
  }
}

// 监听错误的
onError(app, {
  json(err: any, ctx: any) {
    ctx.status = err.status || 500
    ctx.type = 'application/json'
    const errorInfo = formatZodError(err.errors || err)
    ctx.body = JSON.stringify(ctxBody({
      success: false,
      code: err.status || 500,
      msg: errorInfo.msg,
      data: errorInfo.errors
    }))
  },
  text() { /* 禁用文本错误响应 */ },
  html() { /* 禁用 HTML 错误响应 */ }
})

// 跨域
app
  .on('error', async (err: any, ctx: any) => {
    ctx.status = err.status || 500
    ctx.type = 'application/json'
    const errorInfo = formatZodError(err.errors || err)
    ctx.body = JSON.stringify(ctxBody({
      success: false,
      code: err.status || 500,
      msg: errorInfo.msg,
      data: errorInfo.errors
    }))
    error('响应错误,' + JSON.stringify(err))
  })
  .use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type')
    ctx.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    )
    await next()
  })
  .use(
    koaBody({
      multipart: true,
      formidable: {
        uploadDir: path.join(__dirname, '../upload'), //设置上传目录
        keepExtensions: true, //保留拓展名
      },
    })
  )
  //开放html模板的静态目录,你可以把打包后的html文件放到这个目录下
  .use(
    staticFiles(path.join(__dirname, '../static/views/'), {
      extensions: ['html'],
    })
  )
  .use(indexRouter.routes())
  .use(async (ctx, next) => {
    if (ctx.status === 404) {
      ctx.type = 'application/json'
      ctx.body = JSON.stringify(ctxBody({
        success: false,
        code: 404,
        msg: '接口不存在',
      }))
    } else if (ctx.status >= 500) {
      ctx.type = 'application/json'
      ctx.body = JSON.stringify(ctxBody({
        success: false,
        code: ctx.status,
        msg: '服务器内部错误',
      }))
    }
    await next()
  })
  .use((ctx, next) => {
    ctx.status = 500
    ctx.type = 'application/json'
    console.log('最后的ctx')
    trace('未知url' + ctx.request.url)
    ctx.body = JSON.stringify(ctxBody({
      code: 500,
      msg: `这里是无人之境`,
    }))
  })

export default app
