const express = require("express");
const router = express.Router();
const { signup, createUser, login } = require("../controllers/authController");
const { authenticate, whoCanDo } = require("../middlewares/authMiddleware");

router.post("/signup", signup);
router.post("/create-user", authenticate, whoCanDo("Manager"), createUser);
router.post("/login", login);

module.exports = router;
