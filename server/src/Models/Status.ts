import { Table, Column, Model, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import LineItem from "./LineItem";
import Campaign from "./Campaign";
import Ad from "./Ad";

export interface IStatus {
  id: number;
  status: string;
  title: string;
}

@Table({
  tableName: "statuses",
  timestamps: false,
})
export class Status extends Model<IStatus> {
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

  // Пример связи "один ко многим" (One-to-Many) с моделью Campaign
  @HasMany(() => Campaign)
  campaigns: Campaign[];

  // Пример связи "один ко многим" (One-to-Many) с моделью LineItem
  @HasMany(() => LineItem)
  lineItems: LineItem[];

  // Пример связи "один ко многим" (One-to-Many) с моделью Ad
  @HasMany(() => Ad)
  ads: Ad[];
}
