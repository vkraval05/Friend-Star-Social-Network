import express from "express";
import { getUser, updateUser, getAllUser, getNonFolower } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:id", getUser)
router.put("/", updateUser)
router.get("/all", getAllUser)
router.get("/nonFollow", getNonFolower)

export default router