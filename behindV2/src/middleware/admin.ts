import { Context, Next } from 'koa'
import { ctxBody } from '@/utils'
import User from '@/schema/user'
import UserLevel from '@/schema/userLevel'

export const adminMiddleware = async (ctx: Context, next: Next) => {
  const user = ctx.state.user

  const userWithLevel = await User.findOne({
    where: { id: user.id },
    include: [
      {
        model: UserLevel,
        attributes: ['isAdmin'],
      },
    ],
  })

  if (!userWithLevel?.userLevel?.isAdmin) {
    ctx.body = ctxBody({
      success: false,
      code: 403,
      msg: '需要管理员权限',
      data: null,
    })
    return
  }

  await next()
}
