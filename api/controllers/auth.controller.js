import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPass = bcryptjs.hashSync(password, 10);
  try {
    const newUser = new User({ username, email, password: hashedPass });
    await newUser.save();
    res.status(201).json("user crated succesfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
