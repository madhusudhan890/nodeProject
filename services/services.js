const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    const data = await User.create({
      userName: userName,
      password: password,
      email: email,
    });
    res.status(200).json({
      message: "Successfull",
    });
  } catch (error) {
    console.log(error);
  }
};
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
