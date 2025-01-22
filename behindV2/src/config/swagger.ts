import process from 'node:process'
/*
 * swagger 的一些标题,版本配置
 * */
export const swaggerSpec = {
  info: {
    title: 'API Documentation',
    description: 'API Documentation',
    version: '1.0.0',
  },
  tags: [
    {
      name: 'user',
      description: '用户相关接口',
    },
    {
      name: 'markdown',
      description: 'markdown相关接口',
    },
  ],
  // 添加安全定义
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: '使用 Bearer {token} 格式',
    },
    Auth: {
      type: 'apiKey',
      in: 'header',
      name: 'auth',
      description: '直接传入 token',
    },
    Token: {
      type: 'apiKey',
      in: 'header',
      name: 'token',
      description: '直接传入 token',
    },
  },
}
