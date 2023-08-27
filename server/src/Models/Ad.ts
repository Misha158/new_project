import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Campaign from "./Campaign";
import LineItem from "./LineItem";

export interface IAd {
  id: number;
  status: string;
  title: string;
  campaign_id: number;
  line_item_id: number;
}

@Table({
  tableName: "ads", // Название таблицы в базе данных
  timestamps: false, // Добавляет поля createdAt и updatedAt
})
export class Ad extends Model<IAd> {
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

  ///// LINE ITEM RELATION
  @ForeignKey(() => LineItem) // Определение внешнего ключа
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  line_item_id: number;

  @BelongsTo(() => LineItem) // Определение ассоциации
  line_item: LineItem; // Поле для хранения связанной записи Campaign
}

export default Ad;
