// 事件模块
const Router = require('koa-router')
const userM = require('../middleware/user.middleware')
const router = new Router({ prefix: '/events' })

const eventC = require('../controller/events.controller.js')

// 新增今日事件
router.post('/addTodayEvent', userM.auth, eventC.addEvent)

router.post('/list',userM.auth,eventC.getList)

router.post('/test', (ctx) => {
    ctx.body = {
        code: 200,
        success: true,
        message: '本地测试消息',
        result: {}
    }
})


module.exports = router
