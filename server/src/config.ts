import { PoolOptions } from "mysql2";
import { SequelizeOptions } from "sequelize-typescript/dist/sequelize/sequelize/sequelize-options";

export const mysql12Config: PoolOptions = {
  host: "localhost",
  user: "root", // замените на имя пользователя MySQL
  password: "", // замените на пароль пользователя MySQL
  database: "misha", // замените на имя вашей базы данных MySQL
};

export const sequelizeConfig: SequelizeOptions = {
  dialect: "mysql",
  username: "root",
  password: "",
  database: "misha",
  host: "localhost",
};
