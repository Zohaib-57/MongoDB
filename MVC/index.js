const express = require("express");
const { connectMongoDb } = require("./connection");
const { logRepRes } = require("./middleware");
const userRouter = require("./routes/user");

const app = express();
const port = 3000;
const mongoDbUrl = "mongodb://127.0.0.1:27017/userDB";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use(logRepRes("log.txt"));

connectMongoDb(mongoDbUrl);
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
