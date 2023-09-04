const comment = require("../schema/comment")
const { getUserInfoByEmail } = require("./user.service")

class CommentService {
    /* @author icestone , 14:15
     * @date 2023/5/11
     *  根据传参创建评论
    */
    async addComment (id, type, content, nickName = '无名之辈', email) {
        console.log('nickName')
        console.log(nickName)
        return await comment.create({
            from: id,
            type,
            content,
            nickName,
            email
        })
    }

    /* @author icestone , 14:16
     * @date 2023/5/11
     * 根据关联id返回评论,这里需要查询的id是from字段
    */
    async getCommentById (id, attr = ['id', 'nickName', 'email', 'webSite', 'content', 'type']) {
        return await comment.findAll({
            attributes: attr,
            where: {
                from: id
            },
            order: [
                // 我们从要排序的模型开始排序数组
                ['id', 'DESC']
            ],
            raw: true
        })
    }

    /* @author 张嘉凯
     * @date 2023/7/7 @time 14:15
     *  更新
    */
    async updateById (id, content) {
        return await comment.update({
            content
        }, {
            where: {
                id
            }
        })
    }

    /* @author 张嘉凯
     * @date 2023/7/7 @time 14:48
     *  通过id获取评论信息
    */
    async getInfo (id, attributes) {
        return await comment.findAll({
            attributes,
            where: { id },
            raw: true
        })
    }

}

module.exports = new CommentService()
