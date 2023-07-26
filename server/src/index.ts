import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

import postRouter from "./routers/postRouter";
import todoRouter from "./routers/todoRouter";
import { dbConfig } from "./config";

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
