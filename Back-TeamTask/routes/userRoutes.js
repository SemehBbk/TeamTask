const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateRole,
  getMe,
} = require("../controllers/userController");
const { authenticate, whoCanDo } = require("../middlewares/authMiddleware");

router.get("/all", authenticate, whoCanDo("Manager"), getAllUsers);
router.get("/user/:id", authenticate, whoCanDo("Manager"), getUser);
router.put("/updateUser/:id", authenticate, whoCanDo("Manager"), updateRole);

router.get("/me", authenticate, getMe);
module.exports = router;
