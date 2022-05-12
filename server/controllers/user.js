import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;
  const { id } = req.params;

  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ status: "ok", msg: "Please provide email and password" });
    }

    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        email: oldUser.email,
        password: oldUser.password,
        id: oldUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

export const register = async (req, res) => {
  const { email, password, comfirmPassword, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(404).json({ msg: "User already exist" });
    }

    if (password !== comfirmPassword) {
      return res.status(400).json({ msg: "Password does not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};
