import express from "express";
import { getAllPosts, getPosts, addPost, deletePost } from "../controllers/post.js";

const router = express.Router();

router.get("/allPost", getAllPosts);
router.get("/:id", getPosts);
router.post("/", addPost);
router.delete("/", deletePost);



export default router