const { commentNotAllow, commentIdParameterNotAllow, commentError, commentUserError } = require("../constant/err.type")
const {
    addComment,
    getCommentById
} = require('../services/comment.service')
const {
    getUserInfoByEmail
} = require('../services/user.service')
const commendS = require('../services/comment.service')

class CommentController {
    /* @author icestone , 14:07
     * @date 2023/5/11
     * 创建评论
    */
    async returnAddCommentResult (ctx) {
        const {
            id = 0,
            type = 'blog',
            content = '',
            user = {
                name: '无名之辈'
            }
        } = ctx.request.body

        // @date 2023/5/10 , @author icestone
        // content,id 不为空才写入
        if (content && id) {
            if (ctx.state.user) {
                // @date 2023/5/10 , @author icestone
                // 有用户
                const result = await addComment(id, type, content, ctx.state.user.username, ctx.state.user.email)
                ctx.body = {
                    code: 200,
                    success: true,
                    message: '评论成功,当前有用户登录',
                    result
                }
            } else {
                console.log('无用户登录')
                console.log('传入的用户名:')
                console.log(user.name)
                // 无用户登录
                const result = await addComment(id, type, content, user.name)
                ctx.body = {
                    code: 200,
                    success: true,
                    message: '评论成功,当前没有用户登录',
                    result
                }
            }
        } else {
            // @date 2023/5/10 , @author icestone
            // 报错,内容与id为空
            ctx.body = commentNotAllow
        }
    }

    /* @author icestone , 14:08
     * @date 2023/5/11
     * 返回评论
    */
    async returnAllCommentsById (ctx) {
        const { id = 0 } = ctx.request.body
        if (id == 0) {
            // @date 2023/5/11 , @author icestone
            // 传参错误
            ctx.body = commentIdParameterNotAllow
        } else {
            let result = await getCommentById(id)
            ctx.body = {
                code: 200,
                success: true,
                message: '获取评论',
                result: result
            }
        }

    }

    /* @author 张嘉凯
     * @date 2023/7/7 @time 12:39
     *  更新
    */
    async returnUpdate (ctx) {
        const { data = null } = ctx.request.body
        console.log(data)
        if (data) {
            const { id = null, content = null } = data
            if (id && content) {
                const commentInfo = await commendS.getInfo(id, ['email'])
                if (commentInfo[0].email === ctx.state.user.email) {
                    const result = await commendS.updateById(id, content)
                    ctx.body = {
                        code: 200,
                        success: true,
                        message: '评论修改',
                        result
                    }
                } else {
                    ctx.body = commentUserError
                }
            } else {
                ctx.body = commentError
            }
        } else {
            ctx.body = commentError
        }
    }
}

module.exports = new CommentController()
