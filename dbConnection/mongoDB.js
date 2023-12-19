const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/your_database_name";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      connectTimeoutMS: 10000, //used this to elimate db queries which taking more time than required.
      maxPoolSize: 100, // by default 5 connections will be there.For max gains it is increasing to 100
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const closeDatabaseConnection = async () => {
  await mongoose.connection.close();
  console.log("Closed MongoDB connection"); //closing mongodb connection when serer is shutdown.
};

module.exports = { connectToDatabase, closeDatabaseConnection };
