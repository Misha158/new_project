import { Request, Response } from "express";
import axios from "axios";

export async function getPosts(req: Request, res: Response) {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const posts = response.data;

    res.json(posts);
  } catch (error) {
    console.error("Ошибка при получении постов:", error);

    res.status(500).json({ error: "Произошла ошибка при получении постов" });
  }
}
