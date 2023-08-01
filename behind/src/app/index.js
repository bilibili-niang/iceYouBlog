const koa = require('koa')
const router = require('../router')
const koabody = require('koa-body')
const koaStatic = require('koa-static')
//参数校验
const parameter = require('koa-parameter')
// 引入 koa-html-template
const template = require('koa-html-template')
// const Static = require('static-resource-plugin')
const static = require('koa-static')
// const views = require('koa-views')
const app = new koa()
const errHandler = require('./errHadnler')
const path = require('path')

// 跨域
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    ctx.set('Access-Control-Allow-Methods', 'POST');
    await next();
});

//开放html模板的静态目录
app.use(static(path.join(__dirname, '../static/views/'), {extension: 'html'}))
app.use(static(path.join(__dirname, '../static')))
/* @author 张嘉凯
 * @date 2023/6/21 @time 15:21
 * 存放文章图片
*/
app.use(static(path.join(__dirname, '../static/images/markdown')))
app.use(template())
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

app.use(koabody({
    multipart: true, //支持图片文件
    formidable: {
        uploadDir: path.join(__dirname, '../upload'), //设置上传目录
        keepExtensions: true, //保留拓展名
    }
}))



app.use(parameter(app))

//开放静态资源路径
app.use(koaStatic(path.join(__dirname, '../upload')))
//挂载
app.use(router.routes())

//统一的错误处理:
app.on('error', errHandler)

// 导出:
module.exports = app;
