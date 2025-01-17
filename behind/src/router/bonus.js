// 造福人类

const fs = require('fs')
const Router = require('koa-router')
const path = require('path')
const router = new Router({ prefix: '/bonus' })

const dir = path.join(__dirname, '../bonus')
router.get('/randomOne', (ctx) => {
    let fileList = []
    try {
        fs.readdirSync(dir).forEach(file => {
            fileList.push(file)
        })
    } catch (e) {
        console.log(e)
    }
    const result = fileList[Math.floor(Math.random() * fileList.length)]
    console.log(result)

    ctx.body = {
        code: 200,
        message: '获取随机一张图片',
        result
    }
})


module.exports = router
