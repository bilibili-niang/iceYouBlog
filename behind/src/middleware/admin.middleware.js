const {JsonWebTokenError, adminError} = require('../constant/err.type');
const jwt = require('jsonwebtoken');
const {salt} = require('../config/default');
const {
    getUserisAdminByEmail,
    getIsAdminById
} = require('../services/user.service');


class AdminMiddleware {
    /* @author icestone , 14:36
     * @date 2023/5/9
     * TODO 用户是否为admin用户的中间件
    */
    async isAdmin(ctx, next) {
        console.log('---isAdmin---')
        const token = ctx.request.header.token || null;
        if (token.length <= 10) {
            ctx.body = JsonWebTokenError;
            return
        } else {
            const {username = null} = jwt.decode(token, salt);
            const isAdminFlag = await getIsAdminById(username);
            if (isAdminFlag) {
                // admin用户
                await next();
            } else {
                ctx.body = adminError;
                return
            }
        }
    }

    /* @author icestone , 10:02
     * @date 2023/5/18
     * TODO 验证参数
     * 验证成功返回0,反之不成功
    */
    paramsVerify(verify, ctx) {
        console.log("---paramsVerify---")
        const keys = Object.keys(verify);
        let flag = 0;
        keys.map(item => {
            const type = verify[item].type || null;
            // @date 2023/5/18 , @author icestone
            // TODO 动态获取
            // user 从 ctx.state.user 上获取
            if (type == 'user') {
                const nowVal = ctx.state.user[item]
                if (!nowVal) {
                    // @date 2023/5/18 , @author icestone
                    // TODO 如果目标不存在
                    if (verify[item].allowNull || null) {
                        // @date 2023/5/18 , @author icestone
                        // TODO 如果允许不存在
                    } else {
                        // @date 2023/5/18 , @author icestone
                        // TODO 如果不允许不存在,报错
                        console.log("传参错误")
                        flag = {
                            code: 300,
                            message: "传参参数错误",
                            success: false,
                            result: "传参错误"
                        }
                    }
                }
            } else {
                const nowVal = ctx.request.body[item] || null;
                console.log(`nowVal:${nowVal}`)
                console.log(`verify[item]:`)
                console.log(verify[item])
                if (!nowVal) {
                    // @date 2023/5/18 , @author icestone
                    // TODO 如果目标不存在
                    if (verify[item].allowNull || false == false) {
                        // @date 2023/5/18 , @author icestone
                        // TODO 如果允许不存在
                        console.log('不允许为空')
                        console.log(`nowVal:${nowVal}`)
                        if (nowVal == null) {
                            console.log('目标值为空,但是不允许,报错')
                            flag = {
                                code: 300,
                                message: "传参参数错误",
                                success: false,
                                result: "传参错误"
                            }
                        } else {
                        }
                    } else {
                        // @date 2023/5/18 , @author icestone
                        // TODO 如果不允许不存在,报错
                        console.log("传参错误")
                        flag = {
                            code: 300,
                            message: "传参参数错误",
                            success: false,
                            result: "传参错误"
                        }
                    }
                } else {
                }
            }
        })
        return flag;
    }
}

module.exports = new AdminMiddleware();