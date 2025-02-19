const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { name, email, password, flatCode, confirmPassword } = req.body;
  try {
    if (!name || !email || !password || !flatCode) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password and Confirm Password not matched",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    // const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    //   expiresIn: "24h",
    // });
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      flatCode,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    user.token = token;
    await user.save();
    user.password = undefined;
    // create cookiee and send response

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token.options).status(200).json({
      success: true,
      token,
      user,
      message: "Logged in Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};