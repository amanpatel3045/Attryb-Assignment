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


userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await UserModel.find({ email });
  try {
    if (user.length < 1) {
      res.status(200).send({ msg: "User Does Not Exists" });
    } else {
      bcrypt.compare(password, user[0].password, async (error, result) => {
        if (error) {
          res.status(200).send({ msg: error });
        } else if (result === true) {
          jswt.sign({ id: user[0]._id }, "aman", async (err, token) => {
            if (err) {
              res.status(200).send({ msg: error });
            } else {
              res.status(200).send({ msg: "User LoggedIn Succesfully", token });
            }
          });
        } else {
          res.status(200).send({ msg: "Password Is Wrong" });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let user = await UserModel.findById(id);
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.patch("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let user = await UserModel.findByIdAndUpdate(id,req.body);
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { userRouter };
