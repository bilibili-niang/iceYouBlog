const {
    getUserAllSearchHistory,
    getUserBlogHistoryIds
} = require('../services/history.service')
const {
    getMarkdownFileDetailById
} = require('../services/markdownFile.service')

const history = require('../schema/history')

class HistoryController {
    // 返回用户的搜索记录
    async returnUserAllSearchHistory (ctx) {
        console.log(ctx.state.user)
        const result = await getUserAllSearchHistory(ctx.state.user.email)
        ctx.body = {
            code: 200,
            success: true,
            message: '获取指定用户的所有搜索记录',
            result
        }
    }

// 返回用户一百条浏览记录
    async returnUserAllHistory (ctx) {
        const idList = await getUserBlogHistoryIds(ctx.state.user.email)
        const ids = idList.map(item => {
            return item.fileId
        })
        // 通过上面的id列表获取每个文章id的title等等信息
        const result = await getMarkdownFileDetailById(ids)
        ctx.body = {
            code: 200,
            success: true,
            msg: '用户浏览记录',
            result
        }
    }
}

module.exports = new HistoryController()
