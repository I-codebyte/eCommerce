import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticatedUser = asyncHandler(async (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET
			);
			req.user = await User.findById(decoded.userID);
		} catch (error) {
			res.status(401);
			throw new Error(
				"authentication failed.. Invalid token"
			);
		}
		next();
	} else {
		res.status(401);
		throw new Error("no token provided");
	}
});

const authorizedUser = asyncHandler(async (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error("unauthoried");
	}
});

export { authorizedUser, authenticatedUser };
