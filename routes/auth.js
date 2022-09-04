const router = require("express").Router();

const {
  signupController,
  signinController,
} = require("../controllers/authController");

router.post("/", signupController);
router.post("/login", signinController);

module.exports = router;
