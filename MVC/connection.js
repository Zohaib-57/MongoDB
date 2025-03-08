const mongoose = require("mongoose");

async function connectMongoDb(url) {
	try {
		await mongoose.connect(url);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("MongoDB Connection Error:", error.message);
		process.exit(1);
	}
}

module.exports = { connectMongoDb };
