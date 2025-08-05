import taskModal from "../model/taskModal.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    if (!title || !description || !status || !priority)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required" });

    const newTask = new taskModal({ title, description, status, priority });

    await newTask.save();
    res
      .status(201)
      .json({ success: true, message: "New Task created succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskModal.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await taskModal.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "task not found!" });
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const updatedTask = await taskModal.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        status,
        priority,
      },
      { new: true }
    );
    if (!updatedTask)
      return res
        .status(404)
        .json({ success: false, message: "NO Task founded!!" });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskModal.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
