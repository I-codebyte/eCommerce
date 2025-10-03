import express from "express";
import {
	createUser,
	loginUser,
	logoutUser,
	getAllUsers,
} from "../controllers/userController.js";
import {
	authorizedUser,
	authenticatedUser,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router.get("/", authenticatedUser, authorizedUser, getAllUsers);

export default router;
