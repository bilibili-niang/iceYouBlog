import { z } from 'koa-swagger-decorator'

/**
 * 定义一个通用的响应结构
 *
 * @param params 可选参数对象,用于扩展响应结构,一般传入的是data的schema
 * @returns 返回包含code、success、msg、data等字段的响应结构
 */
export const commonResponse = (params?: object) => {
  return z.object({
    code: z.number(),
    success: z.boolean(),
    msg: z.string(),
    ...{
      data: z.object({}),
      ...params,
    },
  })
}
