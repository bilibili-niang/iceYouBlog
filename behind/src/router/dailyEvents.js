// 事件模块
const Router = require('koa-router')
const userM = require('../middleware/user.middleware')
const router = new Router({ prefix: '/events' })

const eventC = require('../controller/events.controller.js')

// 新增今日事件
router.post('/addTodayEvent', userM.auth, eventC.addEvent)

// 获取事件列表
router.post('/getTodayEvent', userM.auth, eventC.getEvents)

// 获取事件详情
router.post('/getEventDetail', userM.auth, eventC.getEventDetailById)

router.post('/test', (ctx) => {
    ctx.body = {
        code: 200,
        success: true,
        message: '本地测试消息',
        result: {}
    }
})

// 获取今天的事件
router.post('/getDayEvent', userM.auth, eventC.getToDayEvents)

// 删除
router.post('/deleteEvent', userM.auth, eventC.deleteEvent)

module.exports = router
