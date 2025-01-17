/*
* 公共的查询条件,如果需要了,再加
* */

import { z } from 'koa-swagger-decorator'

/*
* 构建并返回查询条件
* */
export const paginationQuery = (params?: object) => {
  return z.object({
    // 下面三个条件都不是必须的,且有默认值
    size: z.coerce.number().default(10).transform(val => val > 0 ? val : 10),
    page: z.coerce.number().default(1).transform(val => val > 0 ? val : 1),
    ...params
  })
}