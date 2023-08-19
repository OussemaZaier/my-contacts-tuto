const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

//@desc Create user
//@path POST /api/users/register
//@access Private
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //one field is missing
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  //user exist 'email' must be unique
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("user exists already!");
  }

  //everything is okay
  //hash the pwd with bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    res.status(201).json({
      status: "success",
      message: "user added successfuly",
      data: {
        _id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } else {
    //something went wrong
    res.status(400);
    throw new Error("user data not valid!");
  }
});

//@desc Login user
//@path POST /api/users/login
//@access Private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        user: { _id: user.id, username: user.username, email: user.email },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "60min" }
    );
    res.status(200).json({ token });
  } else {
    res.status(400);
    throw new Error("email or password are wrong");
  }
});

//@desc verify token
//@path GET /api/users/verify
//@access Private
const verifyUser = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "token verified successfuly",
    data: null,
  });
};

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
};
