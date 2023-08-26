import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

import postRouter from "./routers/postRouter";
import todoRouter from "./routers/todoRouter";
import advertisementRouter from "./routers/advertisementRouter";
import { dbConfig } from "./config";
import { Sequelize } from "sequelize";

const app = express();
const port = 3000;

const sequelize = new Sequelize({
  dialect: "mysql",
  username: "root",
  password: "",
  database: "misha",
  host: "localhost",
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Создаем пул подключения к базе данных
export const pool = mysql2.createPool(dbConfig);

// Проверка подключения к базе данных
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err);
    return;
  }
  console.log("Успешное подключение к базе данных!");
  connection.release(); // Возвращаем соединение в пул
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Разрешаем запросы с разных доменов
app.use(cors());

// Используем маршрутизатор для постов
app.use("/posts", postRouter);
app.use("/", todoRouter);
app.use("/advertisement", advertisementRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
