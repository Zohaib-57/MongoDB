// routes/postRoutes.js
const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");
const upload = require("../middleware/upload");

// Upload routezzzzz
router.post("/posts", upload.single("image"), async (req, res) => {
	try {
		console.log("req.body:", req.body);
		console.log("req.file:", req.file);

		const { title, content, userId } = req.body;

		const post = new Post({
			title,
			content,
			image: req.file?.filename || null,
			user: userId,
		});

		await post.save();

		res.status(201).json({ message: "Post created", post });
	} catch (error) {
		console.error("Post creation error:", error);
		res
			.status(500)
			.json({ message: "Error creating post", error: error.message });
	}
});
console.log("POST /posts endpoint hit");

module.exports = router;
