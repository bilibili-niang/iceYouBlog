import { z } from 'koa-swagger-decorator'
import { commonResponse } from '@/controller/common'

/*
* 构建请求参数
* */
export const TestLogReq = z.object({
  info: z.string(),
  warn: z.string()
})
/// 响应参数
export const TestLogRes = commonResponse()

/*
* 请求体的type
* */
export type ITestLogReq = z.infer<typeof TestLogReq>