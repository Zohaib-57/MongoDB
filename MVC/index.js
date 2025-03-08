const express = require("express");
const { connectMongoDb } = require("./connection"); // ✅ Import connection function
const { logRepRes } = require("./middleware");
const userRouter = require("./routes/user");

const app = express();
const port = 3000;
const mongoDbUrl = "mongodb://127.0.0.1:27017/userDB"; // ✅ Ensure correct DB name

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use(logRepRes("log.txt"));

// ✅ Connect to MongoDB only once before starting the server
connectMongoDb(mongoDbUrl)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((error) => {
		console.error("MongoDB Connection Error:", error.message);
		process.exit(1);
	});
