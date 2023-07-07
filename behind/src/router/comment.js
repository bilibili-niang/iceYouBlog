/* @author icestone , 15:40
 * @date 2023/5/8
 * TODO 留言的路由
*/
const Router = require('koa-router')
const { hasToken, auth } = require("../middleware/user.middleware")
const router = new Router({ prefix: '/comment' })
const commentC = require('../controller/comment.controller')

/* @author icestone , 14:06
 * @date 2023/5/11
 * TODO 通过id和type发布评论
*/
router.post("/addComment", hasToken, commentC.returnAddCommentResult)

/* @author icestone , 14:07
 * @date 2023/5/11
 * TODO 通过id获取评论
*/
router.post('/getCommentById',hasToken, commentC.returnAllCommentsById)

/* @author 张嘉凯
 * @date 2023/7/7 @time 12:38
 *  修改评论
*/
router.post('/update', auth, hasToken, commentC.returnUpdate)

module.exports = router
