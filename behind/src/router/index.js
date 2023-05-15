// 首页
const fs = require('fs')
const Router = require('koa-router')
// 这里可以设置总路由的前缀
// const router = new Router({prefix: '/indexData'})
const router = new Router()

fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
        let r = require('./' + file)
        router.use(r.routes())
    }
})

/*
router.get('/', (ctx) => {
    // 返回数据
    ctx.body = {
        code: 200,
        success: 'true',
        msg: '这是首页借口',
        data: {}
    }
})
*/


module.exports = router;