import { Router } from "express";
import {
  deleteNews,
  getAllNews,
  getNewsById,
  postNews,
  updateNews,
} from "../controllers/newsController.js";
const newsRouter = Router();

newsRouter.post("/news", postNews);
newsRouter.get("/news/:id", getNewsById);
newsRouter.get("/news", getAllNews);
newsRouter.delete("/news/:id", deleteNews);
newsRouter.put("/news/:id", updateNews);

export default newsRouter;
