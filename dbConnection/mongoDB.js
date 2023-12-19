const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/your_database_name";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { maxPoolSize: 10 });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const closeDatabaseConnection = async () => {
  await mongoose.connection.close();
  console.log("Closed MongoDB connection");
};

module.exports = { connectToDatabase, closeDatabaseConnection };
