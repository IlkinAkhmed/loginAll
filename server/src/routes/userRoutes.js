import { Router } from "express";
const router = Router();
import { deleteUser, getAllUsers, getUserById, login, register, updateUser } from "../controllers/userController.js";

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/register", register);
router.post("/login", login);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

export default router;
