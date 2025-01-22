import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'
import { ctxBody } from '@/utils'

export const authMiddleware = async (ctx: Context, next: Next) => {
  // 支持多种 token header
  const authHeader =
    ctx.headers.authorization?.split(' ')[1] ||
    (ctx.headers.auth as string) ||
    (ctx.headers.token as string)

  const token = typeof authHeader === 'string' ? authHeader : undefined

  if (!token) {
    ctx.body = ctxBody({
      success: false,
      code: 401,
      msg: '未登录，请先登录',
      data: null,
    })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    ctx.state.user = decoded
    await next()
  } catch (error) {
    ctx.body = ctxBody({
      success: false,
      code: 401,
      msg: 'token无效或已过期',
      data: null,
    })
  }
}
