import { body, responses, routeConfig } from 'koa-swagger-decorator'
import { info, warn } from '@/config/log4j'
import { ctxBody } from '@/utils'
import { ITestLogReq, TestLogReq, TestLogRes } from '@/controller/Test/type'
import { ParsedArgs, z } from 'koa-swagger-decorator'
import { Context } from 'koa'

class TestController {

  // 测试接口,写入log
  @routeConfig({
    method: 'post',
    path: '/test/writeToLog',
    summary: '写入log文件',
    tags: ['测试']
  })
  @body(TestLogReq)
  @responses(TestLogRes)
  async getTestLog(ctx: Context, args: ParsedArgs<ITestLogReq>) {

    // 获取目标参数
    const params = args.body

    if (params.info) {
      info(params.info)
    }

    if (params.warn) {
      warn(params.warn)
    }

    ctx.body = ctxBody({
      code: 200,
      success: true,
      msg: '写入log成功'
    })
    process.stdout.write('\x1Bc')
  }
}

export default TestController