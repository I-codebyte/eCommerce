import asyncHandler from "../middlewares/asyncHandler.js";

const createUser = asyncHandler((req, res) => {
	res.send("I'm alive");
});

export { createUser };
