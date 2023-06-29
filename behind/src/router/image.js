// 管理图片的router
const Router = require('koa-router');
const { auth } = require('../middleware/user.middleware')
const router = new Router({ prefix: '/image' });
const {
    returnOperateResult
}=require('../controller/image.controller')

router.post('/operate',auth,returnOperateResult)


module.exports = router
