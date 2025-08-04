import taskModal from "../model/taskModal.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    if (!title || !description || !status || priority)
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

export const getTasks = async (req, res) => {};

export const getTaskById = async (req, res) => {};

export const updateTask = async (req, res) => {};

export const deleteTask = async (req, res) => {};
