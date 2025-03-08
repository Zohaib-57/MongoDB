const fs = require("fs");

function logRepRes(filename) {
	return (req, res, next) => {
		fs.appendFile(
			filename,
			`Request: ${req.ip} ${req.method} ${req.url}\n`,
			(err) => {
				if (err) {
					console.error("Error writing to log:", err);
				}
				next();
			}
		);
	};
}

module.exports = {
	logRepRes,
};
