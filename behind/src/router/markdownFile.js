//markdown文章的操作
const Router = require('koa-router')
const {
    newFile
} = require('../controller/markdown.controller')

const {
    auth
} = require('../middleware/user.middleware')
const { Validator } = require('../middleware/public.middleware')

const {
    getMarkdownDataById,
    returnUserAllArticle,
    getUpdateResult,
    returnSearchResult,
    returnOperateResult,
    returnDeletedFiles,
    returnAllCounts,
    returnAllTags,
    getUpdateSomethingResult,
    returnSetRecommend,
    returnRecommendMarkdown,
    returnRecommendByTags,
    returnAllMarkdownByEmail
} = require('../controller/markdown.controller')
const markdownC = require('../controller/markdown.controller')
const {
    hasOperateAdnIds
} = require('../middleware/markdown.middleware')

const router = new Router({ prefix: '/markdownFile' })

//文章的新建
router.post('/new', auth,
    //验证信息,是否传入文章名称,文章名称是必填的
    Validator({
        filename: {
            type: 'string',
            required: true
        }
    }), newFile)

//文章的新查询
router.post('/getData', getMarkdownDataById)

// 文章更新
router.post('/update', auth, getUpdateResult)

/* @author icestone , 15:45
 * @date 2023/5/7
 * 更新某些条目
*/
router.post('/updateSomething', auth, getUpdateSomethingResult)

// 获取登录用户的文章列表
router.post('/getUserArticle', auth, returnUserAllArticle)

// 搜索
router.post('/search', returnSearchResult)

/**
 * 获取用户置顶文章
 */
router.post('/getTopArticle', markdownC.returnUserTopArticle)

/**
 * @Description:
 * @author icestone
 * @date 2023/5/4
 * 前端对文章进行删除或改变状态,这里是根据传来的 operate 判断是需要删除还是恢复
 */
router.post('/operate', auth, hasOperateAdnIds, returnOperateResult)

// 获取用户已删除的文章
router.post('/deletedFile', auth, returnDeletedFiles)

/**
 * @Description:
 * @author icestone
 * @date 2023/5/5
 * 获取首页所有条目总数
 */
router.get('/allCounts', returnAllCounts)

/* @author icestone , 2:46
 * @date 2023/5/7
 * 获取该用户的所有文章tag
*/

router.post('/getAllTags', auth, returnAllTags)

/* @author icestone , 15:10
 * @date 2023/5/20
 * 将文章设置为推荐
*/
router.post('/setRecommend', auth, returnSetRecommend)

/* @author icestone , 0:09
 * @date 2023/5/24
 * 获取推荐的文章
*/
router.get("/getRecommend", returnRecommendMarkdown)

/* @author icestone , 16:05
 * @date 2023/5/31
 * 根据文章tag获取该页面的推荐文章
*/
router.post('/getRecommendByTags', returnRecommendByTags)
/* @author icestone , 21:37
 * @date 2023/6/8
 * 获取指定email用户的所有文章
*/
router.post('/getUserAllMarkdown', returnAllMarkdownByEmail)

/**
 * 查询所有tag
 */
router.get('/tags', markdownC.getAllTags)

/**
 * 获取随机的一篇文章数据
 */
router.get('/random', markdownC.getRandomOne)

/**
 * 将指定id/markdown转为html内容
 */
router.post('/transformToHtml',markdownC.returnMarkdown)


module.exports = router


