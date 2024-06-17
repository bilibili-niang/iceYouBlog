//公共数据验证的中间件,传入规则,进行匹配判断
const jwt = require('jsonwebtoken');
const {salt} = require('../config/default');

const verifyParams = (ctx, rules) => {
    for (const key in rules) {
        const value = ctx.request.body[key];
        if (!value && rules[key].required) {
            return new Error(`缺少必要参数: ${key}`);
        }
        if (!value) {
            return new Error(`参数不存在: ${rules[key].type}`);
        }
    }
};

const Validator = (rules) => {
    return async (ctx, next) => {
        try {
            const error = verifyParams(ctx, rules);
            if (error) {
                // 如果验证失败，直接设置错误响应并结束请求
                ctx.body = {
                    success: false,
                    code: 400, // 坏请求
                    msg: error.message,
                    result: {},
                };
                return; // 结束中间件链
            }
        } catch (e) {
            // 这里捕获到的应该是未预料到的异常，也可以直接响应错误
            ctx.body = {
                code: 500, // 内部服务器错误
                msg: '服务器内部错误',
                success: false,
                result: {},
            };
            return;
        }

        await next(); // 如果没有错误，则继续下一个中间件
    };
};

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