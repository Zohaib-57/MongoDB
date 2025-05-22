const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
	cloud_name: "ddx0il9vl",
	api_key: "796862779952648",
	api_secret: "8dURtEe-3lrmDrM2ZgV3cBTNl-c",
});

const imagePath = path.resolve(__dirname, "images/MERN.jpg");

cloudinary.uploader.upload(
	imagePath,
	{ public_id: "My-images" },
	function (error, result) {
		if (error) {
			console.error("Error uploading image:", error);
		} else {
			console.log("Image uploaded successfully:", result);
		}
	}
);
