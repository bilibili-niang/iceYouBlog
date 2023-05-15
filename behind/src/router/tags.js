// @date 2023/5/5 , @author icestone
// TODO 关于tag的router
const Router = require('koa-router')

const {
    returnAboutTag
} = require('../controller/tag.controller');

const {
    hasTag
} = require('../middleware/tag.middleware');

const router = new Router({prefix: '/tag'})

router.post('/aboutTag', hasTag, returnAboutTag)


module.exports = router;