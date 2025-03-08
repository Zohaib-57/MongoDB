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
		email: { type: String, required: true, unique: true },
		password: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
			enum: ["Male", "Female", "Other"],
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
