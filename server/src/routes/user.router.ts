import express from "express"
import { login, logout, signup } from "../controllers/user.controller";
export const UserAuthRouter = express.Router();

UserAuthRouter.post("/signup", signup);
UserAuthRouter.post("/login", login);
UserAuthRouter.post("/logout", logout);
