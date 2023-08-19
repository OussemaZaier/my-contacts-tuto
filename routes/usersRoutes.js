const express = require("express");

const {
  registerUser,
  loginUser,
  verifyUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify", validateToken, verifyUser);

module.exports = router;
