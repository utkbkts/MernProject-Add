import express from "express";
import UserControllers from "../controllers/UserControllers.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const route = express.Router();

route.post("/register", UserControllers.registerUser);
route.post("/login", UserControllers.loginUser);
route.get("/logout", UserControllers.logoutUser);
route.get("/me/profile", isAuthenticatedUser, UserControllers.getUserProfile);

export default route;
