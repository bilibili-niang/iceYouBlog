import { v4 as uuidv4 } from 'uuid'
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript'

class BaseModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID, // 使用 UUID 类型
    defaultValue: () => uuidv4().replace(/-/g, ''),
    primaryKey: true, // 设置为主键
    allowNull: false, // 不允许为空
  })
  declare id: string

  @CreatedAt
  @Column({
    type: DataType.DATE,
    comment: '创建时间'
  })
  declare createdAt: Date | null

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    comment: '修改时间'
  })
  declare updatedAt: Date | null

  @DeletedAt
  @Column({
    type: DataType.DATE,
    comment: '删除时间'
  })
  declare deletedAt: Date | null
}

export default BaseModel