import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;
	const existingUser = await User.findOne({ email });
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	const newUser = new User({ username, email, password: hashedPassword });

	if (!username || !email || !password) {
		res.status(400);
		throw new Error("All field are required!");
	}

	if (existingUser)
		res.status(409).send(`user with ${email} already exist.`);

	try {
		await newUser.save();
		createToken(res, newUser._id);
		res.status(201).send(newUser);
	} catch (error) {
		res.status(400);
	}
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		const isPasswordValid = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (isPasswordValid) {
			createToken(res, existingUser._id);
			res.status(200).json({
				_id: existingUser._id,
				username: existingUser.username,
				email: existingUser.email,
				isAdmin: existingUser.isAdmin,
			});
		} else {
			res.status(404);
			throw new Error("incorrect password");
		}
	} else {
		res.status(404).send("email is incorrect");
	}
});

const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
	res.status(200).send("logged out successfully");
});

const getAllUsers = asyncHandler(async (req, res) => {
	const allUsers = await User.find({});
	res.status(200).send(allUsers);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
	const user = req.user

	if (user) {
		res.status(200).send(user);
	} else {
		res.status(403);
		throw new Error("login to access your profile...🙄🙄");
	}
});

const updateUser = asyncHandler(async (req, res) => {
	const user = req.user;

	if (user) {
		user.username = req.body.username || user.username;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			const salt = bcrypt.genSalt(10);
			user.password =
				bcrypt.hash(req.body.password, salt) ||
				user.password;
		}

		await user.save();
		res.status(200).send(user);
	}
});

const deleteUserById = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const user = await User.findById(id);

	if (user) {
		if (user.isAdmin) {
			res.status(400);
			throw new Error(
				"admin is a top G and cannot be deleted 😉😉😉"
			);
		}
		await User.deleteOne({ _id: id });
		res.status(202).json({ message: `user removed` });
	} else {
		res.status(404).json({ message: "user not found 😒" });
	}
});

const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password");

	if (user) {
		res.status(200).send(user);
	} else {
		res.status(404).json({ message: "user not found 😒" });
	}
});

const updateUserById = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select(
			"-password"
		);

		if (user) {
			user.username = req.body.username || user.username;
			user.email = req.body.email || user.email;
			user.isAdmin = Boolean(req.body.isAdmin);

			const updatedUser = await user.save();
			res.status(201).send(updatedUser);
		} else {
			res.status(404).json({ message: "user not found 😒" });
		}
	} catch (error) {
		res.status(403);
		throw new Error("Invalid user ID");
	}
});

export {
	createUser,
	loginUser,
	logoutUser,
	getAllUsers,
	getCurrentUserProfile,
	updateUser,
	deleteUserById,
	getUserById,
	updateUserById,
};
