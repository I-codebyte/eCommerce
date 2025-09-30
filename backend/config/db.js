import mongoose from "mongoose";

async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("connected to database");
	} catch (error) {
		console.error(`message: ${error}`);
		process.exit(1);
	}
}

export default connectDB;
