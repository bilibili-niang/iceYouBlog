const jwt = require("jsonwebtoken");
const path = require("path");
const {
  createUser,
  getUserInfo,
  updateUserToken,
  getUserBaseInfo,
  updateUserInfo,
  getUserBaseInfoAndToken,
  getUserisAdminByEmail,
  createHeadImgByEmail,
  getUserInfoByEmail,
  getUserHeadImg,
  getUserAllComments,
  updateUserAvatar
} = require("../services/user.service");

const userS = require("../services/user.service");
const {
  getUserMarkdownData,
} = require("../services/markdownFile.service");

const {
  salt, md5Key
} = require("../config/default");

const {
  userLoginError, userUpdateError, TokenRefreshError, userParamsError
} = require("../constant/err.type");
const {getShowInIndexAdminUser} = require("../services/admin.service");
const errType = require("../constant/err.type");
const axios = require("axios");
const md5 = require("md5");

class UserController {
  async register(ctx) {
    // 1.获取数据
    // console.log(ctx.request.body)
    const {username, password, email} = ctx.request.body || "";
    // 2.操作数据库
    let result = await createUser(username, password, email, ctx.request.body.oldPwd);
    // 失败即为undefined,因为用户名或密码重复
    console.log("注册返回的信息:");
    console.log(result);
    if (result == undefined) {
      ctx.body = {
        code: 201,
        message: "用户注册失败,用户名或密码重复",
        success: false,
        result
      };
    } else {
      ctx.body = {
        code: 200,
        message: "用户注册成功",
        success: true,
        result
      };
    }
  }

  /* @author icestone , 17:02
   * @date 2023/5/8
   * 登录逻辑
  */
  async login(ctx) {
    const {username} = ctx.request.body || "";
    try {
      const {password, ...result} = await getUserInfo({username});
      const token = result.token;
      // 验证token是否过期
      jwt.verify(token, salt, async function (err, data) {
        const userInf = {
          id: result.id,
          email: result.email,
          username: result.username,
        };
        if (err) {
          console.log("token过期");
          // 创建新的token:
          let newToken = jwt.sign(userInf, salt, {expiresIn: 60 * 60 * 24});
          const resUserInf = await updateUserToken(result.email, newToken);
          // 成功返回1
          if (resUserInf == 1) {
            // 再次查询
            const {password, ...result} = await getUserInfo({username});
            ctx.body = {
              code: 0,
              message: "用户登录成功",
              success: true,
              result
            };
          } else {
            // token更新失败
            ctx.body = {
              code: 0,
              message: "token更新失败",
              success: false,
              TokenRefreshError
            };
          }
        } else {
          ctx.body = {
            code: 0,
            message: "用户登录成功",
            success: true,
            result
          };
        }
      });
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
      message: "返回用户信息",
      result: {
        res: resUser,
        markdown: resMarkdown
      }
    };
  }

  // 通过token返回用户信息
  async returnUserInf(ctx) {
    // 通过email获取user表中用户信息
    const resUser = await getUserBaseInfo(ctx.state.user.email);
    ctx.body = {
      code: 200,
      success: true,
      msg: "返回用户信息",
      result: {
        res: resUser
      }
    };
  }

  // 返回用户信息和token
  async returnUserInfAndToken(ctx) {
    // 通过email获取user表中用户信息
    const resUser = await getUserBaseInfoAndToken(ctx.state.user.email);
    ctx.body = {
      code: 200,
      success: true,
      msg: "返回用户信息",
      result: {
        res: resUser
      }
    };
  }

  // 通过用户id修改用户信息:
  async updateUserById(ctx) {
    const res = await updateUserInfo(ctx.state.user.id, ctx.request.body);
    const flag = res[0] || "";
    if (flag == 1) {
      // 为1,修改成功
      ctx.body = {
        code: 200,
        success: true,
        message: "更新成功",
        result: {
          res
        }
      };
    } else {
      ctx.body = userUpdateError;
    }
  }

  // 更新用户头像
  async updateUserAvatar(ctx) {
    console.log("updateUserAvatar");
    //ctx.request.files.file中的file需要与前端使用的名称保持一致
    const file = ctx.request.files.file;
    //传入绝对路径返回的basename为文件名称+拓展名
    const basename = path.basename(file.path);
    const imgPath = "/" + basename;
    const result = await createHeadImgByEmail(ctx.state.user.email, imgPath);
    await updateUserAvatar(ctx.state.user.email, imgPath);
    console.log("返回的用户头像:");
    console.log(result.dataValues);
    ctx.body = {
      code: 200,
      success: true,
      message: "用户头图上传成功",
      result
    };
  }

  // 查询用户是否为admin
  async returnUserIsAdmin(ctx) {
    console.log("---returnUserIsAdmin---");
    const result = await getUserisAdminByEmail(ctx.state.user.email);
    ctx.body = {
      code: 200,
      message: "获取用户admin信息成功",
      success: true,
      result
    };
  }

  /* @author icestone , 17:12
   * @date 2023/5/11
   *
  */
  async returnUserInfoByEmail(ctx) {
    const {email = null, type = null} = ctx.request.body;
    if (email == null) {
      // @date 2023/5/11 , @author icestone
      // 传参错误
      ctx.body = userParamsError;
    } else if (email == "admin") {
      const result = await getShowInIndexAdminUser(["id", "email", "username", "avatar", "occupation", "githubUrl", "word"]);
      ctx.body = {
        code: 200,
        success: true,
        message: "获取admin用户信息",
        result
      };
    } else {
      if (type == null) {
        const result = await getUserInfoByEmail(email, ["avatar"]);
        ctx.body = {
          code: 200,
          success: true,
          message: "获取用户头像url",
          result
        };
      } else if (type == "all") {
        const result = await getUserInfoByEmail(email, ["username", "avatar", "occupation", "githubUrl", "word"]);
        ctx.body = {
          code: 200,
          success: true,
          message: "获取用户头像url",
          result
        };
      }

    }
  }

  // 返回用户头图
  async returnUserHeadImg(ctx) {
    console.log("ctx.state:");
    console.log(ctx.state);
    const result = await getUserHeadImg(ctx.state.user.email);
    ctx.body = {
      code: 200,
      success: true,
      message: "获取用户头图",
      result
    };
  }

  /* @author icestone , 14:44
   * @date 2023/6/4
   * 返回该用户的评论
  */
  async returnUserAllPostedCommented(ctx) {
    const result = await getUserAllComments(ctx.state.user.email, "blog");
    ctx.body = {
      code: 200,
      success: true,
      message: "返回指定email的所有评论",
      result
    };
  }

  /**
   * 微信用户登录
   */
  async miniLogin(ctx) {
    const {code = null} = ctx.request.body;
    if (!code) {
      ctx.body = errType.userParamsError;
    } else {
      const url = "https://api.weixin.qq.com/sns/jscode2session?appid=wxe8c43d9db3e1333a&secret=ea9f32f40f8e0697e7762372cdad328c" + "&js_code=" + code + "&grant_type=authorization_code";
      // 通过微信服务器获取用户openId1
      const result = await axios({
        method: "get",
        url: url
      });
      // TODO 这里可以获取到openid
      const openid = result.data.openid;
      console.log("openid", openid);

      let userInfo = await userS.loginByOpenId({openid});
      // 为空,创建用户
      // 默认密码123456
      if (!userInfo) {
        userInfo = await userS.createUser(
          `微信用户${Math.random(100)}`,
          md5("123456" + md5Key),
          "null",
          "123456",
          openid
        );
      }
      console.log("userInfo", userInfo);

      ctx.body = {
        code: 200,
        message: "微信用户登录",
        success: true,
        result: userInfo
      };
    }
  }
}

module.exports = new UserController();
