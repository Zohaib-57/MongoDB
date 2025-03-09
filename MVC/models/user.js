const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		gender: {
			type: String,
			required: true,
			enum: ["Male", "Female", "Other"],
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
