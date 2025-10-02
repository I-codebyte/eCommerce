import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const createUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;
	const existingUser = await User.findOne({ email });
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	const newUser = new User({ username, email, password: hashedPassword });

	if (!username || !email || !password) {
		throw new Error("All field are required!");
	}

	if (existingUser) {
		throw new Error(`user with ${email} already exists`);
	}

	try {
		await newUser.save();
		res.status(201).send(newUser);
	} catch (error) {
		res.status(400);
	}
});

export { createUser };
