const {
    newCodeClips,
    getCodeClips,
    delCodeClipsById,
    getCodeClipsData
} = require('../services/code.service');
const {codeClipsDelError, codeClipsIdError} = require('../constant/err.type');

class CodeController {
    async returnNewCOde(ctx) {
        const {title, tag1, tag2, tag3, content, description} = ctx.request.body;
        const result = await newCodeClips(ctx.state.user.email, {title, tag1, tag2, tag3, content, description})
        ctx.body = {
            code: 200,
            success: true,
            message: '新建codeClips成功',
            result,
        }
    }

    // 返回codeClips查询信息
    async returnCodeClips(ctx) {
        const result = await getCodeClips();
        ctx.body = {
            code: 200,
            success: true,
            message: '返回 codeClips 信息',
            result
        }
    }

    // 通过id删除:
    async returnDelCodeClips(ctx) {
        const id = ctx.request.body.id || -1;
        if (id != -1) {
            const result = await delCodeClipsById(id);
            ctx.body = {
                code: 200,
                message: '删除数据',
                success: true,
                result
            }
        } else {
            ctx.body = codeClipsDelError;
        }
    }

    // 通过id返回具体codeClips的数据
    async returnCodeClipsData(ctx) {
        const id = ctx.request.body.id || -1;

        if (id != -1) {
            const result = await getCodeClipsData(id);
            ctx.body = {
                code: 200,
                message: '返回codeClips数据',
                success: true,
                result
            }
        } else {
            ctx.body = codeClipsIdError;
        }
    }

}

module.exports = new CodeController();