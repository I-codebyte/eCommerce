import jwt from "jsonwebtoken";

function createToken(res, userID) {
	const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

	res.cookie("jwt", token, {
		maxAge: 60 * 60 * 24 * 30 * 1000,
		sameSite: "strict",
		secure: process.env.NODE_ENV != "development",
		httpOnly: true,
	});

	// return token;
}

export default createToken;
