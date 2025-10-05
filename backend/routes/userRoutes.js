import express from "express";
import {
	createUser,
	loginUser,
	logoutUser,
	getAllUsers,
	getCurrentUserProfile,
	updateUser,
} from "../controllers/userController.js";
import {
	authorizedUser,
	authenticatedUser,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
	.post(createUser)
	.get(authenticatedUser, authorizedUser, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router.route("/profile")
	.get(authenticatedUser, getCurrentUserProfile)
	.put(authenticatedUser, updateUser);

export default router;
