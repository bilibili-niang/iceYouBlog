import {
  Column,
  DataType,
  Table,
  Length,
  BelongsTo,
  ForeignKey,
  Model,
} from 'sequelize-typescript'

export default class BaseModel extends Model {
  @Column({
    type: DataType.UUID, // 这里使用的是 UUID 类型
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string
}
