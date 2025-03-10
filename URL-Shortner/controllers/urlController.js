const Url = require("../models/Url");
const shortid = require("shortid");

// Shorten URL
exports.shortenUrl = async (req, res) => {
	const { originalUrl } = req.body;
	const shortUrl = shortid.generate(); // Generate a short unique ID

	try {
		const newUrl = new Url({ originalUrl, shortUrl });
		await newUrl.save();
		res.json({ shortUrl });
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

// Redirect to Original URL
exports.redirectUrl = async (req, res) => {
	try {
		const url = await Url.findOne({ shortUrl: req.params.shortUrl });
		if (url) {
			res.redirect(url.originalUrl);
		} else {
			res.status(404).json({ error: "URL not found" });
		}
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};
