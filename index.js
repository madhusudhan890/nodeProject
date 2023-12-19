require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const {
  connectToDatabase,
  closeDatabaseConnection,
} = require("./dbConnection/mongoDB");

const port = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(routes);
connectToDatabase();

process.on("SIGINT", async () => {
  await closeDatabaseConnection();
  process.exit(0);
});

app.listen(port, (err) => {
  if (err) {
    console.log("Server Error", err);
  } else {
    console.log(`\n>> Server is running at Port ${port}\n`);
  }
});
