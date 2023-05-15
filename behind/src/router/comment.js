/* @author icestone , 15:40
 * @date 2023/5/8
 * TODO 留言的路由
*/
const Router = require('koa-router')
const {hasToken} = require("../middleware/user.middleware");
const router = new Router({prefix: '/comment'})
const {
    returnAddCommentResult,
    returnAllCommentsById
} = require('../controller/comment.controller');

/* @author icestone , 14:06
 * @date 2023/5/11
 * TODO 通过id和type发布评论
*/
router.post("/addComment", hasToken, returnAddCommentResult)

/* @author icestone , 14:07
 * @date 2023/5/11
 * TODO 通过id获取评论
*/
router.post('/getCommentById', hasToken, returnAllCommentsById)


module.exports = router
