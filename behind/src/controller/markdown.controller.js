const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/config.default");
const cheerio = require("cheerio");
const TurndownService = require("turndown");
let turndownService = new TurndownService();

const {
  getUserInfoByEmail
} = require("../services/user.service");

const {
  updateMarkdownByEmail,
  getUserEmailByMarkdownId,
  getDeletedFiles
} = require("../services/markdownFile.service");

const {
  createMarkdownFile,
  getHomeIndexList,
  viewIncreaseById,
  historyByToken,
  getHomeIndexListById,
  getMarkdownByKeyWord,
  getAllUserMarkdownFiles,
  supportIncrease,
  getMarkdownFileDetailById,
  getDeleteResult,
  getRecoverResult,
  getAlreadyDetailById,
  getAllCounts,
  getAllTagsByEmail,
  UpdateSomething,
  setRecommendByType,
  getRecommendMarkdownFile,
  getMarkdownByEmail,
  getTopArticleByEmail
} = require("../services/markdownFile.service");
const markdownS = require("../services/markdownFile.service");
const {
  removeFile,
  checkImgType
} = require("../services/tool.service");

const {saveImageInfo} = require("../services/image.service");
const markdownFile = require("../schema/markdownFile");
const https = require("https");
const {salt} = require("../config/default");
const {
  userDontHaveArticle,
  notExistFile, searchKeyWordNotExist, articleOperateError
} = require("../constant/err.type");
const {
  insertSearchHistory
} = require("../services/history.service");
const {
  logHistoryByEmail
} = require("../services/history.service");
const path = require("path");
const {paramsVerify} = require("../middleware/admin.middleware");
const fs = require("fs");


class MarkdownController {
  async newFile(ctx) {
    const {authorization} = ctx.request.header;
    const token = authorization.replace("Bearer ", "");
    //解析token
    const {username, userEmail} = jwt.verify(token, JWT_SECRET);
    const requestData = ctx.request.body;
    console.log("requestData:");
    console.log(requestData);
    const res = await createMarkdownFile(userEmail, requestData);
    ctx.body = {
      code: 0, message: "用户创建文章成功", result: res,
    };
  }

  //返回首页的二十条数据
  async returnHomeList(ctx) {
    const {pageNum = 1, pageSize = 20} = ctx.request.query;
    const result = await getHomeIndexList(pageNum, pageSize);
    ctx.body = {
      code: 200,
      success: true,
      message: "查询首页数据",
      result
    };
  }

  // 通过id查询文章
  getMarkdownDataById = async function (ctx) {
    // 浏览量自增
    await viewIncreaseById(ctx.request.body.id);
    // 通过用户token写入历史记录
    const token = ctx.request.header.token || "";
    // 不存在时返回id为0的文章
    const id = ctx.request.body.id || 0;
    const res = await getMarkdownFileDetailById(id, ["url", "email", "id", "title", "createdAt", "description", "tag1", "tag2", "tag3", "view", "content", "headImg", "updatedAt"]);
    if (!res.length) {
      // 该文章数据不存在,返回错误信息:
      ctx.body = notExistFile;
    } else {
      // @date 2023/5/8 , @author icestone
      // token存在,写入历史记录
      if (token) {
        historyByToken(res, token);
      } else {
      }
      const ownerEmail = res[0].email || "";
      const userInf = await getUserInfoByEmail(ownerEmail, ["email", "username", "is_admin", "avatar", "occupation", "githubUrl", "word", "updatedAt"]);
      if (res[0].url) {
        if (!res[0].content) {
          let config = {
            html: "", json: {}
          };
          let url = res[0].url || "";
          https.get(url, res => {
            res.on("data", function (chunk) {
              config.html += chunk;
            });
            res.on("end", () => {
              // 传入cheerio
              const $ = cheerio.load(config.html);
              const ele = $("#content_views");
              config.html = ele.html();
              config.html = turndownService.turndown(config.html);
              markdownFile.update({
                content: config.html
              }, {
                where: {
                  id
                }
              })
                .then(r => {
                  console.log("success");
                })
                .catch(e => {
                  console.log("fail");
                });
            });
          });
          const res2 = await markdownFile.findAll({
            attributes: {exclude: ["createdAt", "source", "states", "headImg"]},
            raw: true,
            where: {id}
          });
          ctx.body = {
            code: 200,
            message: "查询首页数据",
            success: true,
            result: res2[0],
            userInf: userInf
          };
        } else {
          // 获取文章创建者的avatar,occupation(职业)
          ctx.body = {
            code: 200,
            message: "查询首页数据",
            success: true,
            result: res[0],
            userInf
          };
        }
      } else {
        ctx.body = {
          code: 200,
          message: "查询单个文章数据",
          success: true,
          result: res[0],
          userInf
        };
      }
    }
  };

  // 通过用户信息返回该用户的文章:
  async returnUserArticle(ctx) {
    const token = ctx.request.header.token || "notExist";
    // 如果token不存在或者token太短,直接返回
    if (token.length < 10) {
      ctx.body = {
        code: 201, msg: "token不存在或非法数据", success: false, result: {}
      };
    } else {
      const user = jwt.verify(token, salt);
      // 分页开始的id
      let sequence = parseInt(ctx.request.body.sequence || 0);
      // 分页开始id无法为负,如果小于0,则为0
      sequence = sequence < 0 ? 0 : sequence;
      // 分页数量,默认为20
      let sequenceSize = parseInt(ctx.request.body.sequenceSize || 20);
      // 分页数量不能小于20,如果小于20,为20
      sequenceSize = sequenceSize < 20 ? 20 : sequenceSize;
      // 不能大于50
      sequenceSize = sequenceSize > 50 ? 20 : sequenceSize;

      // const email = ctx.request.user.email || '';
      const email = user.email || "";
      if (email.length > 10) {
        // const res = await getMarkdownByEmail(email);
        const res = await markdownFile.findAll(// const res = await markdownFile.findAndCountAll(
          {
            attributes: ["id", "title", "email", "description", "view", "praise", "headImg"], where: {
              email
            }, raw: true, limit: sequenceSize, offset: sequence,
            order: [
              // 我们从要排序的模型开始排序数组
              ["id", "DESC"]
            ]
          });
        ctx.body = {
          code: 200, mag: "get data success", success: true, result: res
        };
      } else {
        ctx.body = {
          code: 201, mag: "email error", success: false, result: {}
        };
      }
    }
  }

  // 返回用户文章分页接口
  async returnUserAllArticle(ctx) {
    console.log("returnUserAllArticle--->");
    const {
      limit = 20,
      id = 0
    } = ctx.request.body;
    const result = await getAllUserMarkdownFiles(ctx.state.user.email, limit, id);
    if ((await result).length == 0) {
      // @date 2023/5/10 , @author icestone
      // 为空,用户没有文章
      ctx.body = userDontHaveArticle;
    } else {
      // 有文章
      ctx.body = {
        code: 200,
        message: "您的所有文章",
        success: true,
        result
      };
    }
  }

  // 通过前端传来的id,返回文章数据,无法指定数据条数,每次返回20条
  async returnHomeListById(ctx) {
    let {id = -1, limit = 20} = ctx.request.body;
    id = parseInt(id) - 1;
    id = id > 0 ? id : 0;
    // @date 2023/5/5 , @author icestone
    // id 为跳过的数量,limit 为查询数量
    const result = await getHomeIndexListById(id, limit);
    ctx.body = {
      code: 200,
      success: true,
      message: "查询成功",
      result
    };
  }

  // 通过挂载在 ctx.form 上的文章信息和挂载在 ctx.state.user 上面的用户信息新建文章
  async newMarkdown(ctx) {
    // token
    const token = ctx.request.header.token || "";
    ctx.state.user = jwt.decode(token);
    if (JSON.stringify(token).length < 10) {
      ctx.body = {
        code: 201
      };
    } else {
      let form = {};
      form = {
        title: ctx.request.body.title || "",
        content: ctx.request.body.content || "",
        description: ctx.request.body.desc || "",
        tag1: ctx.request.body.tag1 || "",
        tag2: ctx.request.body.tag2 || "",
        tag3: ctx.request.body.tag3 || ""
      };
      // ctx.form = form;
      // const form = ctx.request.body;
      let flag = false;
      const res = await markdownFile.create({
        email: ctx.state.user.email || "admin@email",
        title: form.title,
        content: form.content,
        states: 1,
        // postTime: new Date(),
        description: form.desc,
        audit: 1,
        tag1: form.tag1,
        tag2: form.tag2,
        tag3: form.tag3,
        type: "blog",
        // 2表示该文章为原创,不需要爬取
        hasOriginal: 2
      });

      if (JSON.stringify(res).length > 5) {
        // success
        flag = !flag;
      }
      ctx.body = {
        code: 200,
        message: "成功success为true,反之false",
        success: flag,
        res: {
          result: res
        }
      };
    }
  }

  // 更新文章
  async getUpdateResult(ctx) {
    const {markdownData = null} = ctx.request.body;
    if (markdownData == null) {
      return;
    } else {
      // 通过 markdownData 查询该文章的email是否为该 ctx.state.user 中的email
      const email = await getUserEmailByMarkdownId(markdownData.id);
      // @date 2023/5/7 , @author icestone
      // token中的email与该文章的email一致,可以修改
      if (ctx.state.user.email == email.email) {
        const res = await updateMarkdownByEmail(markdownData);
        ctx.body = {
          code: 200,
          success: true,
          res
        };
      } else {
        // 并非发布者的邮箱
        ctx.body = {
          code: 200,
          success: false,
          message: "不是你的文章"
        };
      }
    }
  }

  // 搜索
  async returnSearchResult(ctx) {
    const key = ctx.request.body.key || "null";
    const token = ctx.request.header.token || null;
    if (token && key != "null") {
      const {email = null} = jwt.decode(token, salt);
      if (email) {
        await insertSearchHistory(email, key);
      }
    }
    if (key == null) {
      ctx.body = searchKeyWordNotExist;
    } else {
      const result = await getMarkdownByKeyWord(key);
      ctx.body = {
        code: 200,
        success: true,
        message: "通过关键字查询文章信息",
        result
      };
    }
  }

  // 点赞
  async returnSupportResult(ctx) {

    const {id = 0} = ctx.request.body;
    if (ctx.state.user != null) {
      // 存在用户
      // 写入记录

      await logHistoryByEmail(id, ctx.state.user.email);
      const result = await supportIncrease(id);
      ctx.body = {
        code: 200,
        message: "点了个赞,并且已记录该用户点赞",
        success: true,
        result
      };
    } else {
      // 不存在用户
      const result = await supportIncrease(id);
      ctx.body = {
        code: 200,
        message: "点了个赞,而且成功了",
        success: true,
        result
      };
    }
  }

  // 对文章进行操作
  async returnOperateResult(ctx) {

    const {email} = ctx.state.user;
    // 根据ids查询文章的email信息是否属于该操作用户
    const attr = ["id", "email"];

    // @date 2023/5/5 , @author icestone
    // 这里查询的是没有被删除的普通文章
    const idsResult = await getMarkdownFileDetailById(ctx.state.ids, attr);

    /**
     * @Description:
     * @author icestone
     * @date 2023/5/3
     * 获取ids中email和当前操作用户email相同的id,后续进行删除
     */
    const ableOperatelIds = idsResult.map((item) => {
      if (item.email == email) {
        return item.id != undefined ? item.id : null;
      } else {
      }
    });
    if (ctx.state.operate == "del") {
      /**
       * @Description:
       * @author icestone
       * @date 2023/5/3
       * 传入数组伪删除,此时可能有为 undefined 的值
       */
      const result = await getDeleteResult(ableOperatelIds, ctx.state.user.email);
      // 传参正确,可以删除
      ctx.body = {
        code: 200,
        success: true,
        message: `文章${ctx.state.operate}成功`,
        result
      };
    } else if (ctx.state.operate == "recover") {
      // @date 2023/5/5 , @author icestone
      // 这里应该查询的是被删除的文章数据
      const idsResult = await getAlreadyDetailById(ctx.state.ids, attr);
      /**
       * @Description:
       * @author icestone
       * @date 2023/5/5
       * 过滤
       */
      const ableOperatelIds = idsResult.map((item) => {
        if (item.email == email) {
          return item.id != undefined ? item.id : null;
        } else {
        }
      });

      const result = await getRecoverResult(ableOperatelIds, ctx.state.user.email);
      ctx.body = {
        code: 200,
        success: true,
        message: `文章${ctx.state.operate}成功`,
        result
      };
    } else {
      // 传参错误
      ctx.body = articleOperateError;
    }
  }

  // 获取用户已删除的文章
  async returnDeletedFiles(ctx) {

    const {email} = ctx.state.user;

    const result = await getDeletedFiles(email);
    ctx.body = {
      code: 200,
      message: "查看已删除文章",
      success: true,
      result
    };
  }

  /**
   * @Description:
   * @author icestone
   * @date 2023/5/5
   * 返回文章总数,用作分页
   */
  async returnAllCounts(ctx) {
    const result = await getAllCounts();
    // @date 2023/5/5 , @author icestone
    // 分页处理,返回前端的直接是处理好的多少页
    /*if (parseInt(result.count / 20) < result.count) {
        result.count = parseInt(result.count / 20) + 1;
    } else {
        result.count = parseInt(result.count / 20);
    }*/
    ctx.body = {
      code: 200,
      success: true,
      message: "获取文章总数",
      result: result.count
    };
  }

  /* @author icestone , 2:47
   * @date 2023/5/7
   * 返回该用户的所有文章tag
  */
  async returnAllTags(ctx) {
    const result = await getAllTagsByEmail(ctx.state.user.email);
    ctx.body = {
      code: 200,
      success: true,
      message: "返回该用户所有的文章tag",
      result
    };
  }

  /* @author icestone , 15:11
   * @date 2023/5/20
   * 将制定type设置为推荐
  */
  async returnSetRecommend(ctx) {

    // const result = await setRecommendByType()
    const paramsRes = paramsVerify({
      ids: {
        allowNull: false,
        default: null,
      },
      level: {
        allowNull: false,
        default: null,
        dataType: "int"
      }
    }, ctx);

    // @date 2023/5/20 , @author icestone
    // 参数验证通过
    if (paramsRes === 0) {

      const result = await setRecommendByType(ctx.request.body.ids, ctx.request.body.level);
      ctx.body = {
        code: 200,
        success: true,
        message: "修改置顶成功",
        result
      };
    } else {
      ctx.body = paramsRes;
    }

  }

  /* @author icestone , 15:46
   * @date 2023/5/7
   * 根据前端传来的 operate 操作符,更新某些列
  */
  async getUpdateSomethingResult(ctx) {
    // @date 2023/5/7 , @author icestone
    // 获取需要的 data
    const {operate = null, id = null, tags = null} = ctx.request.body;
    // @date 2023/5/7 , @author icestone
    // 根据不同的operate进行操作
    if (operate == "updateTags" & tags != null & id != null) {
      // @date 2023/5/7 , @author icestone
      // 更新 tag
      const result = await UpdateSomething(operate, tags, id);
      ctx.body = {
        code: 200,
        success: true,
        message: "更新成功",
        result
      };
    }
  }

  /* @author icestone , 15:16
   * @date 2023/5/11
   * markdown图片的上传
  */

  async uploadMarkdownImage(ctx) {
    const file = ctx.request.files.file;
    const filePath = file.path.substring(file.path.lastIndexOf("\\") + 1, file.path.length);
    if (checkImgType(file.path)) {
      // 是图片
      // 文件移动的目标路径
      const targetPath = path.join(__dirname, `../static/images/markdown/${filePath}`);
      await removeFile(file.path, targetPath);
      // @date 2023/6/30 @time 14:27 , @author 张嘉凯
      // 将图片和用户邮箱写入数据库
      await saveImageInfo(targetPath, ctx.state.user.email, 1);
      // 判断移动后文件是否存在:
      // const success = await isFileExisted(targetPath)
      // console.log(success)
      ctx.body = {
        code: 200,
        msg: "上传图片",
        success: true,
        result: {
          filePath,
        }
      };
    } else {

      fs.unlinkSync(file.path);
      // 不是图片
      ctx.body = {
        code: 200,
        success: false,
        msg: "你上传的不是图片",
        result: {}
      };
    }
  }

  /* @author icestone , 16:58
   * @date 2023/5/20
   * 获取推荐文章
  */
  async returnRecommendMarkdown(ctx) {

    const result = await getRecommendMarkdownFile();

    ctx.body = {
      code: 200,
      success: true,
      message: "获取置顶文章",
      result
    };
  }

  /* @author icestone , 16:09
   * @date 2023/5/31
   * 通过tag返回与该tag有关的文章
  */
  async returnRecommendByTags(ctx) {
    const {tags, id} = ctx.request.body;
    const str = tags.join("");
    if (str.length == 0) {
      const result = await markdownS.getRandomMarkdownFileById(id, 5);
      ctx.body = {
        code: 200,
        success: true,
        message: "获取随机推荐文章",
        result
      };
    } else {
      const result = await markdownS.getRecommendMarkdownFileByTags(tags, id);
      ctx.body = {
        code: 200,
        success: true,
        message: "获取推荐文章",
        result
      };
    }

  }

  /* @author icestone , 21:37
   * @date 2023/6/8
   * 通过email返回该用户的所有文章
  */
  async returnAllMarkdownByEmail(ctx) {
    const {email = "admin"} = ctx.request.body;
    const result = await getMarkdownByEmail(email);
    ctx.body = {
      code: 200,
      success: true,
      message: `获取${email}的文章`,
      result
    };
  }

  /* @author 张嘉凯
   * @date 2023/6/19 @time
   *  返回指定用户的置顶文章
  */
  async returnUserTopArticle(ctx) {
    const {email = null} = ctx.request.body;
    if (email) {
      const result = await getTopArticleByEmail(email, 1);
      ctx.body = {
        code: 200,
        success: true,
        result
      };
    } else {
      ctx.body = {
        code: 201,
        success: false,
        msg: "没有传入邮箱"
      };
    }
  }

  /* @author 张嘉凯
   * @date 2023/7/31 @time 9:01
   * 计算并返回文章的阅读量
   * 默认返回网站的所有阅读量
  */
  async returnAllviews(ctx) {
    const result = await markdownS.getViews();

    ctx.body = {
      message: "获取浏览量统计",
      success: true,
      result
    };
  }

  /**
   * 查询并处理所有的tags
   * @param ctx
   * @return {Promise<void>}
   */
  async getAllTags(ctx) {
    const result = await markdownS.getAllTags();
    ctx.body = {
      message: "获取所有tags",
      success: true,
      result
    };
  }

  /**
   * 获取随机的一篇文章数据
   * @return {Promise<void>}
   */
  async getRandomOne(ctx) {
    let result = await markdownS.returnRandomOne();
    if (!result.content) {
      // 数据为空,需要爬取
      const res = await markdownS.getDataByUrl(result.url, result.id);
      ctx.body = {
        message: "随机返回一条数据",
        success: true,
        result: res
      };
    } else {
      ctx.body = {
        message: "随机返回一条数据",
        success: true,
        result
      };
    }
  }

  /**
   * 判断是否传入了id/markdown内容,id优先,如果传入了id,那么根据id返回html文本
   * @param ctx
   * @return {Promise<void>}
   */
  async returnMarkdown(ctx) {
    const {id = null, data} = ctx.request.body;
    let result = "";
    if (id) {
      result = await markdownS.getMarkdownContentById(id);
    } else {

    }
    ctx.body = {
      code: 200,
      message: "获取markdown内容",
      result,
      success: true
    };

  }
}

module.exports = new MarkdownController();
