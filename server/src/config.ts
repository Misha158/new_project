import { PoolOptions } from "mysql2";

export const dbConfig: PoolOptions = {
  host: "localhost",
  user: "root", // замените на имя пользователя MySQL
  password: "", // замените на пароль пользователя MySQL
  database: "misha", // замените на имя вашей базы данных MySQL
};
