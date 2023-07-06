const express = require("express");
const { UserModel } = require("../Models/userModel.js");
const jswt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { dateLogger } = require("../Middlewares/dateLogger.js");
const userRouter = express.Router();

userRouter.post("/register", dateLogger, async (req, res) => {
  const { email, password, name } = req.body;
  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      res.status(200).send({ msg: "User Already Exists" });
    } else {
      bcrypt.hash(password, 5, async (error, hash) => {
        if (error) {
          res.status(200).send({ msg: error });
        } else {
          let newUser = UserModel({ name, email, password: hash });
          await newUser.save();
          let findUser = await UserModel.find({ email });

          jswt.sign({ id: findUser[0]._id }, "aman", async (err, token) => {
            if (err) {
              res.status(200).send({ msg: error });
            } else {
              res.send({ msg: "User Registered Succesfully", token });
            }
          });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { userRouter };
