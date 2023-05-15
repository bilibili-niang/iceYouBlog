const {
    getAboutMarkdown
} = require('../services/markdownFile.service');

class TagController {
    /* @author icestone , 18:30
     * @date 2023/5/5
     * TODO 返回与该tag相关的信息
    */
    async returnAboutTag(ctx) {
        console.log('returnAboutTag')
        // @date 2023/5/5 , @author icestone
        // TODO 获取 markdown 中与该tag相关的数据
        const result = await getAboutMarkdown(ctx.state.tags);
        ctx.body = {
            code: 200,
            success: true,
            message: '返回与该tag相关的文章数据',
            result
        }
    }
}

module.exports = new TagController();