import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPass = bcryptjs.hashSync(password, 10);
  try {
    const newUser = new User({ username, email, password: hashedPass });
    await newUser.save();
    res.status(201).json("user crated succesfully");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Password!"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};