//用户模块
const Router = require('koa-router')
const router = new Router({prefix: '/admin'})
const {
    isAdmin
} = require('../middleware/admin.middleware')

const adminC=require('../controller/admin.controller')

const {auth} = require("../middleware/user.middleware");

router.post('/friendLinks', adminC.returnAllFriendLinks);

router.post('/addLinks', isAdmin, adminC.returnAddResult)

/* @author icestone , 14:34
 * @date 2023/5/9
 * log的分页查询
*/
router.post('/getLogs', auth, isAdmin, adminC.returnLogs)

/* @author icestone , 14:35
 * @date 2023/5/9
 * 获取log的总览信息之类的,allCount
*/
// router.post('/LogInfo',)

router.post('/markdownOperate', auth, isAdmin, adminC.operateMarkdown)

/* @author icestone , 17:32
 * @date 2023/5/17
 * admin用户获取所有admin用户
*/
router.post('/getAllAdminInfo', isAdmin, adminC.returnAllAdminUser)

router.post("/operateUser", auth, isAdmin, adminC.returnOperateResult)

router.get('/showInIndexAdminInfo', adminC.returnIndexAdmin)

/* @author 张嘉凯
 * @date 2023/7/5 @time 15:28
 *  更新配置信息
*/
router.post('/config',  adminC.returnConfig)

module.exports = router
