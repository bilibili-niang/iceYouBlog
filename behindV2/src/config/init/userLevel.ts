import UserLevel from '@/schema/userLevel'
import { error } from '@/config/log4j'

export const initUserLevel = async () => {
  try {
    // 初始化用户等级
    const defaultUserLevel = await UserLevel.findOne({
      where: {
        levelValue: 1,
        isAdmin: false,
      },
    })

    if (!defaultUserLevel) {
      // 创建默认普通用户等级
      await UserLevel.create({
        levelName: '普通用户',
        levelValue: 1,
        isAdmin: false,
        isDefault: true,
        description: '默认用户等级',
      })
      console.log('Default user level created!')

      // 创建管理员用户等级
      await UserLevel.create({
        levelName: '管理员',
        levelValue: 999,
        isAdmin: true,
        isDefault: false,
        description: '系统管理员',
      })
      console.log('Admin user level created!')
    }
  } catch (e) {
    console.error('初始化用户等级失败')
    error(e)
  }
}
