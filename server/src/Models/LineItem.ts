import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Campaign from "./Campaign";
import Ad from "./Ad";

export interface ILineItem {
  id: number;
  status: string;
  title: string;
  campaign_id: number;
}

@Table({
  tableName: "line_items", // Название таблицы в базе данных
  timestamps: false, // Добавляет поля createdAt и updatedAt
})
export class LineItem extends Model<ILineItem> {
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
  status: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ForeignKey(() => Campaign) // Определение внешнего ключа
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  campaign_id: number;

  @BelongsTo(() => Campaign) // Определение ассоциации
  campaign: Campaign; // Поле для хранения связанной записи Campaign

  @HasMany(() => Ad) // Определение ассоциации
  lineItems: Ad[]; // Поле для хранения связанных записей LineItem
}

export default LineItem; // Экспортируем модель
