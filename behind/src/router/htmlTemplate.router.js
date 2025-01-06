//markdown	文章的操作
const Router = require('koa-router')
const router = new Router()
const template = require('koa-html-template')

router.get('/', index)

async function index(ctx) {

    await ctx.template('index.html', {
    // await ctx.render('index.html', {
        demo: "run demo"
    })
}

module.exports = router;
