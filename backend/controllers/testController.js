const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.testPost = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      userId: user._id,
    });
  } catch (error) {
    console.error("CREATE USER ERROR:", error);
    res.status(500).json({
      message: "Failed to create user",
    });
  }
};
