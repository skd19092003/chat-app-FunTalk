import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//we are not going to give access to everyone to update profile so we will use protectRoute middleware
//only logged in users can update their profile
//for protectroute use middleware we have to pass it as second argument before controller function
router.put("/update-profile", protectRoute, updateProfile);
//.put means we are updating some existing data

router.get("/check", protectRoute, checkAuth);

export default router;
