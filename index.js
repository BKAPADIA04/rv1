

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const port = 5000;
const mongoDB = "mongodb://127.0.0.1:27017/mydatabase";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("My API");
});

app.get("/about", (req, res) => {
  res.send("My API about");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (password === user.password) {
          res.send({ message: "Login Successful", user: user });
        } else{
          res.send({ message: "Incorrect password" });
        }
      } else {
        res.send({ message: "User not registered" });
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      res.status(500).send({ message: "An error occurred during login" });
    });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        newUser.save()
          .then(() => {
            res.send({ message: "Successfully Registered" });
          })
          .catch((error) => {
            console.error("Error during registration:", error);
            res.status(500).send({ message: "An error occurred during registration" });
          });
      }
    })
    .catch((error) => {
      console.error("Error during registration:", error);
      res.status(500).send({ message: "An error occurred during registration" });
    });
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.listen(port, () => {
  console.log("Server is running on port 5000");
});

