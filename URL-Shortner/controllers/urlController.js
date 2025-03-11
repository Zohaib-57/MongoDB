const Url = require("../models/Url");
const shortid = require("shortid");

// Shorten URL
exports.shortenUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        if (!originalUrl) {
            return res.status(400).json({ error: "Original URL is required" });
        }

        let url = await Url.findOne({ originalUrl });
        if (url) {
            return res.json({ shortUrl: `http://localhost:5000/api/url/${url.shortUrl}` });
        }

        const shortUrl = shortid.generate();
        url = new Url({ originalUrl, shortUrl });
        await url.save();

        res.json({ shortUrl: `http://localhost:5000/api/url/${shortUrl}` });
    } catch (err) {
        console.error("❌ Error in shortenUrl:", err);
        res.status(500).json({ error: "Server error" });
    }
};

// Redirect to Original URL
exports.redirectUrl = async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });
        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }
        res.redirect(url.originalUrl);
    } catch (err) {
        console.error("❌ Error in redirectUrl:", err);
        res.status(500).json({ error: "Server error" });
    }
};