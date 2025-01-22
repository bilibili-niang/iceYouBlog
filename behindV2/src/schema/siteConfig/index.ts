import { Column, DataType, Table } from 'sequelize-typescript'
import BaseModel from '@/schema/baseModal'

@Table({
  tableName: 'siteConfig',
  paranoid: true,
  timestamps: true,
  deletedAt: 'destroyTime',
})
export default class SiteConfig extends BaseModel {
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否开启网站注册',
  })
  declare enableRegister: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否开启网站头图',
  })
  declare enableHeaderImage: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否开启评论功能',
  })
  declare enableComment: boolean

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '网站标题',
  })
  declare siteTitle: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '网站描述',
  })
  declare siteDescription: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '网站关键词',
  })
  declare siteKeywords: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '网站备案号',
  })
  declare siteBeian: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '最后修改人ID',
  })
  declare lastModifiedBy: string
}
