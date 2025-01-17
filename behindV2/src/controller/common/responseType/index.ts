import { z } from 'koa-swagger-decorator'

/*
* 构建通用的返回
* @params {params} 这里面一般是只用来控制data的包裹值的状态
* */
export const commonResponse = (params?: object) => {
  return z.object({
    code: z.number(),
    success: z.boolean(),
    msg: z.string(),
    ...{
      data: z.object({}),
      ...params
    }
  })
}