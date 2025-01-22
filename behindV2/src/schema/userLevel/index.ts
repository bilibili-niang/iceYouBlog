import { Column, DataType, Table, HasMany } from 'sequelize-typescript'
import BaseModel from '@/schema/baseModal'
import User from '@/schema/user'

@Table({
  tableName: 'userLevels',
  paranoid: true,
  timestamps: true,
  deletedAt: 'destroyTime',
})
export default class UserLevel extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    comment: '等级名称',
  })
  declare levelName: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '等级值',
  })
  declare levelValue: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否是管理员',
  })
  declare isAdmin: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否是普通用户',
  })
  declare isNormalUser: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否是VIP用户',
  })
  declare isVip: boolean

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: '等级描述',
  })
  declare description: string

  @HasMany(() => User)
  declare users: User[]
}
