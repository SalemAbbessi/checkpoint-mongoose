const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const UserModel = require("./src/models/user");
const bodyParser = require("body-parser");
dotenv.config({ path: "./.env" });
const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

// Remove the explicit body-parser usage, as it's included in Express
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  req.headers["content-type"] = "application/json";
  next();
});

app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.post("/users", async (req, res) => {
  try {
    console.log("before", req.headers["content-type"]);

    const { username, email, password } = req.body;
    const newUser = new UserModel(req.body);
    console.log("req.body", req.body);
    console.log("newUser", newUser);
    const savedUser = await newUser.save();
    console.log("savedUser", savedUser);
    return res.status(201).send(savedUser);
  } catch (err) {
    console.error("Error creating user********************:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    res.json(deletedUser);
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, email, password },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const users = await UserModel.findById(userId);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log("aaaaaaaaaaaaaaaa");
});
