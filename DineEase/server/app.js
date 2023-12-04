const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const Item = require("./models/item");

const app = express();
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Bearer"); // allow these headers
  next();
});

app.use("/auth", authRoutes);
app.use("/", menuRoutes);

const server = app.listen(3000, "0.0.0.0");
console.log("server is listening at : ", 3000);
const io = require("./socket").init(server);


mongoose
  .connect("mongodb+srv://abhi199606:Sarfu%40bm321@cluster0.bdwxeyb.mongodb.net/POS?retryWrites=true&w=majority")
  .then((result) => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));
 