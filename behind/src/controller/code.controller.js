const {
    newCodeClips,
    getCodeClips,
    delCodeClipsById,
    getCodeClipsData,
    getCodeByKeyWord
} = require('../services/code.service')
const { codeClipsDelError, codeClipsIdError, searchKeyWordNotExist } = require('../constant/err.type')
const jwt = require('jsonwebtoken')
const { salt } = require('../config/default')
const { insertSearchHistory } = require('../services/history.service')

class CodeController {
    async returnNewCOde (ctx) {
        const { title, tag1, tag2, tag3, content, description } = ctx.request.body
        const result = await newCodeClips(ctx.state.user.email, { title, tag1, tag2, tag3, content, description })
        ctx.body = {
            code: 200,
            success: true,
            message: '新建codeClips成功',
            result,
        }
    }

    // 返回codeClips查询信息
    async returnCodeClips (ctx) {
        const result = await getCodeClips()
        ctx.body = {
            code: 200,
            success: true,
            message: '返回 codeClips 信息',
            result
        }
    }

    // 通过id删除:
    async returnDelCodeClips (ctx) {
        const id = ctx.request.body.id || - 1
        if (id != - 1) {
            const result = await delCodeClipsById(id)
            ctx.body = {
                code: 200,
                message: '删除数据',
                success: true,
                result
            }
        } else {
            ctx.body = codeClipsDelError
        }
    }

    // 通过id返回具体codeClips的数据
    async returnCodeClipsData (ctx) {
        const id = ctx.request.body.id || - 1

        if (id != - 1) {
            const result = await getCodeClipsData(id)
            ctx.body = {
                code: 200,
                message: '返回codeClips数据',
                success: true,
                result
            }
        } else {
            ctx.body = codeClipsIdError
        }
    }

// 返回搜索结果
    async returnSearchResult (ctx) {
        const key = ctx.request.body.key || 'null'
        const token = ctx.request.header.token || null
        if (token && key != 'null') {
            const { email = null } = jwt.decode(token, salt)
            console.log("email:")
            console.log(email)
            if (email) {
                console.log('用户存在,写入历史')
                await insertSearchHistory(email, key)
            }
        }

        if (key == null) {
            ctx.body = searchKeyWordNotExist
        } else {
            const result = await getCodeByKeyWord(key)
            ctx.body = {
                code: 200,
                success: true,
                message: '通过关键字查询文章信息',
                result
            }
        }
    }

}

module.exports = new CodeController()
