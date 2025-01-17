import { addAliases } from 'module-alias'
import dotenv from 'dotenv'

// 配置路径别名,需要在项目的入口
addAliases({
  '@': __dirname
})
import app from './app'
import { info } from '@/config/log4j'

const env = dotenv.config().parsed

app.listen(Number(env.PORT), () => {
  // 清除一下控制台
  // process.stdout.write('\x1Bc')
  info(`Server is running at http://localhost:${env.PORT}`)
  console.log(`Server is running at http://localhost:${env.PORT}`)
  console.log(`swaggerDoc is running at http://localhost:${env.PORT}/swagger-html`)
})

export {
  env
}