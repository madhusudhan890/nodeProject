const User = require("../models/userModel");

exports.fetchData = async (req, res) => {
  try {
    let data = await User.find({}, { userName: 1, email: 1, userCode: 1 });
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Internal Server Error");
  }
};
