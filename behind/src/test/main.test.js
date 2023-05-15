const Koa = require('koa')
const app = module.exports = new Koa()
const path = require('path')
const views = require('koa-views')
const Router = require('koa-router')
const router = new Router()
app.use(views(path.join(__dirname, 'views/'), {extension: 'html'}))

router.get('/', index)
    .get('/link', linkpage)

async function index(ctx) {
    await ctx.render('index')
}

async function linkpage(ctx) {
    await ctx.render('link')
}

app.use(router.routes())

if (!module.parent) {
    app.listen(3000, function () {
        console.log('koa server running at port 3000')
    })
}
