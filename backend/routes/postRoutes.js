import express from "express";
import PostControllers from "../controllers/PostControllers.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const route = express.Router();

route.post("/post", isAuthenticatedUser, PostControllers.CreatePost);
route.get("/get/posts", PostControllers.getAllPosts);
route.put("/:id/likePost", PostControllers.likedPost);
route.get(`/posts/tag/:tag`, PostControllers.tagPostGet);
route.delete(
  "/product/:id",
  isAuthenticatedUser,
  PostControllers.deleteProduct
);
export default route;
