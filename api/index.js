// const express = require("express"), this is CommonJS syntax
import express from "express"; //ES6 syntax
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.listen(4000, () => {
  console.log("App is running on port 4000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
