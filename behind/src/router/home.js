//网站主页的路由
const Router = require('koa-router')
const {
    returnHomeListById,
    returnSupportResult
} = require('../controller/markdown.controller')
const markdownC=require('../controller/markdown.controller')
const {
    ifAuth
} = require('../middleware/user.middleware');

const router = new Router({prefix: '/home'})

/* @author icestone , 15:31
 * @date 2023/5/5
 * 获取/查询makrkdown首页
*/
router.get('/', markdownC.returnHomeList)

/* @author icestone , 15:32
 * @date 2023/5/5
 * 首页分页查询
*/
router.post('/', returnHomeListById)

/**
 * @Description:
 * @author icestone
 * @date 2023/5/5
 * 点赞
 */
router.post('/support', ifAuth, returnSupportResult)

/* @author 张嘉凯
 * @date 2023/7/31 @time 9:00
 * 查询浏览量
*/
router.post('/allviews', markdownC.returnAllviews)

module.exports = router
