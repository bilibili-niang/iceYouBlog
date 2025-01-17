// 造福人类

const Router = require('koa-router')
const router = new Router()

router.all('/', (ctx) => {
  ctx.body = {
    code: 500,
    msg: '这里是未知的地方',
    data:{}
  }
})


module.exports = router
