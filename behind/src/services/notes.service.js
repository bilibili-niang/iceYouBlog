const notes = require('../schema/notes.model');

class NotesService {
    async getFirstNoteListByEmail(email) {
        return await notes.findAll({
            attributes: ['id', 'note_title', 'firstLevel', 'icon', 'iconType', 'cover'],
            where: {
                email,
                firstLevel: 1
            },
            raw: true
        })
    }

    // 添加笔记
    async addNote(args, email) {
        console.log("args:")
        console.log(args)
        const {
            note_title,
            firstLevel = 'true',
            secondLevel = 'false',
            icon = '/images/icon/default.png',
            allowEdit = 'false',
            allowComment = 'false',
            cover = '/images/cover/1.png',
            iconType = 'png'
        } = args;

        console.log("note_title, firstLevel:")
        console.log(note_title, firstLevel)
        return await notes.create({
            note_title,
            firstLevel,
            secondLevel,
            icon,
            allowEdit,
            allowComment,
            email,
            cover,
            iconType
        })
    }

    // 通过传入的id返回笔记信息
    async getNoteById(id) {

        return await notes.findOne({
            attributes: ['id', 'note_title', 'allowView', 'content', 'cover', 'icon', 'allowComment', 'allowEditUserList'],
            where: {
                id
            },
            raw: true
        })
    }

    // 通过传入的id和data更新note
    async updateNoteById(id, data) {
        console.log('---updateNoteById---')
        /*console.log("data:")
        console.log(data)*/
        return await notes.update(
            {
                note_title: data.note_title,
                content: data.content,
                cover: data.cover,
                icon: data.icon,
                allowComment: data.allowComment,
            }, {
                where: {
                    id
                },
                raw: true
            },
        )
        /*.then(res => {
            console.log('成功')
            console.log(res)
        })
        .catch(e => {
            console.log('失败啦')
            console.log(e)
        })*/
    }

    // 新建二级笔记
    async getNewSecondNote(note_title, fatherId, email) {
        return await notes.create({
            note_title,
            fatherId,
            email,
            firstLevel: false,
            secondLevel: true,
        })
    }

    /* @author icestone , 20:04
     * @date 2023/5/16
     * TODO 通过id,指定字段查询该note的信息
    */
    async getNoteUserInfoById(id, attr = ['email']) {
        return await notes.findOne({
            attributes: attr,
            where: {
                id
            },
            raw: true
        })
    }

    /* @author icestone , 20:13
 * @date 2023/5/16
 * TODO 更改note权限为公开
*/
    async changeNoteViewAuth(id) {
        return await notes.update({
            allowView: 1
        }, {
            where: {
                id
            },
        }, {
            raw: true
        })

    }
}

module.exports = new NotesService();