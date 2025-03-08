const User = require("../models/user");

async function handleGetAllUser(req, res) {
	try {
		const users = await User.find();
		res.json({ users });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function handleGetUserById(req, res) {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json({ user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function handleUpdateUserById(req, res) {
	try {
		await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json({ message: "User updated" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function handleDeleteUserById(req, res) {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.json({ message: "User deleted" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function handleCreateNewUser(req, res) {
	try {
		const { first_name, last_name, email, password, gender } = req.body;

		if (!first_name || !last_name || !email || !password || !gender) {
			return res.status(400).json({ message: "Invalid input" });
		}

		const newUser = await User.create({
			first_name,
			last_name,
			email,
			password,
			gender,
		});

		res.json({ message: "User created", id: newUser._id });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	handleGetAllUser,
	handleGetUserById,
	handleUpdateUserById,
	handleDeleteUserById,
	handleCreateNewUser,
};
