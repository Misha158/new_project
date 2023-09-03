import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import LineItem from "./LineItem";
import Status from "./Status";

export interface ICampaign {
  id: number;
  status: string;
  title: string;
}

@Table({
  tableName: "campaigns", // Название таблицы в базе данных
  timestamps: false, // Добавляет поля createdAt и updatedAt
})
export class Campaign extends Model<ICampaign> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ForeignKey(() => Status) // Определение внешнего ключа
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status_id: number;

  @BelongsTo(() => Status) // Определение связи
  status: Status; // Свойство, в котором будет храниться связанный статус

  @HasMany(() => LineItem) // Определение ассоциации
  lineItems: LineItem[]; // Поле для хранения связанных записей LineItem
}

export default Campaign; // Экспортируем модель
