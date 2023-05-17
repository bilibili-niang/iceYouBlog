const {
    getFirstNoteListByEmail,
    addNote,
    getNoteById,
    updateNoteById,
    getNewSecondNote,
    changeNoteViewAuth
} = require('../services/notes.service');

class NoteController {
    // 获取用户的note列表
    async returnUserFirstNoteList(ctx) {
        console.log('returnUserNoteList')
        const {email} = ctx.state.user;
        const result = await getFirstNoteListByEmail(email);
        console.log("result:")
        console.log(result)
        console.log(result.length)
        if (result.length == 0) {
            // 该用户没有笔记
            ctx.body = {
                code: 200,
                success: true,
                message: '该用户没有笔记',
                result
            }
        } else {
            ctx.body = {
                code: 200,
                success: true,
                result
            }
        }
    }

    // 用户添加笔记,这里只是添加笔记的title
    async returnUserAddNote(ctx) {
        console.log('---returnUserAddNote---')
        const args = {
            ...ctx.request.body
        }
        const result = await addNote(args, ctx.state.user.email);
        ctx.body = {
            code: 200,
            success: true,
            message: '',
            result
        }
    }

    // 通过id返回用户的笔记信息
    async returnNote(ctx) {
        const id = ctx.request.body.id || 0;
        const result = await getNoteById(id);
        if (result == null) {
            ctx.body = {
                code: 200,
                success: false,
                message: '该笔记不存在或已删除',
                result
            }
        } else {
            ctx.body = {
                code: 200,
                success: true,
                message: '获取用户的笔记信息',
                result
            }
        }

    }

    // 保存笔记
    async returnSaveResult(ctx) {
        const id = ctx.request.body.id || 0;
        // const id = 0;
        const data = ctx.request.body.data || {};
        console.log('文章id')
        console.log(id)
        const result = await updateNoteById(id, data)
        if (result[0] = 1) {
            // update成功
            ctx.body = {
                code: 200,
                success: true,
                message: '更新笔记,成功',
                result
            }
        } else {
            // update失败
            ctx.body = {
                code: 200,
                success: false,
                message: '更新笔记,失败或者不需要更新',
                result
            }
        }
    }

    // 新建二级笔记
    async returnSecondResult(ctx) {
        const note_title = ctx.request.body.title || 'null';
        const fatherId = ctx.request.body.fatherId || '0';
        const result = await getNewSecondNote(note_title, fatherId, ctx.state.user.email);
        console.log("result:")
        console.log(result)
        ctx.body = {
            code: 200,
            success: true,
            result
        }

    }

    /* @author icestone , 19:56
     * @date 2023/5/16
     * TODO 公开某个note
    */
    async returnUserPublicNoteResult(ctx) {
        console.log(`当前note的用户信息:`)
        // 更改权限为公开
        const result = await changeNoteViewAuth(ctx.request.body.id);
        ctx.body = {
            code: 200,
            success: true,
            message: "更改note权限成功",
            result
        }
    }

}

module.exports = new NoteController();