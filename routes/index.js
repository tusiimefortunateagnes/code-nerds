const express = require("express");
const { User } = require("../models/User");
const router = express.Router();
const { compare, toHash } = require("../services/password");

router.get("/ping", (req, res) => {
  return res.status(200).send({ message: "pong!" });
});

router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  let user = await User.findOne({ email });

  if (user) return res.status(404).send({ message: "Email in Use!" });

  const hashedPassword = await toHash(password);

  user = await User.create({
    name: name,
    email,
    phone,
    password: hashedPassword,
  });

  await user.save();

  return res.status(200).send({ message: "Login Successful", user });
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).send({ message: "Invalid email or password" });

  const passwordsMatch = await compare(user.password, password);

  if (!passwordsMatch)
    return res.status(404).send({ message: "Invalid email or password" });

  return res.status(200).send({ message: "Login Successful", user });
});

module.exports = { router };
