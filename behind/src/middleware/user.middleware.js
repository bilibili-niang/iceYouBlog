const bcrypt = require("bcryptjs");
//用户权限的中间件
const jwt = require("jsonwebtoken");
const md5 = require("md5");
//报错类型
const {
  userFormateError, userDoesNotExist, userLoginError, TokenExpiredError, JsonWebTokenError,
  informationNotAllow, tokenNotExist, openidNotExist
} = require("../constant/err.type");
const {
  findUserByUserNameOrUserEmail,
  getUserInfoByName
} = require("../services/user.service");
const {md5Key, salt} = require("../config/default");


//验证登录
const verifyLogin = async (ctx, next) => {
  //	1.根据用户名查询用户是否存在,不存在则报错:
  let password = ctx.request.body.password || "";
  password = md5(password + md5Key);
  ctx.request.body.password = md5(password + md5Key);
  const username = ctx.request.body.username || "";
  try {
    const res = await getUserInfoByName(username);
    if (!res) {
      console.error("用户名不存在", {username});
      ctx.body = userDoesNotExist;
      return;
    }
    //	2.比对密码,不匹配则报错
    if (password !== res.password) {
      ctx.body = userLoginError;
      return;
    }
  } catch (e) {
    ctx.body = userLoginError;
  }
  //对比密码是否匹配
  await next();
};

// 对前端post的密码进行加密,挂载
const cryptPassword = async (ctx, next) => {
  ctx.request.body.oldPwd = ctx.request.body.password || "";
  // 如果没有,则密码默认为123456
  const {password} = ctx.request.body || "";
  if (ctx.request.body.email < 10 || password < 6) {
    // 密码,邮箱太短或是不存在
    ctx.body = informationNotAllow;
  } else {
    // 密码加密:
    ctx.request.body.password = md5(password + md5Key);
    await next();
  }
};

//验证是否传入username,password
const userValidator = async (ctx, next) => {
  const {username = "", password = ""} = ctx.request.body;
  //	合法性
  if (!username || !password) {
    ctx.body = {
      code: 201,
      success: false,
      message: "用户名或密码为空",
      result: userFormateError
    };
    return;
  }
  await next();
};

//验证用户传来的token是否有用,以及获取其存储的用户信息
const auth = async (ctx, next) => {
  //authorization是需要前端在传输时设置的
  const token = ctx.request.header.token || ctx.request.body.token || null;
  if (token != null) {
    ctx.state.user = jwt.decode(token, salt);
    if (!ctx.state.user) {
      ctx.body = tokenNotExist;
    } else {
      await next();
    }
  } else {
    ctx.body = tokenNotExist;
  }
};

// 如果有token,挂载,不管是否存在token,都放行
const ifAuth = async (ctx, next) => {
  const token = ctx.request.header.token || null;
  if (token != null) {
    ctx.state.user = jwt.decode(token, salt);
  } else {
    ctx.state.user = null;
  }
  await next();
};

// 通过ctx.request.body中的token解析用户信息
const authBybody = async (ctx, next) => {
  const {token} = ctx.request.body || "";
  try {
    ctx.state.user = jwt.decode(token, salt);
  } catch (e) {
    switch (e.name) {
      case "TokenExpiredError":
        // console.error('token 已过期')
        return ctx.app.emit("error", TokenExpiredError, ctx);
      case "JsonWebTokenError":
        // console.error('token 无效')
        return ctx.app.emit("error", JsonWebTokenError, ctx);
    }
  }
  await next();
};

// 根据传来的用户名判断该用户是否注册,如果注册了,直接返回对应的提示
const userExist = async (ctx, next) => {
  const username = ctx.request.body.username || "";
  const useremail = ctx.request.body.useremail || "";
  const res = await findUserByUserNameOrUserEmail(username, useremail);
  if (res.userName != 0 || res.userEmail != 0) {
    ctx.body = {
      code: 201, msg: "账户或邮箱已存在,请更换", success: false, result: {}
    };
  } else {
    next();
  }
};

/**
 * 中间件,判断是否有用户token,如果有,挂载在 ctx.state.user
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
const hasToken = async (ctx, next) => {
  const token = ctx.request.header.token || "";
  ctx.state.user = jwt.decode(token) || false;
  if (!token) {
    console.log("token不存在");
    ctx.body = tokenNotExist;
  }
  await next();
};

/**
 中间件,判断用户的openid是否存在
 @param ctx
 @param next
 @return {Promise<void>}
 */
const openidAuth = async (ctx, next) => {
  const openid = ctx.request.body?.code || "";
  if (!openid) {
    ctx.body = openidNotExist;
  }
  await next();
};

module.exports = {
  verifyLogin,
  cryptPassword,
  userValidator,
  auth,
  userExist,
  hasToken,
  authBybody,
  ifAuth,
  openidAuth
};
