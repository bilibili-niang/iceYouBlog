// 造福人类

const Router = require('koa-router')
const router = new Router({ prefix: '/bonus' })

router.get('/randomOne', (ctx) => {
    console.log(ctx)
    ctx.body = {
        code: 200,
        message: '获取随机一张图片'
        
    }
})


module.exports = router
