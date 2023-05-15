const {JsonWebTokenError, adminError} = require('../constant/err.type');
const jwt = require('jsonwebtoken');
const {salt} = require('../config/default');
const {
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
            console.log('jwt.decode(token, salt)')
            console.log(jwt.decode(token, salt))
            const {username} = jwt.decode(token, salt);
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

}

module.exports = new AdminMiddleware();