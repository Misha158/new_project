import { Table, Column, Model, DataType } from "sequelize-typescript";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar_url: string;
}

@Table({
  tableName: "users", // Название таблицы в базе данных
  timestamps: false, // Добавляет поля createdAt и updatedAt
})
export class User extends Model<IUser> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  avatar_url: string;
}
