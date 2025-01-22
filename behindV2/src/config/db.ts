import { Sequelize } from 'sequelize-typescript'
import User from '@/schema/user'
import UserLevel from '@/schema/userLevel'
import SiteConfig from '@/schema/siteConfig'
import * as process from 'node:process'
import MarkdownFile from '@/schema/markdown'
import { error } from '@/config/log4j'
import { initUserLevel } from './init/userLevel'
import { initSiteConfig } from './init/siteConfig'

//实例化对象
const seq = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.USER_NAME,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'mysql',
    port: Number(process.env.DATABASE_PORT),
    logging: false,
    models: [UserLevel, User, SiteConfig, MarkdownFile],
  }
)

;(async () => {
  try {
    // 这将会根据模型定义创建或更新表结构
    await seq.sync()
    console.log('Database & tables created!')

    // 初始化各个表的默认数据
    await Promise.all([
      initUserLevel(),
      initSiteConfig()
    ])
  } catch (e) {
    console.error('连接到数据库失败辣')
    error(e)
  }
})()

export default seq
