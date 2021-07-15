// Handle the routing of the requests it will process the information and then send it back to the client.

const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

//whenever you get a post request at the endpoint of register do this code. that is a controller.
//setting up what happens when that request is made by the client specific to this endpoint.
router.post("/register", async (req, res) => {
  let { firstName, lastName, email, password } = req.body.user; //destructuring what the user sent you with the params of email and password.
  try {
    let User = await UserModel.create({
      //we use AWAIT HERE BECAUSE
      //THE STATUS CODE WILL RUN FIRST BECUASE IT DOESN'T WAIT ON THE MODEL TO CREATE THE USER OBJECT
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 13),
    });
    let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    res.status(201).json({
      message: "user successfully registered.",
      user: User,
      sesstionToken: token,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "email already in use",
      });
    } else {
      res.status(500).json({
        message: "Failed to register user.",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body.user;
  try {
    let userLogin = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (userLogin) {
      let passwordCompare = await bcrypt.compare(password, userLogin.password);
      if (passwordCompare) {
        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });
        res.status(200).json({
          user: userLogin,
          message: `you are logged in.`,
          loginToken: token,
        });
      } else {
        res.status(401).json({
          message: "Incorrect email or password.",
        });
      }
    } else {
      res.status(401).json({
        message: "Incorrect email or password.",
      });
    }
  } catch (err) {
    res.status(501).json({
      message: "Failed to complete request.",
    });
  }
});

module.exports = router;
