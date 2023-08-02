import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

import postRouter from "./routers/postRouter";
import todoRouter from "./routers/todoRouter";
import advertisementRouter from "./routers/advertisementRouter";
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
app.use("/advertisement", advertisementRouter);

// Роут для массового создания записей в таблице ads
app.post("/advertisement/createAds", async (req, res) => {
  const adsData = (req.body as Record<string, string | number>[]).reduce<(string | number)[][]>((acc, current) => {
    acc.push([`${current.title}`, `${current.status}`, current.line_item_id, current.campaign_id]);

    return acc;
  }, []);

  try {
    const sql = "INSERT INTO ads (title, status, line_item_id, campaign_id) VALUES ?";

    const result = await pool.promise().query(sql, [adsData]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Произошла ошибка при создании записей.");
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
