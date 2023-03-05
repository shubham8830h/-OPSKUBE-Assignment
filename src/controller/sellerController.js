const { find } = require("../models/booksModel");
const jwt = require("jsonwebtoken");
const sellerModel = require("../models/sellerModel");

//post seller
const postSeller = async (req, res) => {
  try {
    const { name, email, password, phoneNo } = req.body;

    let sellerData = await sellerModel.create(req.body);
    return res.status(201).send({
      status: true,
      message: "successfull created...",
      data: sellerData,
    });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

//get seller api
const getSeller = async (req, res) => {
  try {
    let sellerData = await sellerModel.find();
    return res.status(200).send({
      Data: sellerData,
    });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

//login api
const loginUser = async function (req, res) {
  try {
    let data = req.body;
    const { email, password } = data;

    const ValidCheck = function (value) {
      if (Object.keys(value).length > 0) return true;
      return false;
    };

    if (!ValidCheck(data))
      return res
        .status(400)
        .send({ status: false, msg: "Email and Password Required !" });

    if (!email)
      return res.status(400).send({ status: false, msg: "email is required" });

    if (!password)
      return res
        .status(400)
        .send({ status: false, msg: "password is required" });

    const user = await sellerModel.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .send({ status: false, msg: "Email is Invalid Please try again !!" });

    // const verifyPassword = await sellerModel.find({password, user.password});

    // if (!verifyPassword)
    //   return res.status(400).send({
    //     status: false,
    //     msg: "Password is Invalid Please try again !!",
    //   });

    // Creating Token Using JWT //
    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      "private_key"
    );

    res.setHeader("x-api-key", token);

    let obj = {
      userId: user._id,
      name: user.name,
      token: token,
      password: user.password,
      email: user.email,
    };

    res
      .status(200)
      .send({ status: true, message: "User login ......", data: obj });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { postSeller, getSeller, loginUser };
