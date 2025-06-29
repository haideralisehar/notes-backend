const User = require('../models/authUser');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      message: "Logged In Successfully.",
      token,
      email: user.email,
      username: user.username,
      userId: user._id
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);
    const token = createToken(user._id);

    console.log(`${email} registered successfully`);

    res.status(200).json({
      success: true,
      message: "Registered Successfully.",
      token,
      email: user.email,
      username: user.username,
      userId: user._id
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };