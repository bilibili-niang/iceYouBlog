const {noteParamsNotAllow, noteAuthNotAllow} = require("../constant/err.type");
const {
    getNoteUserInfoById
} = require('../services/notes.service')

class NoteMiddleware {
    async haveNoteId(ctx, next) {
        const {id = 0} = ctx.request.body;
        if (id == 0) {
            // @date 2023/5/16 , @author icestone
            //  数据不对,报错
            ctx.body = noteParamsNotAllow;
        } else {
            await next();
        }
    }

    // @date 2023/5/16 , @author icestone
    //  验证是否为该note的拥有者,
    async isOwner(ctx, next) {
        const noteUserEmail = await getNoteUserInfoById(ctx.request.body.id, ctx.request.body.id['email'])
        /*console.log(`noteUserEmail:`)
        console.log(noteUserEmail);
        console.log(`ctx.state.user.email:${ctx.state.user.email}`)*/
        if (noteUserEmail.email == ctx.state.user.email) {
            // @date 2023/5/16 , @author icestone
            //  操作者是该note的拥有者:
            await next();
        } else {
            // @date 2023/5/16 , @author icestone
            //  不是该note的拥有者,权限不够
            ctx.body = noteAuthNotAllow;
        }
    }



}

module.exports = new NoteMiddleware();
