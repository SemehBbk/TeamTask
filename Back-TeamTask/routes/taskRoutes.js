const express = require("express");
const router = express.Router();
const {
  getMyTasks,
  getAllTasks,
  createTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController");
const { authenticate, whoCanDo } = require("../middlewares/authMiddleware");

router.get("/my-tasks", authenticate, getMyTasks);
router.get("/all-tasks", authenticate, whoCanDo("Manager"), getAllTasks);
router.post("/createTask", authenticate, whoCanDo("Manager"), createTask);
router.put("/edit/:id", authenticate, editTask);
router.delete("/delete/:id", authenticate, deleteTask);

module.exports = router;
