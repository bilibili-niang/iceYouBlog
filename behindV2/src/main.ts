import { addAliases } from 'module-alias'
import dotenv from 'dotenv'

// 配置路径别名,需要在项目的入口
addAliases({
  '@': __dirname,
})
import app from './app'
import { info } from '@/config/log4j'

const env = dotenv.config().parsed

// 端口被占用时递归监听新端口
const startServer = (port: number) => {
  const server = app
    .listen(port)
    .on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        info(`端口 ${port} 已被占用, 尝试端口 ${port + 1}`)
        server.close()
        startServer(port + 1)
      }
    })
    .on('listening', () => {
      info(`服务器运行在 http://localhost:${port}`)
      console.log(`服务器运行在 http://localhost:${port}`)
      console.log(`swagger文档运行在 http://localhost:${port}/swagger-html`)
    })
}

startServer(Number(env.PORT))

export { env }
