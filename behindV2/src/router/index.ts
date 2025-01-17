import fs from 'fs'
import Router from 'koa-router'

const indexRouter = new Router()

// 获取当前目录下所有的文件，排除当前文件
const files = fs.readdirSync(__dirname)
  .filter(file => file !== 'index.ts')
files.forEach(file => {
  const routeModule = require(`./${file}`)
  if (routeModule.routes) {
    indexRouter.use(routeModule.routes())
  }
})

export default indexRouter