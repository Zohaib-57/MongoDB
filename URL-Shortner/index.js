const express = require("express");
const connectDB = require("./config/db");

connectDB(); // Call the function to connect

const app = express();
app.use(express.json());

app.use("/api/url", require("./routes/urlRoutes"));

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
