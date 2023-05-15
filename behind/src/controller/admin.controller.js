const {
    getAllFriendLinks,
    getAddResult
} = require('../services/friend.service')
const {
    getLogs
} = require('../services/admin.service')
const {
    getDeleteResult
} = require('../services/markdownFile.service')

class AdminController {
    // 返回所有友链
    async returnAllFriendLinks(ctx) {
        const result = await getAllFriendLinks();

        ctx.body = {
            code: 200,
            message: '获取所有友链',
            success: true,
            result
        }
    }

    // 增
    async returnAddResult(ctx) {
        const {form} = ctx.request.body;
        console.log("form:")
        console.log(form)
        const result = await getAddResult(form);
        ctx.body = {
            code: 200,
            success: true,
            message: '增加一条友链',
            result
        }

    }

    // @date 2023/5/8 , @author icestone
    // TODO 返回log
    async returnLogs(ctx) {
        console.log('---returnLogs---')
        const {offset = 0} = ctx.request.body;
        console.log(`offset:${offset}`)
        const result = await getLogs(offset);
        ctx.body = {
            code: 200,
            success: true,
            message: '获取logs',
            result
        }
    }

    /* @author icestone , 18:20
     * @date 2023/5/9
     * TODO 对文章进行操作
    */
    async operateMarkdown(ctx) {
        const {
            operate = '',
            ids = ''
        } = ctx.request.body;
        console.log(`ids:${ids},operate:${operate}`)
        if (operate == 'del') {
            console.log('删除')
            const result = await getDeleteResult(ids, ctx.state.user.email)
            ctx.body = {
                code: 200,
                success: true,
                message: '伪删除文章',
                result
            }
        }

    }

}

module.exports = new AdminController();