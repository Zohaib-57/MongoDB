const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/urlShortener"; // Directly using MongoDB URL

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Wait 5 seconds before failing
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("disconnected", () => {
      console.log("❌ MongoDB Disconnected! Retrying...");
      reconnectDB();
    });

  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

const reconnectDB = async () => {
  setTimeout(connectDB, 5000); // Retry after 5 seconds
};

module.exports = connectDB;
