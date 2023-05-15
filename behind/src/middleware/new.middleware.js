// 用户新建文章,验证是否有必须的字段
const {formDataNotAllow} = require('../constant/err.type');
const hasFormData = async (ctx, next) => {
    let form = {};
    try {
        form = {
            title: ctx.request.body.title || "",
            content: ctx.request.body.article || "",
            description: ctx.request.body.desc || "",
            tag1: ctx.request.body.tag1 || "",
            tag2: ctx.request.body.tag2 || "",
            tag3: ctx.request.body.tag3 || ""
        }
        ctx.form = form;
        next();
    } catch (e) {
        ctx.body = formDataNotAllow
    }
}


module.exports = {
    hasFormData
}