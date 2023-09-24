import express from "express";
import { Sequelize } from "sequelize-typescript";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { sequelizeConfig } from "./config";

import postRouter from "./routers/postRouter";
import advertisementRouter from "./routers/advertisementRouter";
import authRouter from "./routers/authRouter";
import uploadRoute from "./routers/upload";

import Campaign from "./Models/Campaign";
import LineItem from "./Models/LineItem";
import Ad from "./Models/Ad";
import { Status } from "./Models/Status";
import { User } from "./Models/User";
import { mockHandleSelectOptions } from "./mocks/selectOptions";

const app = express();
app.use(cookieParser());

const port = 3000;
dotenv.config();
export const sequelize = new Sequelize(sequelizeConfig);

const connectToDataBase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectToDataBase();

sequelize.addModels([Campaign, LineItem, Ad, Status, User]); // Добавление модели в список моделей Sequelize

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
// Разрешаем запросы с разных доменов
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

// Используем маршрутизатор для постов
app.use("/posts", postRouter);
app.use("/advertisement", advertisementRouter);
app.use("/auth", authRouter);
app.use("/uploads", uploadRoute);

app.get("/options", mockHandleSelectOptions);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
