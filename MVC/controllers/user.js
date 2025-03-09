const User = require("../models/user");

//create new user
async function handleGetAllUser(req, res) {
	try {
		const users = await User.find();
		res.json({ users });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

//get all the user of the database
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

// update the user
async function handleUpdateUserById(req, res) {
	try {
		await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json({ message: "User updated" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

//delete the user
async function handleDeleteUserById(req, res) {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.json({ message: "User deleted" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

//create a new user
async function handleCreateNewUser(req, res) {
	try {
		const { first_name, last_name, email, password, gender } = req.body;

		if (!first_name || !last_name || !email || !gender) {
			return res.status(400).json({ message: "Invalid input" });
		}

		const newUser = await User.create({
			first_name,
			last_name,
			email,
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
