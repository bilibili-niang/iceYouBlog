const jwt = require('jsonwebtoken');
const path = require('path');
const {
    createUser,
    getUserInfo,
    updateUserToken,
    getUserBaseInfo,
    updateUserInfo,
    getUserBaseInfoAndToken,
    getUserisAdminByEmail,
    updateAvatarByEmail,
    getUserInfoByEmail
} = require('../services/user.service')

const {
    getUserMarkdownData,
} = require('../services/markdownFile.service')

const {
    salt
} = require('../config/default')

const {
    userLoginError, userUpdateError, TokenRefreshError, userParamsError
} = require('../constant/err.type')

class UserController {
    async register(ctx) {
        //TODO: 1.获取数据
        // console.log(ctx.request.body)
        const {username, password, email} = ctx.request.body || '';
        //TODO: 2.操作数据库
        let result = await createUser(username, password, email, ctx.request.body.oldPwd)
        // 失败即为undefined,因为用户名或密码重复
        console.log('注册返回的信息:')
        console.log(result)
        if (result == undefined) {
            ctx.body = {
                code: 201,
                message: '用户注册失败,用户名或密码重复',
                success: false,
                result
            }
        } else {
            ctx.body = {
                code: 200,
                message: '用户注册成功',
                success: true,
                result
            }
        }
    }

    /* @author icestone , 17:02
     * @date 2023/5/8
     * TODO 登录逻辑
    */
    async login(ctx) {
        console.log("---login---")
        const {username} = ctx.request.body || '';
        try {
            const {password, ...result} = await getUserInfo({username})
            const token = result.token;
            // 验证token是否过期
            jwt.verify(token, salt, async function (err, data) {
                const userInf = {
                    id: result.id,
                    email: result.email,
                    username: result.username,
                }
                if (err) {
                    console.log('token过期')
                    // 创建新的token:
                    let newToken = jwt.sign(userInf, salt, {expiresIn: 60 * 60 * 24})
                    const resUserInf = await updateUserToken(result.email, newToken);
                    // 成功返回1
                    if (resUserInf == 1) {
                        // 再次查询
                        const {password, ...result} = await getUserInfo({username})
                        ctx.body = {
                            code: 0,
                            message: '用户登录成功',
                            success: true,
                            result
                        }
                    } else {
                        // token更新失败
                        ctx.body = {
                            code: 0,
                            message: 'token更新失败',
                            success: false,
                            TokenRefreshError
                        }
                    }
                } else {
                    ctx.body = {
                        code: 0,
                        message: '用户登录成功',
                        success: true,
                        result
                    }
                }
            })
        } catch (e) {
            ctx.body = userLoginError;
        }
    }

    // 返回用户信息和用户文章
    async returnUserInfAndMarkdown(ctx) {
        // 通过email获取user表中用户信息
        const resUser = await getUserBaseInfo(ctx.state.user.email);
        const resMarkdown = await getUserMarkdownData(ctx.state.user.email);
        ctx.body = {
            code: 200,
            success: true,
            message: '返回用户信息',
            result: {
                res: resUser,
                markdown: resMarkdown
            }
        }
    }

    // 通过token返回用户信息
    async returnUserInf(ctx) {
        // 通过email获取user表中用户信息
        const resUser = await getUserBaseInfo(ctx.state.user.email);
        ctx.body = {
            code: 200,
            success: true,
            msg: '返回用户信息',
            result: {
                res: resUser
            }
        }
    }

    // 返回用户信息和token
    async returnUserInfAndToken(ctx) {
        // 通过email获取user表中用户信息
        const resUser = await getUserBaseInfoAndToken(ctx.state.user.email);
        ctx.body = {
            code: 200,
            success: true,
            msg: '返回用户信息',
            result: {
                res: resUser
            }
        }
    }

    // 通过用户id修改用户信息:
    async updateUserById(ctx) {
        const res = await updateUserInfo(ctx.state.user.id, ctx.request.body);
        const flag = res[0] || '';
        if (flag == 1) {
            // 为1,修改成功
            ctx.body = {
                code: 200,
                success: true,
                message: '更新成功',
                result: {
                    res
                }
            }
        } else {
            ctx.body = userUpdateError;
        }
    }

    // 更新用户头像
    async updateUserAvatar(ctx) {
        console.log('updateUserAvatar')
        //ctx.request.files.file中的file需要与前端使用的名称保持一致
        const file = ctx.request.files.file
        //传入绝对路径返回的basename为文件名称+拓展名
        const basename = path.basename(file.path)
        const imgPath = '/' + basename;
        console.log("imgPath:")
        console.log(imgPath)
        console.log('用户信息:')
        console.log(ctx.state.user)

        const result = await updateAvatarByEmail(ctx.state.user.email, imgPath)

        ctx.body = {
            code: 200,
            success: true,
            message: '头像上传成功',
            result
        }
    }

    // 查询用户是否为admin
    async returnUserIsAdmin(ctx) {
        console.log('---returnUserIsAdmin---')
        const result = await getUserisAdminByEmail(ctx.state.user.email)
        ctx.body = {
            code: 200,
            message: '获取用户admin信息成功',
            success: true,
            result
        }
    }

    /* @author icestone , 17:12
     * @date 2023/5/11
     * TODO
    */
    async returnUserInfoByEmail(ctx) {
        console.log('---returnUserInfoByEmail---')
        const {email = null} = ctx.request.body;
        console.log("email")
        console.log(email)
        if (email == null) {
            // @date 2023/5/11 , @author icestone
            // TODO 传参错误
            ctx.body = userParamsError;
        } else {
            const result = await getUserInfoByEmail(email, ['avatar']);
            ctx.body = {
                code: 200,
                success: true,
                message: '获取用户头像url',
                result
            }
        }
    }


}

module.exports = new UserController()