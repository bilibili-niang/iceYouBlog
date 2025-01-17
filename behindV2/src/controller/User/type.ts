import { z } from 'koa-swagger-decorator'
import { commonResponse } from '@/controller/common'

// 创建用户的请求
const CreateUserReq = z.object({
  userName: z.string().nonempty(),
  password: z.string().nonempty(),
})

// 创建用户的响应
const CreateUserRes = commonResponse({
  data: z.object({
    count: z.number(),
    rows: z.array(z.object({
      id: z.number(),
      userName: z.string(),
      createdAt: z.string(),
      updatedAt: z.string()
    }))
  })
})

// 删除用户的query
export const DeleteUserQuery = z.object({
  id: z.string().nonempty()
})

// 删除用户的响应
const DeleteUserRes = z.object({
  id: z.string(),
})

export type ICreateUserRes = z.infer<typeof CreateUserRes>;
export type ICreateUserReq = z.infer<typeof CreateUserReq>;
export type IDeleteUserQuery = z.infer<typeof DeleteUserQuery>;

export {
  CreateUserRes,
  CreateUserReq,
  DeleteUserRes
}