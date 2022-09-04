const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isRequired } = require("nodemon/lib/utils");

exports.signupController = (req, res) => {
  try {
    const { password, ...others } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) return res.staus(401).json({ err: "Something went wrong" });
        const newUser = new User({
          email: req.body.email,
          username: req.body.username,
          password: hash,
        });
        newUser.save();
        res.status(200).json({
          message: "User created successfully",
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.signinController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, function (err, resp) {
        if (resp) {
          const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET
          );
          res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .json({ Message: "Signed in" });
        } else {
          res.status(401).json({
            Err: "wrong credentials 1",
          });
        }
      });
    } else {
      res.status(400).json({
        Err: "wrong credentials 2",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
