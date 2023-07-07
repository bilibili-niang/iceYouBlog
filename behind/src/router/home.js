//网站主页的路由
const Router = require('koa-router')
const {
    returnHomeList,
    returnHomeListById,
    returnSupportResult
} = require('../controller/markdown.controller')
const {
    ifAuth
} = require('../middleware/user.middleware');

const router = new Router({prefix: '/home'})

/* @author icestone , 15:31
 * @date 2023/5/5
 * 获取/查询makrkdown首页
*/
router.get('/', returnHomeList)

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

module.exports = router
