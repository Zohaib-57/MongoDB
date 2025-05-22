// server.js
const express = require("express");
const connectDB = require("./db");
const User = require("./models/userModel");
const Post = require("./models/postModel");
const upload = require("./middleware/upload");
const path = require("path");
const fs = require("fs");
const postRoutes = require("./routes/postRoutes");

const app = express();

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recusrsive: true });
	console.log("Uploads directory created");
}
app.use(express.json());
app.use("/", postRoutes);

// Connect to MongoDB
connectDB();

// POST route to create user + post dynamically
app.post("/create-post", async (req, res) => {
	try {
		const { name, email, title, content } = req.body;
		if (!name || !email || !title || !content) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const user = await User.create({ name, email });

		const post = await Post.create({
			title,
			content,
			user: user._id,
		});

		res.status(201).json({ message: "User and post created", user, post });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// GET route to fetch posts with user data populated
app.get("/posts", async (req, res) => {
	try {
		const posts = await Post.find().populate("user", "name email");
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
