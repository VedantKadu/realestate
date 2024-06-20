import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw1gdHAQxwcwj55sw1bZGLcY&ust=1718909302148000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNiuyqWq6IYDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
