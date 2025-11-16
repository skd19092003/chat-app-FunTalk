import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

//only auth users can use it ,protected route this will give us users on side bar 
router.get("/users", protectRoute, getUsersForSidebar);
//only auth users can use it ,protected route this will give us messages of each users
router.get("/:id", protectRoute, getMessages); 

router.post("/send/:id", protectRoute, sendMessage);

export default router;
  