const Task = require("../models/taskModel");
const User = require("../models/userModel");

// Get tasks for the logged-in user
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id }).populate(
      "assignedTo",
      "name email"
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all tasks (Manager only)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate("assignedTo", "name email");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a task (Manager only)
exports.createTask = async (req, res) => {
  const { title, description, status, userSelected } = req.body;

  try {
    if (status && !["à faire", "en cours", "terminée"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    let assignedTo = req.user._id;
    if (userSelected) {
      const user = await User.findById(userSelected);
      if (!user) {
        return res.status(404).json({ message: "Selected user not found" });
      }
      assignedTo = user._id;
    }

    const task = await Task.create({
      title,
      description,
      status: status || "à faire",
      assignedTo,
    });

    const populatedTask = await Task.findById(task._id).populate(
      "assignedTo",
      "name email"
    );

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit task status (User, only for their own tasks)
exports.editTask = async (req, res) => {
  const { status } = req.body;

  try {
    if (!["à faire", "en cours", "terminée"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this task" });
    }

    task.status = status;
    await task.save();

    const populatedTask = await Task.findById(task._id).populate(
      "assignedTo",
      "name email"
    );

    res.status(200).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete task (User, only for their own tasks)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this task" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
