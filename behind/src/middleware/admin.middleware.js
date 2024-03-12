const {JsonWebTokenError, adminError} = require("../constant/err.type");
const jwt = require("jsonwebtoken");
const {salt} = require("../config/default");
const {
  getIsAdminById
} = require("../services/user.service");


class AdminMiddleware {
  /* @author icestone , 14:36
   * @date 2023/5/9
   *  用户是否为admin用户的中间件
  */
  async isAdmin(ctx, next) {

    const {username = null} = ctx.state.user;
    const isAdminFlag = await getIsAdminById(username);
    console.log("isAdminFlag:");
    console.log(isAdminFlag);
    if (isAdminFlag) {
      // admin用户
      await next();
    } else {
      ctx.body = adminError;

    }
  }

  /* @author icestone , 10:02
   * @date 2023/5/18
   *  验证参数
   * 验证成功返回0,反之不成功
  */
  paramsVerify(verify, ctx) {
    const keys = Object.keys(verify);
    let flag = 0;
    keys.map(item => {
      const type = verify[item].type || null;
      // @date 2023/5/18 , @author icestone
      //  动态获取
      // user 从 ctx.state.user 上获取
      if (type == "user") {
        const nowVal = ctx.state.user[item];
        if (!nowVal) {
          // @date 2023/5/18 , @author icestone
          //  如果目标不存在
          if (verify[item].allowNull || null) {
            // @date 2023/5/18 , @author icestone
            //  如果允许不存在
          } else {
            // @date 2023/5/18 , @author icestone
            //  如果不允许不存在,报错
            flag = {
              code: 300,
              message: "传参参数错误",
              success: false,
              result: "传参错误"
            };
          }
        }
      } else {
        const nowVal = ctx.request.body[item] || null;
        if (!nowVal) {
          // @date 2023/5/18 , @author icestone
          //  如果目标不存在
          if (verify[item].allowNull || false == false) {
            // @date 2023/5/18 , @author icestone
            //  如果允许不存在
            if (nowVal == null) {
              flag = {
                code: 300,
                message: "传参参数错误",
                success: false,
                result: "传参错误"
              };
            } else {
            }
          } else {
            // @date 2023/5/18 , @author icestone
            //  如果不允许不存在,报错
            flag = {
              code: 300,
              message: "传参参数错误",
              success: false,
              result: "传参错误"
            };
          }
        } else {
        }
      }
    });
    return flag;
  }
}

module.exports = new AdminMiddleware();
