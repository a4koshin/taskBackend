import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post("/createTask", createTask);
taskRouter.get("/getAllTasks", getTasks);
taskRouter.post("/getTask", getTaskById);
taskRouter.post("/:id", updateTask);
taskRouter.post("/:id", deleteTask);

export default taskRouter;
