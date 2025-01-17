// 对返回的响应状态进行规范
/*
* 强制传入的数据返回指定的格式
* */
export const ctxBody = (requestBody: any) => {
  const hopeResult = {
    code: 500,
    msg: '响应失败辣',
    success: false,
    data: {}
  }
  return Object.assign(hopeResult, requestBody)
}
/*
* 对传入的对象进行简单的校验
* @param params 目标参数
* @param paramType 模板参数
* */
export const checkDesign = (params: any, paramType: Record<string, {
  required?: boolean,
  validator?: (value: any) => boolean
}>): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const result = {}
      const missing: string[] = []
      const invalid: { [key: string]: string } = {} // 存储无效参数及其原因

      // 遍历模板参数，检查目标参数是否包含对应的键并验证其值
      for (const key in paramType) {
        if (Object.prototype.hasOwnProperty.call(paramType, key)) {
          const { required = true, validator } = paramType[key]
          if (required && (params[key] === undefined || params[key] === null || (typeof params[key] === 'string' && params[key].trim() === ''))) {
            missing.push(key)
          } else if (validator && params[key] !== undefined && !validator(params[key])) {
            invalid[key] = `Invalid value for ${key}`
          } else if (params[key] !== undefined) {
            result[key] = params[key]
          }
        }
      }

      // 检查是否有额外的参数
      const extra: string[] = Object.keys(params).filter(key => !(key in paramType))

      // 使用 Object.assign 将结果和缺失项、无效项合并到一个对象中
      const response = Object.assign({}, { result, missing, invalid, extra })

      // 如果有缺失或无效的参数，可以根据业务逻辑决定是抛出错误还是简单地返回它们
      if (missing.length > 0 || Object.keys(invalid).length > 0 || extra.length > 0) {
        console.warn('Validation issues:', { missing, invalid, extra })
        // 这里可以选择抛出错误或者返回包含问题的结果
        // throw new Error(JSON.stringify({ missing, invalid, extra }));
      }

      resolve(response) // 返回合并后的对象
    } catch (error) {
      reject(error)
    }
  })
}