const markdownFile = require('../schema/markdownFile')
const { insertLog } = require('./log.service')
const fileNameAndPath = __filename
const history = require('../schema/history')
const { salt } = require('../config/default')
const jwt = require('jsonwebtoken')
const { Op, Sequelize } = require('sequelize')
const tool = require('../services/tool.service')
const https = require('https')
const cheerio = require('cheerio')
const TurndownService = require('turndown')
let turndownService = new TurndownService()
const hljs = require('highlight')

const MarkdownIt = require('markdown-it')

md = new MarkdownIt({
    // 在源码中启用 HTML 标签
    html: true,
    // 转换段落里的 '\n' 到 <br>。
    breaks: true,
    langPrefix: 'language-',
    linkify: true,
    // 启用一些语言中立的替换 + 引号美化
    typographer: true,
    highlight: function (str, lang) {
        // if (lang && hljs.getLanguage(lang)) {
        if (lang) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>'
            } catch (__) {
            }
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
})

class MarkdownFileService {
    /* @author icestone , 16:14
     * @date 2023/5/8
     * 初始化 markdownFile 用的,用于返回第一条文章数据
    */
    async initMarkdownFile () {
        return await markdownFile.findOne({
            attributes: ['id'],
            raw: true
        })
    }

    //新建文章
    async createMarkdownFile (userEmail, requestData) {
        const {
            title = ' ',
            description = ' ',
            tag1 = 'null',
            tag2 = 'null',
            tag3 = 'null',
            audit = '1',
            content = '暂无内容哦'
        } = requestData
        // console.log('获取数据:  ' + filename, fileData, description, tag1, tag2, tag3)
        return await markdownFile.create({
            userEmail, title, description, tag1, tag2, tag3, audit, content
        })
    }

    // 获取首页数据/分页数据
    async getHomeIndexList (pageNum, pageSize) {
        const offset = ( pageNum - 1 ) * pageSize
        return await markdownFile.findAndCountAll({
            attributes: ['id', 'title', 'email', 'description', 'view', 'praise', 'headImg', 'updatedAt', 'tag1', 'tag2', 'tag3', 'recommendLevel'],
            offset: offset,
            limit: pageSize * 1,
            where: {
                states: {
                    [Op.gte]: 0
                },
                recommendLevel: {
                    // 推荐等级小于等于1的
                    [Op.lte]: 1
                }
            },
            order: [
                // 我们从要排序的模型开始排序数组
                ['id', 'DESC']
            ]
        })
    }

    // 传入id,浏览量自增1
    async viewIncreaseById (id) {
        markdownFile.increment(['view'], {
                where: {
                    id
                }
            }, {
                // view 自增 不更新 updatedAt 字段
                silent: true
            }
        )
            .then(res => {
                // console.log('成功')
                // console.log(res)
            })
            .catch(e => {
                // console.log('失败')
                // console.log(e)
                let date = new Date(+ new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                insertLog({
                    time: date,
                    ip: 'localhost',
                    logType: '自增出了问题',
                    detail: '文章根据id自增出错',
                    userId: 'root',
                    fileNameAndPath
                })
            })
    }

    // 通过文章数据和token记录用户的浏览记录
    async historyByToken (res, token) {
        console.error('--------historyByToken--------')
        let verifyToken = jwt.decode(token, salt)
        console.log("Boolean(verifyToken):")
        console.log(Boolean(verifyToken))
        if (verifyToken) {
            console.log('写入记录')
            const email = verifyToken.email || null
            await history.create({
                fileId: res[0].id, email, type: 'blog', fileName: res[0].title, description: res[0].description
            })
                .then(res => {
                    // console.log(res)
                    console.log('history 写入成功')
                })
                .catch(e => {
                    console.log(e)
                    console.log('history 写入失败')
                })
        } else {
            console.log('不写入记录')

        }

    }

    // 通过用户邮箱返回用户的文章:
    async getMarkdownByEmail (email) {
        return await markdownFile.findAll({
            attributes: ['id', 'email', 'description', 'updatedAt', 'view', 'praise', 'headImg', 'states', 'tag1', 'tag2', 'tag3', 'title'],
            where: {
                email,
                states: {
                    [Op.gte]: 0
                },
            },
            raw: true,
            order: [
                // 我们从要排序的模型开始排序数组
                ['id', 'DESC']
            ]
        })
    }

    // 通过传入的id返回首页文章
    async getHomeIndexListById (id, limit = 20) {
        return await markdownFile.findAll({
            attributes: ['id', 'title', 'email', 'description', 'view', 'praise', 'headImg', 'updatedAt', 'tag1', 'tag2', 'tag3', 'recommendLevel'],
            where: {
                states: {
                    [Op.gte]: 0
                },
                recommendLevel: {
                    // 推荐等级小于等于1的
                    [Op.lte]: 1
                }
            },
            raw: true,
            limit,
            offset: id,
            order: [
                // 我们从要排序的模型开始排序数组
                ['id', 'DESC']
            ]
        })
    }

    // 通过email获取用户所有文章
    async getAllUserArticle (email) {
        const res = await markdownFile.findAll({
            attributes: ['id', 'type', 'title', 'description', 'postTime', 'view'], where: {
                email
            }
        })
        console.log('res')
        console.log(res)
        return res
    }

    // 通过用户邮箱新建文章
    async newMarkdown (email, form) {
        form.email = email
        form.type = 'blog'
        const date = new Date()
        // form.postTime = date;
        // 默认审核状态为1
        form.audit = '1'
        const res = await markdownFile.create(form)
            .then(res => {
                console.log('成功')
                return true
            })
            .catch(e => {
                console.log('失败')
                console.log(e)
                return false
            })
    }

    // 通过email获取用户文章总体数据
    async getUserMarkdownData (email) {
        const res = await markdownFile.findAll({
            attributes: ['view', 'diggCount'],
            where: {
                email
            },
            raw: true
        })

        // 点赞数量
        let diggCounts = 0
        let count = 0
        res.forEach((i, index) => {
            count += parseInt(i.view)
            if (i.diggCount) {
                diggCounts += parseInt(i.diggCount)
            }
        })
        return {
            allView: count,
            allNums: res.length,
            diggCounts: diggCounts
        }
    }

    // 通过用户email和
    async updateMarkdownByEmail (data) {
        return await markdownFile.update({
            title: data.title,
            content: data.content,
            description: data.description,
            tag1: data.tag1,
            tag2: data.tag2,
            tag3: data.tag3,
            headImg: data.headImg,
        }, {
            where: {
                id: data.id
            }
        })
    }

    // 通过文章id返回该文章的用户邮箱
    async getUserEmailByMarkdownId (id) {
        return markdownFile.findOne({
            attributes: ['email'],
            where: {
                id
            },
            raw: true
        })
    }

    // 通过关键字查找并返回文章信息
    async getMarkdownByKeyWord (key) {
        return await markdownFile.findAll({
            where: {
                content: {
                    // 模糊查询
                    [Op.like]: '%' + key + '%'
                }
            },
            raw: true,
            // 控制查询字段
            attributes: ['id', 'title', 'description']
        })
    }


    /* @author icestone , 23:45
     * @date 2023/5/15
     *  通过用户邮箱返回用户所有文章分页数据的接口,
     *  邮箱,返回数量,跳过条数
    */
    async getAllUserMarkdownFiles (email, limit = 20, id = 0) {
        // return await markdownFile.findAll({
        console.log(`limit:${ limit },id:${ id }`)
        return await markdownFile.findAndCountAll({
            attributes: ['id', 'type', 'title', 'description', 'createdAt', 'view', 'tag1', 'tag2', 'tag3', 'recommendLevel'],
            where: {
                email: email
            },
            order: [
                // 我们从要排序的模型开始排序数组
                ['id', 'DESC']
            ],
            limit,
            // 跳过的数量
            offset: id,
        })
    }

    // 点赞
    async supportIncrease (id) {
        console.log('---supportIncrease---')
        await markdownFile.increment(['praise'], {
            where: {
                id
            }
        })
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
        return "result"
    }

    // 通过id返回该文章的一些数据,默认这里用于展示在用户的浏览记录,但也可以自定义查询信息
    async getMarkdownFileDetailById (ids, attr = ['id', 'title', 'createdAt', 'description', 'tag1', 'tag2', 'tag3', 'view', 'headImg', 'updatedAt']) {
        return await markdownFile.findAll({
            attributes: attr,
            where: {
                id: ids
            },
            raw: true
        })
    }

    /**
     * @Description:
     * @author icestone
     * @date 2023/5/3
     *  伪删除
     */
    async getDeleteResult (ids, email = 'demo@emaml') {
        await insertLog({
            logType: '伪删除文章',
            detail: `${ email }伪删除了文章:${ ids }`,
            fileNameAndPath
        })
        return await markdownFile.destroy({
            where: {
                id: ids
            }
        })
    }

    /**
     * @Description:
     * @author icestone
     * @date 2023/5/4
     *  通过email获取用户的已删除文章
     */
    async getDeletedFiles (email) {
        return await markdownFile.findAll({
            attributes: ['id', 'title', 'createdAt', 'description', 'tag1', 'tag2', 'tag3', 'view'],
            where: {
                destroyTime: { [Op.not]: null },
                email
            },
            paranoid: false,
        })
    }

    /**
     * @Description:
     * @author icestone
     * @date 2023/5/5
     *  通过id恢复指定文章
     */
    async getRecoverResult (ids, email) {
        await insertLog({
            logType: '恢复文章',
            detail: `${ email }恢复了文章:${ ids }`,
            fileNameAndPath
        })
        return await markdownFile.restore({
            where: {
                id: ids
            }
        })
    }

    /**
     * @Description:
     * @author icestone
     * @date 2023/5/5
     *  通过ids获取已被删除的文章的信息
     */
    async getAlreadyDetailById (ids, attr = ['id', 'title', 'createdAt', 'description', 'tag1', 'tag2', 'tag3']) {
        return await markdownFile.findAll({
            attributes: attr,
            where: {
                id: ids,
            },
            paranoid: false,
            raw: true
        })
    }

    /**
     * @Description:
     * @author icestone
     * @date 2023/5/5
     *  获取首页文章总数量,用作
     */
    async getAllCounts () {
        // @date 2023/5/5 , @author icestone
        //  查询 states 大于0的数据
        return await markdownFile.findAndCountAll({
            attributes: ['id'],
            where: {
                states: {
                    [Op.gte]: 0
                }
            },
            raw: true
        })
    }

    /* @author icestone , 18:40
     * @date 2023/5/5
     *  查询与传入的tag相关的数据
    */
    async getAboutMarkdown (tags, attr = ['id', 'title', 'email', 'description', 'view', 'praise', 'headImg', 'createdAt', 'tag1', 'tag2', 'tag3', 'updatedAt']) {
        const processedTags = []
        console.log('查询的tag:')
        console.log(tags)
        tags.forEach((item) => {
            if (item.length > 0) {
                processedTags.push(item)
            } else {
            }
        })
        return await markdownFile.findAll({
            attributes: attr,
            where: {
                [Op.or]: [
                    {
                        tag1: processedTags
                    },
                    {
                        tag2: processedTags
                    },
                    {
                        tag3: processedTags
                    },

                ]
            }
        })
        /*.then(res => {
            console.log("res:")
            console.log(res)
        })
        .catch(e => {
            console.log("e:")
            console.log(e)
        })*/
    }

    /* @author icestone , 2:48
     * @date 2023/5/7
     *  通过email返回该用户的所有文章tag
    */
    async getAllTagsByEmail (email) {
        let result = await markdownFile.findAll({
            attributes: ['tag1', 'tag2', 'tag3'],
            where: {
                [Op.and]: [
                    { email },
                    {
                        tag1: { [Op.not]: null }
                    }, {
                        tag2: { [Op.not]: null }
                    }, {
                        tag3: { [Op.not]: null }
                    },
                ]
            },
            raw: true
        })
        // 扁平化对象
        result = Object.values(result)
        let resultList = []
        result.forEach((item, index) => {
            Object.values(item).map(it => {
                if (resultList.indexOf(it) == - 1) {
                    // 不存在
                    resultList.push(it)
                }
            })
        })
        return { ...resultList }
    }

    /* @author icestone , 15:50
     * @date 2023/5/7
     *  更新操作,这里的 data 传入的应该是对象
    */
    async UpdateSomething (operate, data, id) {
        return await markdownFile.update(
            data,
            {
                where: {
                    id
                }
            }
        )
    }

    /* @author icestone , 15:13
     * @date 2023/5/20
     *  根据传入的不同类型将其设置为推荐
     *  传入 ids,需要置顶的文章id,数组,level 置顶等级
    */
    async setRecommendByType (ids, level) {
        return await markdownFile.update({
            recommendLevel: level
        }, {
            where: {
                id: ids
            },
            raw: true
        })
    }

    /* @author icestone , 17:00
     * @date 2023/5/20
     *  返回推荐文章
    */
    async getRecommendMarkdownFile () {
        return await markdownFile.findAll({
            attributes: ['id', 'title', 'email', 'description', 'view', 'praise', 'headImg', 'createdAt', 'tag1', 'tag2', 'tag3', 'recommendLevel', 'updatedAt'],
            where: {
                recommendLevel: {
                    [Op.gt]: 1
                }
            },
            order: [
                // 我们从要排序的模型开始排序数组
                ['id', 'DESC'],
                ['updatedAt', 'ASC']
            ],
            limit: 5
        })
    }

    async getRecommendMarkdownFileByTags (tags, id, attr = ['id', 'title', 'email', 'description', 'view', 'praise', 'headImg', 'createdAt', 'tag1', 'tag2', 'tag3', 'updatedAt']) {
        const processedTags = []
        tags.forEach((item) => {
            if (item.length > 0) {
                processedTags.push(item)
            } else {
            }
        })
        return await markdownFile.findAll({
            attributes: attr,
            where: {
                [Op.or]: [
                    {
                        tag1: processedTags
                    },
                    {
                        tag2: processedTags
                    },
                    {
                        tag3: processedTags
                    },
                ],
                [Op.and]: [
                    {
                        id: {
                            [Op.not]: id
                        }
                    }
                ]
            }
        })
    }

    /* @author 张嘉凯
     * @date 2023/7/6 @time 15:06
     * 根据id随机获取文章
    */
    async getRandomMarkdownFileById (id, limit = 5, attr = ['id', 'title', 'email', 'description', 'view', 'praise', 'headImg', 'createdAt', 'tag1', 'tag2', 'tag3', 'updatedAt']) {
        let idList = await markdownFile.findAll({
            attributes: ['id'],
            where: {
                states: {
                    [Op.gte]: 0
                },
                recommendLevel: {
                    // 推荐等级小于等于1的
                    [Op.lte]: 1
                }
            },
            raw: true
        })
        idList = tool.getLimitIds(idList, limit)

        return await markdownFile.findAll({
            attributes: attr,
            where: {
                [Op.or]: [
                    { id: idList }
                ]
            },
            limit
        })
    }

    /* @author 张嘉凯
     * @date 2023/6/19 @time
     * 获取置顶文章
    */
    async getTopArticleByEmail (email, level) {
        return await markdownFile.findAll({
            attributes: ['id', 'email', 'description', 'updatedAt', 'view', 'praise', 'headImg', 'states', 'tag1', 'tag2', 'tag3', 'title', 'recommendLevel'],
            where: {
                email,
                states: {
                    [Op.gte]: 0
                },
                recommendLevel: {
                    [Op.gte]: level
                }
            },
            raw: true,
            order: [
                // 我们从要排序的模型开始排序数组
                ['id', 'DESC']
            ]
        })
    }

    /* @author 张嘉凯
     * @date 2023/7/31 @time 9:39
     * 获取浏览量
    */
    async getViews () {
        let count = 0
        const result = await markdownFile.findAndCountAll({
            attributes: ['view'],
            raw: true
        })
        result.rows.map(item => {
            count += parseInt(item.view)
        })
        return count
    }

    /**
     * 获取所有tags
     * @param email
     * @return {promise}
     * */
    async getAllTags () {
        let result = await markdownFile.findAll({
            attributes: ['tag1', 'tag2', 'tag3'],
            where: {
                [Op.and]: [
                    {
                        tag1: { [Op.not]: null }
                    }, {
                        tag2: { [Op.not]: null }
                    }, {
                        tag3: { [Op.not]: null }
                    },
                ]
            },
            raw: true
        })
        // 扁平化对象
        result = Object.values(result)
        let resultList = []
        result.forEach((item, index) => {
            Object.values(item).map(it => {
                if (resultList.indexOf(it) === - 1) {
                    // 不存在
                    resultList.push(it)
                }
            })
        })
        return resultList
    }

    /**
     * 返回随机一条数据
     * @return {Promise<void>}
     */
    async returnRandomOne () {
        // 这里已经限定 states 大于0
        return await markdownFile.findOne({
            where: {
                states: {
                    [Op.gte]: 0
                }
            },
            order: [Sequelize.literal('rand()')]
        })
    }

    /**
     * 通过url对文章进行爬取
     * @param url{string} 需要爬取的url
     * @param id{number} 需要写入的id
     */
    getDataByUrl (url, id) {
        return new Promise((resolve, reject) => {
            let config = {
                html: '',
                json: {}
            }
            https.get(url, res => {
                res.on('data', function (chunk) {
                    config.html += chunk
                })
                res.on('end', async () => {
                    // 传入 cheerio
                    const $ = cheerio.load(config.html)
                    const ele = $("#content_views")
                    config.html = ele.html()
                    try {
                        config.html = turndownService.turndown(config.html)
                    } catch (e) {
                        console.log(e)
                    }
                    await markdownFile.update({ content: config.html }, { where: { id } })
                        .then(async res => {
                            let result
                            result = await markdownFile.findAll({
                                // attributes: ['id', 'title', 'createdAt', 'description', 'tag1', 'tag2', 'tag3', 'view', 'headImg','content'],
                                where: {
                                    id
                                },
                                raw: true
                            })
                            resolve(result[0])
                        })
                        .catch(e => {
                            resolve(null)
                        })

                })
            })
        })
    }

    /**
     * 通过id获取文章的markdown并转为html
     * @param id
     */
    async getMarkdownContentById (id) {
        const data = await markdownFile.findOne({
            where: {
                id
            }
        })
        let html = ''
        try {
            if (data.content) {
                html = md.render(data.content)
            }
        } catch (e) {
            console.log(e)
        }
        return html
    }

}

module.exports = new MarkdownFileService()
