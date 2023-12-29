import { Router } from "express";
import {
  getAllNews,
  getNewsById,
  postNews,
} from "../controllers/newsController.js";
const newsRouter = Router();

newsRouter.post("/news", postNews);
newsRouter.get("/news/:id", getNewsById);
newsRouter.get("/news", getAllNews);

export default newsRouter;
