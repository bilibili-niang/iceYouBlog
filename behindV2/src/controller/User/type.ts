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
    rows: z.array(
      z.object({
        id: z.number(),
        userName: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      })
    ),
  }),
})

// 删除用户的响应
export const DeleteUserQuery = commonResponse({
  data: z.object({
    id: z.string().nonempty(),
  }),
})

// 删除用户的响应
const DeleteUserRes = commonResponse({
  data: z.object({
    id: z.string(),
  }),
})

// 用户登录的响应
const UserLoginRes = commonResponse({
  data: z.object({
    id: z.string().nonempty(),
    createdAt: z.string().nonempty(),
    updatedAt: z.string().nonempty(),
    deletedAt: z.string().nonempty(),
    userName: z.string().nonempty(),
    password: z.string().nonempty(),
    token: z.string().nonempty(),
  }),
})

export type ICreateUserRes = z.infer<typeof CreateUserRes>
export type ICreateUserReq = z.infer<typeof CreateUserReq>
export type IDeleteUserQuery = z.infer<typeof DeleteUserQuery>

export { CreateUserRes, CreateUserReq, DeleteUserRes, UserLoginRes }
