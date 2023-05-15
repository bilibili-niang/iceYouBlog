//用户模块
const Router = require('koa-router')
const router = new Router({prefix: '/admin'})
const {isAdmin} = require('../middleware/admin.middleware')
const {
    returnAllFriendLinks,
    returnAddResult,
    returnLogs,
    operateMarkdown
} = require('../controller/admin.controller')
const {auth} = require("../middleware/user.middleware");


router.post('/friendLinks', returnAllFriendLinks);

router.post('/addLinks', isAdmin, returnAddResult)
// router.post('/addLinks', returnAddResult)

/* @author icestone , 14:34
 * @date 2023/5/9
 * TODO log的分页查询
*/
router.post('/getLogs', auth, isAdmin, returnLogs)

/* @author icestone , 14:35
 * @date 2023/5/9
 * TODO 获取log的总览信息之类的,allCount
*/
// router.post('/LogInfo',)

router.post('/markdownOperate', auth, isAdmin, operateMarkdown)

module.exports = router