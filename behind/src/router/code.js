const Router = require('koa-router')
const { auth } = require('../middleware/user.middleware')
const router = new Router({ prefix: '/code' })
const {
    returnNewCOde,
    returnCodeClips,
    returnDelCodeClips,
    returnCodeClipsData,
    returnSearchResult
} = require('../controller/code.controller')

// 新增代码片段
router.post('/codeClips', auth, returnNewCOde)

// 获取所有代码片段
router.get('/getCodeClips', returnCodeClips)

// 通过id删除
router.post('/delCodeClips', returnDelCodeClips)

// 通过id获取具体code的数据
router.post('/getCodeClipsData', returnCodeClipsData)
// 搜索
router.post('/search', returnSearchResult)

module.exports = router
