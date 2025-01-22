import {
  Column,
  DataType,
  Table,
  Length,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript'
import BaseModel from '@/schema/baseModal'
import UserLevel from '@/schema/userLevel'

@Table({
  tableName: 'user',
  paranoid: true,
  // 启用软删除
})
export default class User extends BaseModel {
  @Length({
    min: 2,
    max: 10,
    msg: 'userName must between 2 to 10 characters',
  })
  @Column({
    type: DataType.STRING,
    comment: '用户名称',
  })
  declare userName: string

  @Column({
    type: DataType.STRING,
    comment: '密码',
  })
  declare password: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isEmail: {
        msg: '邮箱格式不正确'
      }
    },
    comment: '用户邮箱',
  })
  declare email: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '用户头像URL',
  })
  declare avatar: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '用户昵称',
  })
  declare nickname: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '个人简介',
  })
  declare bio: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '个人网站',
  })
  declare website: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '所在地',
  })
  declare location: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '社交媒体链接(JSON字符串)',
  })
  declare socialLinks: string

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    comment: '文章数量',
  })
  declare articleCount: number

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    comment: '获得的点赞数',
  })
  declare likesReceived: number

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: '最后登录时间',
  })
  declare lastLoginAt: Date

  @Column({
    type: DataType.ENUM('active', 'inactive', 'banned'),
    defaultValue: 'active',
    comment: '账号状态',
  })
  declare status: string

  @ForeignKey(() => UserLevel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: '用户等级ID',
  })
  declare userLevelId: string

  @BelongsTo(() => UserLevel)
  declare userLevel: UserLevel
}
