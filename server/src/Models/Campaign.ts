import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import LineItem from "./LineItem";

@Table({
  tableName: "campaigns", // Название таблицы в базе данных
  timestamps: false, // Добавляет поля createdAt и updatedAt
})
export class Campaign extends Model {
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

  @HasMany(() => LineItem) // Определение ассоциации
  lineItems: LineItem[]; // Поле для хранения связанных записей LineItem
}

export default Campaign; // Экспортируем модель
