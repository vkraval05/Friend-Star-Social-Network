import express from "express";
import { getStories, addStory } from "../controllers/story.js";

const router = express.Router();

router.get("/", getStories)
router.post("/", addStory)
// router.delete("/", deleteStory)


export default router