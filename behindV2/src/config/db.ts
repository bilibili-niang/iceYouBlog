import { Sequelize } from 'sequelize-typescript'
import User from '@/schema/user'
import * as process from 'node:process'

//实例化对象
const seq = new Sequelize(process.env.DATABASE_NAME, process.env.USER_NAME, process.env.DATABASE_PASSWORD, {
    dialect: 'mysql',
    port: Number(process.env.DATABASE_PORT),
    logging: false,
    models: [User]
  })

;(async () => {
  try {
    // 这将会根据模型定义创建或更新表结构
    await seq.sync()
    console.log('Database & tables created!')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()

export default seq