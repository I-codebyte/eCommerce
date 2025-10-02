import jwt from "jsonwebtoken";

function createToken(res, userID) {
	const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

	res.cookie("jwt", token, {
		maxAge: "30d",
		sameSite: true,
		secure: process.env.NODE_ENV != "development",
		httpOnly: true,
	});

	return token;
}

export default createToken;
