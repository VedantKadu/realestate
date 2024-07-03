import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.send("hello world!");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(403, "Forbidden, you can update your own information")
    );
  }

  try {
    if (req.body.password)
      req.body.password = bcryptjs.hashSync(req.body.password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(403, "Forbidden, you can update your own information")
    );
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(403, "Forbidden, you can view you own listings only")
    );
  }

  try {
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};
