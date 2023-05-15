//公共数据验证的中间件,传入规则,进行匹配判断
const {FormatError, tokenNotExist} = require('../constant/err.type')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config.default');
const {salt} = require('../config/default');
const Validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (e) {
            console.error(e)
            FormatError.result = e
            return ctx.app.emit('error', FormatError, ctx)
        }
        await next()
    }
}
// 将request中的token解析并挂载
const tokenParams = (ctx, next) => {
    console.log('tokenParams')
    const token = ctx.request.header.token || 'notExist';
// token存在
    if (token) {
        const user = jwt.verify(token, salt)
        /*console.log("user:")
        console.log(user)*/
        // 挂载,放行
        ctx.request.user = user;
        console.log("ctx.request.user:")
        console.log(ctx.request.user)
        next()
    } else {
        ctx.body = {
            code: 201,
            msg: 'token不存在,非法数据',
            success: false,
            result: {}
        }
    }
}
// 解析token,但token可以不存在
const notRequireTokenParams = (ctx, next) => {
    const token = ctx.request.header.token || 'notExist';
// token存在
    if (token.length > 10) {
        const user = jwt.verify(token, salt)
        ctx.request.user = user;
    } else {
        // token不存在
        console.log('token不存在,不用记录用户')
    }
    next()
}


module.exports = {
    Validator,
    tokenParams,
    notRequireTokenParams
}