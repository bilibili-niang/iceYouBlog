import process from 'node:process'
/*
* swagger 的一些标题,版本配置
* */
export const swaggerSpec={
  info: {
    title: process.env.PROJECT_NAME,
    version: 'v1.0',
  },
}