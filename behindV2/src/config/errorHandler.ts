
export default () => async (ctx, next) => {
  console.log('ctx',ctx)

  try {
    await next()
  } catch (error: any) {
    ctx.body = { msg: error?.message, stack: error?.stack }
  }
};
