const jwt = require("jsonwebtoken");
const User = require("./configure/schema");
const express = require('express');
const app = express();
const database = require("./configure/database.js");
const { valdata } = require("./utillites/vali.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { auth } = require("./auth.js");

// Connect to database
database();

// Middleware
app.use(express.json());
app.use(cookieParser());


// Signup Route
app.post("/signup", async (req, res) => {
  try {
    valdata(req.body);
    const { firstName, SecondName, age, Gender, _id, emailId, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, SecondName, age, Gender, _id, emailId, password: hashpassword });
    await user.save();
    res.send("Thank you for registration");
  } catch (err) {
    res.status(400).send("The URL is Not Working: " + err.message);
  }
});

// Login Route (changed to POST)
app.get("/user", async (req, res) => {
  const name = req.body.firstName;
  try {
    const username = await User.findOne({ firstName: name });
    if (!username) {
      return res.status(404).send("No such data");
    }
    // const token = jwt.sign({ name : name }, "Abhi@123", { expiresIn: "1h" });
    const token =await username.getjwt();
    res.cookie("jwt", token, { httpOnly: true, secure: false });  // Set the cookie with httpOnly
    res.send(username);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error: " + err.message);
  }
});

// Protected Routes
app.get("/feed", auth, async (req, res) => {
  const final = await User.find();
  res.send(final);
});

app.get("/id", auth, async (req, res) => {
  const final = req.body._id;
  try {
    const check = await User.findById(final);
    if (!check) {
      return res.status(404).send("Data with specified ID not found");
    }
    res.send(check);
  } catch (err) {
    console.log(err);
  }
});

// Portfolio Route with Authentication
app.get("/portfolio", auth, async (req, res) => {
  res.send("The user is " + req.user);
});

// Deletion Route
app.delete("/delete", async (req, res) => {
  const UserId = req.body._id;
  try {
    if (!UserId) {
      return res.send("Data not present in record");
    }
    await User.deleteOne({ _id: UserId });
    res.send("The data has been deleted successfully");
  } catch (err) {
    res.status(400).send("URL is not working");
  }
});

// Update Route
app.patch("/update", async (req, res) => {
  const { _id, ...data } = req.body;
  try {
    if (!_id) {
      return res.status(404).send("User ID is not provided.");
    }
    const allowedUpdates = ["age", "Gender"];
    const isUpdateAllowed = Object.keys(data).every((key) => allowedUpdates.includes(key.trim()));
    if (!isUpdateAllowed) {
      return res.status(400).send("The fields you have passed cannot be updated.");
    }
    const user = await User.findByIdAndUpdate(_id, data, { new: true });
    if (!user) {
      return res.status(404).send("User not found with the provided ID.");
    }
    res.send("Record has been updated successfully.");
  } catch (err) {
    console.error("Error in update:", err.message);
    res.status(500).send("An error occurred: " + err.message);
  }
});

// Email Update Route
app.patch("/email", async (req, res) => {
  const email = req.body.emailId;
  const data = req.body;
  try {
    if (!email) {
      return res.status(404).send("Email ID not provided");
    }
    const result = await User.updateOne({ emailId: email }, data, { new: true });
    if (result.matchedCount === 0) {
      return res.status(404).send("No user found with the specified email ID");
    }
    res.send("Data updated successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("URL not defined properly");
  }
});

// Start Server
app.listen(7000, err => {
  if (err) throw err;
  console.log("Server started");
});
