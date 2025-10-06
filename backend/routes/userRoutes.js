import express from "express";
import {
	createUser,
	loginUser,
	logoutUser,
	getAllUsers,
	getCurrentUserProfile,
	updateUser,
	deleteUserById,
	getUserById,
	updateUserById,
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

router.route("/:id")
	.delete(authenticatedUser, authorizedUser, deleteUserById)
	.get(authenticatedUser, authorizedUser, getUserById)
	.put(authenticatedUser, authorizedUser, updateUserById);

export default router;
