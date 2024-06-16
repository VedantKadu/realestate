import express from "express"; //ES6 syntax
// const express = require("express"), this is CommonJS syntax

const app = express();

app.listen(4000, () => {
  console.log("App is running on port 4000");
});
