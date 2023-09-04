// note模块
const Router = require('koa-router')
const {auth} = require('../middleware/user.middleware');
const {
    returnUserFirstNoteList,
    returnUserAddNote,
    returnNote,
    returnSaveResult,
    returnSecondResult,
    returnUserPublicNoteResult
} = require('../controller/note.controller');
const {
    haveNoteId,
    isOwner
} = require('../middleware/note.middleware')
const router = new Router({prefix: '/note'})

// 获取用户所有的一级note列表
router.post('/allNotes', auth, returnUserFirstNoteList)

// 添加父级笔记
router.post('/addNote', auth, returnUserAddNote)

// 通过id获取该note的详细信息
router.post('/getNote', auth, returnNote)

// 保存
router.post('/saveNote', auth, returnSaveResult)

// 新建二级笔记
router.post('/newSecondNote', auth, returnSecondResult)

/* @author icestone , 19:55
 * @date 2023/5/16
 *  公开当前note
*/
router.post('/publicNote', auth, haveNoteId, isOwner, returnUserPublicNoteResult)

module.exports = router
