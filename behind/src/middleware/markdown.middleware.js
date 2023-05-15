const {
    viewIncreaseById,
    historyByToken
} = require('../services/markdownFile.service');
const {articleOperateError} = require("../constant/err.type");
// 根据id,文章的浏览量自增+1,并根据token记录用户的浏览记录
const viewCountIncrease = async (ctx, next) => {
    next();
    const id = ctx.request.body.id || 0;
    await viewIncreaseById(id)
}

// 根据用户token增加其浏览记录:
const historyByIdAndToken = async (ctx, next) => {
    const token = ctx.request.header.token || '';
    const id = ctx.request.body.id || 0;
    await historyByToken(id, token);
    console.log('historyByIdAndToken')
    next();
}

/**
 * @Description:
 * @author icestone
 * @date 2023/5/4
 * TODO 判断传参是否有 operate
 */
const hasOperateAdnIds = async (ctx, next) => {
    const {operate = 'no', ids = null} = ctx.request.body;
    if (operate != "no" & ids != null) {
        // @date 2023/5/4 , @author icestone
        // TODO 存在operate,挂载
        ctx.state.operate = operate;
        ctx.state.ids = ids;
        await next();
    } else {
        // 传参错误
        ctx.body = articleOperateError;
    }
}

module.exports = {
    viewCountIncrease,
    historyByIdAndToken,
    hasOperateAdnIds
}