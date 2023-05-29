const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config.default')
const cheerio = require('cheerio');
const TurndownService = require('turndown');
let turndownService = new TurndownService();

const {
    getUserInfoByEmail
} = require('../services/user.service');

const {
    updateMarkdownByEmail,
    getUserEmailByMarkdownId,
    getDeletedFiles
} = require('../services/markdownFile.service');

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
    getRecommendMarkdownFile
} = require('../services/markdownFile.service');

const markdownFile = require('../schema/markdownFile');
const https = require('https');
const {salt} = require('../config/default');
const {
    userDontHaveArticle,
    notExistFile, searchKeyWordNotExist, articleOperateError
} = require('../constant/err.type');
const {
    insertSearchHistory
} = require('../services/history.service');
const {
    logHistoryByEmail
} = require('../services/history.service');
const path = require("path");
const user = require("../schema/user.model");
const {paramsVerify} = require("../middleware/admin.middleware");

class MarkdownController {
    async newFile(ctx) {
        const {authorization} = ctx.request.header
        const token = authorization.replace('Bearer ', '')
        // console.log('demo token:')
        // const token = authorization
        //解析token
        const {username, userEmail} = jwt.verify(token, JWT_SECRET)
        /*console.log('用户信息:')
       console.log(username, userEmail)*/
        // console.log('表表单数据:')
        const requestData = ctx.request.body
        console.log("requestData:")
        console.log(requestData)
        const res = await createMarkdownFile(userEmail, requestData)
        ctx.body = {
            code: 0, message: '用户创建文章成功', result: res,
        }
    }

    //返回首页的二十条数据
    async returnHomeList(ctx) {
        console.log('/home/')
        const {pageNum = 1, pageSize = 20} = ctx.request.query
        const result = await getHomeIndexList(pageNum, pageSize)
        ctx.body = {
            code: 200,
            success: true,
            message: '查询首页数据',
            result
        }
    }

    async returnAllIndexData(ctx) {
        const res = await markdownFile.findAll({}, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }
        })
        ctx.body = {
            code: 200, message: '查询首页数据', result: res
        }
    }

    // 通过id查询文章
    async getMarkdownDataById(ctx) {
        console.log('---getMarkdownDataById---')
        // 浏览量自增
        await viewIncreaseById(ctx.request.body.id)
        // 通过用户token写入历史记录
        const token = ctx.request.header.token || '';
        // 不存在时返回id为0的文章
        const id = ctx.request.body.id || 0;
        const res = await getMarkdownFileDetailById(id, ['url', 'email', 'id', 'title', 'createdAt', 'description', 'tag1', 'tag2', 'tag3', 'view', 'content', 'headImg']);
        if (!res.length) {
            // 该文章数据不存在,返回错误信息:
            ctx.body = notExistFile
        } else {
            // @date 2023/5/8 , @author icestone
            // TODO token存在,写入历史记录
            if (token) {
                console.log('存在token')
                historyByToken(res, token);
            } else {
            }
            const ownerEmail = res[0].email || '';
            const userInf = await getUserInfoByEmail(ownerEmail, ['email', 'username', 'is_admin', 'avatar', 'occupation', 'githubUrl', 'word'])
            if (res[0].url) {
                console.log("res[0].content:")
                console.log(res[0].content)
                if (!res[0].content) {
                    console.log('content为空,爬取')
                    let config = {
                        html: '', json: {}
                    };
                    let url = res[0].url || '';
                    console.log('通过id查询的url:')
                    console.log(url)
                    https.get(url, res => {
                        res.on('data', function (chunk) {
                            config.html += chunk;
                        });
                        res.on('end', () => {
                            // 传入cheerio
                            const $ = cheerio.load(config.html);
                            const ele = $("#content_views");
                            config.html = ele.html()
                            config.html = turndownService.turndown(config.html)
                            markdownFile.update({
                                content: config.html
                            }, {
                                where: {
                                    id
                                }
                            })
                                .then(r => {
                                    console.log('success')
                                })
                                .catch(e => {
                                    console.log('fail')
                                })
                        })
                    })
                    const res2 = await markdownFile.findAll({
                        attributes: {exclude: ['createdAt', 'updatedAt', 'source', 'states', 'headImg']},
                        raw: true,
                        where: {id}
                    })
                    ctx.body = {
                        code: 200,
                        message: '查询首页数据',
                        success: true,
                        result: res2[0],
                        userInf: userInf
                    }
                } else {
                    console.log('文章数据不为空,直接返回')
                    // 获取文章创建者的avatar,occupation(职业)

                    ctx.body = {
                        code: 200,
                        message: '查询首页数据',
                        success: true,
                        result: res[0],
                        userInf
                    }
                }
            } else {
                console.log('没有url,可以直接返回')
                ctx.body = {
                    code: 200,
                    message: '查询首页数据',
                    success: true,
                    result: res[0],
                    userInf
                }
            }
        }
    }

    // 通过用户信息返回该用户的文章:
    async returnUserArticle(ctx) {
        const token = ctx.request.header.token || 'notExist';
        // 如果token不存在或者token太短,直接返回
        if (token.length < 10) {
            ctx.body = {
                code: 201, msg: 'token不存在或非法数据', success: false, result: {}
            }
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
            console.log("sequence,sequenceSize:")
            console.log(sequence, sequenceSize)

            // const email = ctx.request.user.email || '';
            const email = user.email || '';
            if (email.length > 10) {
                // const res = await getMarkdownByEmail(email);
                const res = await markdownFile.findAll(// const res = await markdownFile.findAndCountAll(
                    {
                        attributes: ['id', 'title', 'email', 'description', 'view', 'praise', 'headImg'], where: {
                            email
                        }, raw: true, limit: sequenceSize, offset: sequence,
                        order: [
                            // 我们从要排序的模型开始排序数组
                            ['id', 'DESC']
                        ]
                    })
                ctx.body = {
                    code: 200, mag: 'get data success', success: true, result: res
                }
            } else {
                ctx.body = {
                    code: 201, mag: 'email error', success: false, result: {}
                }
            }
        }
    }

    // 返回用户文章分页接口
    async returnUserAllArticle(ctx) {
        console.log('---returnUserAllArticle---')
        const {
            limit = 20,
            id = 0
        } = ctx.request.body;
        const result = await getAllUserMarkdownFiles(ctx.state.user.email, limit, id);
        if ((await result).length == 0) {
            // @date 2023/5/10 , @author icestone
            // TODO 为空,用户没有文章
            ctx.body = userDontHaveArticle;
        } else {
            // 有文章
            ctx.body = {
                code: 200,
                message: '您的所有文章',
                success: true,
                result
            }
        }
    }

    // 通过前端传来的id,返回文章数据,无法指定数据条数,每次返回20条
    async returnHomeListById(ctx) {
        console.log("---returnHomeListById---")
        let {id = -1, limit = 20} = ctx.request.body;
        console.log(`获取的跳过数量:${id},获取的分页数量:${limit}`)
        id = parseInt(id) - 1;
        id = id > 0 ? id : 0;
        // @date 2023/5/5 , @author icestone
        // TODO id 为跳过的数量,limit 为查询数量
        const result = await getHomeIndexListById(id, limit);

        ctx.body = {
            code: 200,
            success: true,
            message: '查询成功',
            result
        }
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
            }
            // ctx.form = form;
            // const form = ctx.request.body;
            let flag = false;
            console.log("form:")
            console.log(form)
            const res = await markdownFile.create({
                email: ctx.state.user.email || 'admin@email',
                title: form.title,
                content: form.content,
                states: 1,
                // postTime: new Date(),
                description: form.desc,
                audit: 1,
                tag1: form.tag1,
                tag2: form.tag2,
                tag3: form.tag3,
                type: 'blog',
                // 2表示该文章为原创,不需要爬取
                hasOriginal: 2
            })
            /*.then(res => {
                console.log('success')
                flag = !flag;
                /!*ctx.body = {
                    code: 200, msg: '成功success为true,反之false', success: true, result: {res: res.dataValues}
                }*!/
            })
            .catch(e => {
                console.log('error')
                console.log(e)
                /!*ctx.body = {
                    code: 200, msg: '成功success为true,反之false', success: false, result: {}
                }*!/
            });*/

            if (JSON.stringify(res).length > 5) {
                // success
                flag = !flag;
            }
            ctx.body = {
                code: 200,
                msg: '成功success为true,反之false',
                success: flag,
                res: {
                    result: res
                }
            }
        }
    }

    // 更新文章
    async getUpdateResult(ctx) {
        const {markdownData = null} = ctx.request.body;
        if (markdownData == null) {
            return
        } else {
            // 通过 markdownData 查询该文章的email是否为该 ctx.state.user 中的email
            const email = await getUserEmailByMarkdownId(markdownData.id);
            // @date 2023/5/7 , @author icestone
            // TODO token中的email与该文章的email一致,可以修改
            if (ctx.state.user.email == email.email) {
                const res = await updateMarkdownByEmail(markdownData)
                console.log("res[0]")
                console.log(res[0])
                ctx.body = {
                    code: 200,
                    success: true,
                }
            } else {
                // 并非发布者的邮箱
                ctx.body = {
                    code: 200,
                    success: false,
                    message: '不是你的文章'
                }
            }
        }
    }

    // 搜索
    async returnSearchResult(ctx) {
        const key = ctx.request.body.key || 'null';
        const token = ctx.request.header.token || null;
        if (token && key != 'null') {
            const {email = null} = jwt.decode(token, salt);
            console.log("email:")
            console.log(email)
            if (email) {
                console.log('用户存在,写入历史')
                await insertSearchHistory(email, key)
            }
        }

        if (key == null) {
            ctx.body = searchKeyWordNotExist;
        } else {
            const result = await getMarkdownByKeyWord(key);
            ctx.body = {
                code: 200,
                success: true,
                message: '通过关键字查询文章信息',
                result
            }
        }
    }

    // 点赞
    async returnSupportResult(ctx) {
        console.log('---returnSupportResult---')
        const {id = 0} = ctx.request.body;
        if (ctx.state.user != null) {
            // 存在用户
            // 写入记录
            console.log('有用户登录,写入点赞记录')
            await logHistoryByEmail(id, ctx.state.user.email);
            const result = await supportIncrease(id);
            ctx.body = {
                code: 200,
                message: '点了个赞,并且已记录该用户点赞',
                success: true,
                result
            }
        } else {
            // 不存在用户
            const result = await supportIncrease(id);
            ctx.body = {
                code: 200,
                message: '点了个赞,而且成功了',
                success: true,
                result
            }
        }
    }

    // 对文章进行操作
    async returnOperateResult(ctx) {
        console.log('---returnOperateResult---');
        const {email} = ctx.state.user;
        // 根据ids查询文章的email信息是否属于该操作用户
        const attr = ['id', 'email']
        console.log('传入的ids:')
        console.log(ctx.state.ids)
        // @date 2023/5/5 , @author icestone
        // TODO 这里查询的是没有被删除的普通文章
        const idsResult = await getMarkdownFileDetailById(ctx.state.ids, attr);
        console.log('查询的ids信息:')
        console.log(idsResult)
        /**
         * @Description:
         * @author icestone
         * @date 2023/5/3
         * TODO 获取ids中email和当前操作用户email相同的id,后续进行删除
         */
        const ableOperatelIds = idsResult.map((item) => {
            if (item.email == email) {
                return item.id != undefined ? item.id : null;
            } else {
            }
        })
        if (ctx.state.operate == 'del') {
            /**
             * @Description:
             * @author icestone
             * @date 2023/5/3
             * TODO 传入数组伪删除,此时可能有为 undefined 的值
             */
            const result = await getDeleteResult(ableOperatelIds, ctx.state.user.email);
            // 传参正确,可以删除
            ctx.body = {
                code: 200,
                success: true,
                message: `文章${ctx.state.operate}成功`,
                result
            }
        } else if (ctx.state.operate == 'recover') {
            // @date 2023/5/5 , @author icestone
            // TODO 这里应该查询的是被删除的文章数据
            const idsResult = await getAlreadyDetailById(ctx.state.ids, attr);
            /**
             * @Description:
             * @author icestone
             * @date 2023/5/5
             * TODO 过滤
             */
            const ableOperatelIds = idsResult.map((item) => {
                if (item.email == email) {
                    return item.id != undefined ? item.id : null;
                } else {
                }
            })
            console.log("---operate revover---")
            console.log('ableOperatelIds')
            console.log(ableOperatelIds)
            const result = await getRecoverResult(ableOperatelIds, ctx.state.user.email);
            ctx.body = {
                code: 200,
                success: true,
                message: `文章${ctx.state.operate}成功`,
                result
            }
        } else {
            // 传参错误
            ctx.body = articleOperateError;
        }
    }

    // 获取用户已删除的文章
    async returnDeletedFiles(ctx) {
        console.log('returnDeletedFiles')
        const {email} = ctx.state.user;

        const result = await getDeletedFiles(email);
        ctx.body = {
            code: 200,
            message: "查看已删除文章",
            success: true,
            result
        }
    }

    /**
     * @Description:
     * @author icestone
     * @date 2023/5/5
     * TODO 返回文章总数,用作分页
     */
    async returnAllCounts(ctx) {
        const result = await getAllCounts();
        // @date 2023/5/5 , @author icestone
        // TODO 分页处理,返回前端的直接是处理好的多少页
        /*if (parseInt(result.count / 20) < result.count) {
            result.count = parseInt(result.count / 20) + 1;
        } else {
            result.count = parseInt(result.count / 20);
        }*/
        ctx.body = {
            code: 200,
            success: true,
            message: '获取文章总数',
            result: result.count
        }
    }

    /* @author icestone , 2:47
     * @date 2023/5/7
     * TODO 返回该用户的所有文章tag
    */
    async returnAllTags(ctx) {
        const result = await getAllTagsByEmail(ctx.state.user.email);
        ctx.body = {
            code: 200,
            success: true,
            message: '返回该用户所有的文章tag',
            result
        }
    }

    /* @author icestone , 15:11
     * @date 2023/5/20
     * TODO 将制定type设置为推荐
    */
    async returnSetRecommend(ctx) {
        console.log('ctx.request.body')
        console.log(ctx.request.body);
        // const result = await setRecommendByType()
        const paramsRes = paramsVerify({
            ids: {
                allowNull: false,
                default: null,
            },
            level: {
                allowNull: false,
                default: null,
                dataType: 'int'
            }
        }, ctx)

        // @date 2023/5/20 , @author icestone
        // TODO 参数验证通过
        if (paramsRes == 0) {
            console.log("ctx.request.body.level:");
            console.log(ctx.request.body.level);
            const result = await setRecommendByType(ctx.request.body.ids, ctx.request.body.level);
            ctx.body = {
                code: 200,
                success: true,
                message: "修改置顶成功",
                result
            }
        } else {
            ctx.body = paramsRes
        }

    }

    /* @author icestone , 15:46
     * @date 2023/5/7
     * TODO 根据前端传来的 operate 操作符,更新某些列
    */
    async getUpdateSomethingResult(ctx) {
        // @date 2023/5/7 , @author icestone
        // TODO 获取需要的 data
        const {operate = null, id = null, tags = null} = ctx.request.body;
        // @date 2023/5/7 , @author icestone
        // TODO 根据不同的operate进行操作
        if (operate == 'updateTags' & tags != null & id != null) {
            // @date 2023/5/7 , @author icestone
            // TODO 更新 tag
            const result = await UpdateSomething(operate, tags, id);
            ctx.body = {
                code: 200,
                success: true,
                message: '更新成功',
                result
            }
        }
    }

    /* @author icestone , 15:16
     * @date 2023/5/11
     * TODO markdown图片的上传
    */

    async uploadMarkdownImage(ctx) {
        console.log('---uploadMarkdownImage---')
        const file = ctx;
        console.log("file")
        console.log(file)
        ctx.body = {
            code: 200
        }
    }

    /* @author icestone , 16:58
     * @date 2023/5/20
     * TODO 获取推荐文章
    */
    async returnRecommendMarkdown(ctx) {
        const result = await getRecommendMarkdownFile();
        console.log("result:")
        console.log(result)
        ctx.body = {
            code: 200,
            success: true,
            message: "获取置顶文章",
            result
        }
    }
}

module.exports = new MarkdownController()
