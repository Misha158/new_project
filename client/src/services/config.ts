import originAxios from "axios";

export const axios = originAxios.create({
  baseURL: "http://localhost:3000", // Замените на свой базовый URL
});
