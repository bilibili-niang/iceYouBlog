const {tagNotExist} = require("../constant/err.type");

class TagMiddleware {
    async hasTag(ctx, next) {
        console.log('---hasTag---')
        const {tags = []} = ctx.request.body;
        if (tags.length == 0) {
            // @date 2023/5/5 , @author icestone
            // TODO 不存在tag,报错
            ctx.body = tagNotExist;
        } else {
            // @date 2023/5/5 , @author icestone
            // TODO 挂载一下
            ctx.state.tags = tags;
            await next();
        }
    }


}

module.exports = new TagMiddleware();