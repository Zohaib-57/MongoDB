const Url = require("../models/Url");
const shortid = require("shortid");

// Shorten URL
exports.shortenUrl = async (req, res) => {
	try {
		const { originalUrl } = req.body;
		console.log("Received URL:", originalUrl);

		if (!originalUrl) {
			return res.status(400).json({ error: "Original URL is required" });
		}

		const shortUrl = shortid.generate(); // Generate a short unique ID
		console.log("Generated Short URL:", shortUrl);

		const newUrl = new Url({ originalUrl, shortUrl });
		await newUrl.save();

		console.log("✅ URL Saved in Database:", newUrl);
		res.json({ shortUrl: `http://localhost:5000/api/url/${shortUrl}` });
	} catch (err) {
		console.error("❌ Error in shortenUrl:", err);
		res.status(500).json({ error: "Server error", details: err.message });
	}
};
// Redirect to Original URL
exports.redirectUrl = async (req, res) => {
	try {
		console.log("Short URL Requested:", req.params.shortUrl);

		const url = await Url.findOne({ shortUrl: req.params.shortUrl });

		if (!url) {
			console.log("❌ URL not found in Database!");
			return res.status(404).json({ error: "URL not found" });
		}

		console.log("✅ Redirecting to:", url.originalUrl);
		res.redirect(url.originalUrl);
	} catch (err) {
		console.error("❌ Error in redirectUrl:", err);
		res.status(500).json({ error: "Server error", details: err.message });
	}
};
