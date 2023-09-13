//网站主页的路由
const Router = require('koa-router')
const { auth } = require('../middleware/user.middleware')
const {
    newMarkdown
} = require('../controller/markdown.controller')

const router = new Router({ prefix: '/new' })

// 新建markdown文章
router.post('/markdown', auth, newMarkdown)

module.exports = router
