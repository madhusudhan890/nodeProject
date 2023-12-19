const User = require("../models/userModel");
const redis = require("ioredis");
const client = new redis();
const nodemailer = require("nodemailer");

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
    sendEmail("Web app Operation Error", `Error: ${error.message}`);
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.fetchData = async (req, res) => {
  try {
    let data = await User.find({}, { userName: 1, email: 1, userCode: 1 });
    res.status(200).json({
      data,
    });
  } catch (error) {
    sendEmail("Web app Operation Error", `Error: ${error.message}`);
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
    // sendEmail("Web app Operation Error", `Error: ${error.message}`);
    // if (error instanceof Error) {
    //   console.log({ message: "MongoDB Error", error: error.message });
    //   res
    //     .status(500)
    //     .json({ message: "An error occurred while performing the operation." });
    // } else {
    //   console.log(error);
    //   res.status(500).json({ message: "Internal Server Error" });
    // }
  }
};

exports.dataWithCredentials = async (req, res) => {
  try {
    let email = "madhu1233@gmail.com";
    let password = "madhu1234";
    let data = await User.findOne(
      { email, password },
      { userName: 1, email: 1, userCode: 1 }
    ).hint({ email: 1, password: 1 }); //used to remaind which indeixing is referring
    res.status(200).json({
      data,
    });
  } catch (error) {
    sendEmail("Web app Operation Error", `Error: ${error.message}`);
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.dataWithCache = async (req, res) => {
  // ----------------------------using redis and mongodb indexing----------------------
  try {
    let email = "madhu1233@gmail.com";
    let password = "madhu1234";
    // let email = "damgood@gmail.com";
    // let password = "damgood";
    const cachedData = await client.get(email);
    if (cachedData) {
      // console.log("Object retrieved from Redis");
      res.status(200).json({
        data: JSON.parse(cachedData),
      });
    } else {
      let data = await User.find(
        { email, password },
        { userName: 1, email: 1, userCode: 1 }
      ).hint({ email: 1, password: 1 });

      const dd = await client.set(email, JSON.stringify(data), "Ex", 3600);
      // console.log("Data fetched from MongoDB", dd);

      res.status(200).json({
        data,
      });
    }
  } catch (error) {
    sendEmail("Web app Operation Error", `Error: ${error.message}`);
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// sending mail to respective owner when something goes worng with database//

const transporter = nodemailer.createTransport({
  service: "gmail",
  // host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.FROMEMAIL,
    pass: process.env.EMAILPASSWORD,
  },
});

function sendEmail(subject, text) {
  const mailOptions = {
    from: process.env.FROMEMAIL,
    to: process.env.TOEMAIL,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
