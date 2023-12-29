import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import router from "./src/routes/userRoutes.js";
import newsRouter from "./src/routes/newsRoutes.js";

const app = express();
app.use(cors());
app.use(json());
const port = 8000;
app.use("/", router);
app.use("/", newsRouter);

connect(
  "mongodb+srv://loginAndRegister:ilkin123@cluster0.ghwwmer.mongodb.net/"
).catch((error) => console.log("db not connect" + error));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
