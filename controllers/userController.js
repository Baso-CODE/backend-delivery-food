import userModal from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { createToken } from "../lib/jwt.js";

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModal.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "Invalid token" });
  }
};

// create token
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };
// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // mengecek apakah user dengan email yang sama
    const exists = await userModal.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: " User already exist" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: " please enter a valid email",
      });
    }

    // password format
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a password strong",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModal({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    response.json({ success: false, message: "error saving" });
  }
};

export { loginUser, registerUser };
