// 所有的路由
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

module.exports = router;