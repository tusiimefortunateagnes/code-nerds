const express = require("express");
const { User } = require("../models/User");
const router = express.Router();
const { compare, toHash } = require("../services/password");

router.get("/", (req, res) => {
  return res.status(200).send({ message: "Hello world!" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email });

  if (!user)
    return res.status(404).send({ message: "Invalid email or password" });

  const passwordsMatch = await compare(user.password, password);

  if (!passwordsMatch)
    return res.status(404).send({ message: "Invalid email or password" });

  return res.status(200).send({ message: "Login Successful", user });
});

router.post("/signup", async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  let user = await User.find({ email });

  if (user) return res.status(404).send({ message: "Email in Use!" });

  const hashedPassword = await toHash(password);

  user = await User.create({
    fullName,
    email,
    phone,
    password: hashedPassword,
  });

  await user.save();

  return res.status(200).send({ message: "Login Successful", user });
});

module.exports = { router };
