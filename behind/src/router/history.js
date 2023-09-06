//网站主页的路由
const Router = require('koa-router')
const { hasToken } = require('../middleware/user.middleware')
const router = new Router({ prefix: '/history' })

const historyC = require('../controller/history.controller')

// 返回用户所有的浏览记录
router.post('/userAllHistory', hasToken, historyC.returnUserAllHistory)

// 返回用户的搜索记录
router.post('/userAllSearchHistory', hasToken, historyC.returnUserAllSearchHistory)

module.exports = router
