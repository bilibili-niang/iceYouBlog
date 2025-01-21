import { CreateUserReq, CreateUserRes, ICreateUserReq } from '@/controller/User/type'
import { Context } from 'koa'
import { body, middlewares, ParsedArgs, responses, routeConfig } from 'koa-swagger-decorator'

class MarkdownClass {
  @routeConfig({
    method: 'post',
    path: '/markdown/create',
    summary: '创建markdown',
    tags: ['markdown']
  })
  @body(CreateUserReq)
  @responses(CreateUserRes)
  @middlewares([
    async (ctx: Context, next: any) => {
      // 可以对ctx进行操作,然后放行
      await next()
    }
  ])
  async CreateUser(ctx: Context, args: ParsedArgs<ICreateUserReq>) {

    console.log(args)

  }
}

export {
  MarkdownClass
}