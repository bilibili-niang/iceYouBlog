import {
  Column,
  DataType,
  Table,
  Length,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript'
import BaseModel from '@/schema/baseModal'
import User from '@/schema/user'

@Table({
  tableName: 'markdownFiles', // 表名，通常会自动添加复数形式，所以这里直接写成复数形式。
  paranoid: true, // 启用软删除
  timestamps: true, // 如果需要创建和更新时间戳，默认是true
  deletedAt: 'destroyTime', // 自定义删除时间字段名为 destroyTime
})
export default class MarkdownFile extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'adminEmail',
    comment: '拥有者邮箱',
  })
  declare email: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '文章名称',
  })
  declare title: string

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: '文章内容',
    comment: '文章内容',
  })
  declare content: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '文章的状态: 0草稿,1发布,2私密',
  })
  declare states: number

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '文章的描述',
  })
  declare description: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '文章的点赞数量',
  })
  declare praise: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '0',
    comment: '文章的浏览量',
  })
  declare view: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '1',
    comment: '文章的审核,1通过,0未通过',
  })
  declare audit: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '文章的标签1',
  })
  declare tag1: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '文章的标签2',
  })
  declare tag2: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '文章的标签3',
  })
  declare tag3: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '文章来源,如果是来自于其他网站,则从其他网站上爬取',
  })
  declare source: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '文章链接',
  })
  declare url: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '/images/headImg/defaultHeadImg.png',
    comment: '文章自定义头图,如果没有则会加载默认,是否使用默认由前端来判断',
  })
  declare headImg: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'blog',
    comment: '文章类型,默认为blog',
  })
  declare type: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'blog',
    comment: '是否有源头',
  })
  declare hasOriginal: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '0',
    comment: '点赞数量',
  })
  declare diggCount: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'blog',
    comment: '文章类型',
  })
  declare articleType: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '文章置顶等级',
  })
  declare recommendLevel: number

  @BelongsTo(() => User, 'userId')
  declare user: User

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '用户ID',
  })
  declare userId: string
}
