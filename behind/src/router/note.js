// note模块
const Router = require('koa-router')
const {auth} = require('../middleware/user.middleware');
const {
    returnUserFirstNoteList,
    returnUserAddNote,
    returnNote,
    returnSaveResult,
    returnSecondResult
} = require('../controller/note.controller');

const router = new Router({prefix: '/note'})

// 获取用户所有的一级note列表
router.post('/allNotes', auth, returnUserFirstNoteList)

// 添加父级笔记
router.post('/addNote', auth, returnUserAddNote)

// 通过id获取该note的详细信息
router.post('/getNote', auth, returnNote)

// 保存
router.post('/saveNote',auth,returnSaveResult)

// 新建二级笔记
router.post('/newSecondNote',auth,returnSecondResult)

module.exports = router