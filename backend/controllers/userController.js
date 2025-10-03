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

	if (email) {
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
		}
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

export { createUser, loginUser, logoutUser, getAllUsers };
