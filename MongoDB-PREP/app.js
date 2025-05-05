const express = require("express");
const app = express();
const userModel = require("./userModel");

// Middleware to parse JSON (important if you send POST data later)
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/create", async (req, res) => {
	try {
		const createdUser = await new userModel({
			name: "Zohaib",
			username: "zohaib123",
			email: "zohaib89@gmail.com",
		}).save();

		res.status(201).send(createdUser); // send the saved user
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

app.get("/update", async (req, res) => {
	try {
		const updatedUser = await userModel.findOneAndUpdate(
			{ username: "zohaib123" },
			{
				name: "Zohaib Abbas",
			},
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).send({ message: "User not found" });
		}

		res.status(200).send(updatedUser); // Send updated user
	} catch (err) {
		res.status(500).send({ error: err.message }); // Handle errors
	}
});

app.get("/read", async (req, res) => {
	//   let user = await  userModel.findOne({username:"zohaib123"});

	let user = await userModel.find();
	res.send(user);
});

app.get("/delete", async (req, res) => {
	let user = await userModel.findOneAndDelete({ username: "alikhan123" });
	res.send(user);
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

// Operatores in MongoDB;
// $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin -> comparision operatores
// $and, $or, $not, $nor, $exists, $type  ->logical operatores
// aggregation operators
// $sum, $avg, $min, $max, $push, $addToSet -> array operatores
// $lookup, $unwind, $group, $project ,$redact, $replaceRoot, $replaceWith, $sample ->pipeline operatores
// $merge, $out -> write operatores
// $currentDate, $inc, $set, $unset, $rename -> update operatores
// $expr, $jsonSchema, $where -> expression operatores
// $geoIntersects, $geoWithin, $near, $nearSphere -> geospatial operatores
// $bit, $currentOp, $comment, $mergeObjects -> other operatores
