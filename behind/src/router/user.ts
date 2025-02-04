//用户模块
const Router = require("koa-router")

const UserControllerEle=require("../controller/user.controller")
//controller
const {
    register,
    login,
    returnUserInfAndMarkdown,
    updateUserById,
    returnUserInfAndToken,
    returnUserIsAdmin,
    returnUserInfoByEmail,
    returnUserHeadImg,
    returnUserAllPostedCommented,
  miniLogin
} = new UserControllerEle()

const {
    //验证用户是否存在
    verifyLogin,
    //密码加密加盐
    cryptPassword,
    userValidator,
    auth,
    openidAuth
} = require("../middleware/user.middleware")

const router = new Router({ prefix: "/user" })

//用户注册
router.post("/register", cryptPassword, register)

//用户登录:
router.post("/login", userValidator, verifyLogin, login)

// 获取用户基本信息
router.post("/userInf", auth, returnUserInfAndMarkdown)

// 更新用户自定义信息
router.post("/updateUserInf", auth, updateUserById)

// 通过token获取用户信息
router.post("/getUserInfByToken", auth, returnUserInfAndToken)

// 查询用户是否为admin
router.post("/isAdmin", auth, returnUserIsAdmin)

// 通过email获取给第三方看的用户信息
router.post("/getUserInfoByEmail", returnUserInfoByEmail)
/* @author icestone , 17:17
 * @date 2023/5/27
 *  获取用户头图
*/
router.post("/headImg", auth, returnUserHeadImg)

/*
 *  根据email获取该用户的所有评论
*/
router.post("/getUserAllPostedComments", auth, returnUserAllPostedCommented)

/**
 * 将发起请求的用户设为admin
 */
router.post("/becomeAdmin", auth)
router.post("/becomeAdmin",)

/**
 * 微信用户登录接口
 */
router.post("/miniLogin", openidAuth, miniLogin)

module.exports = router
