import express from "express";

const router = express();
import auth from "../middleware/auth.js";

import {
  getUserTasks,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskByCategory,
  getTaskByCategoryByAdmin,
} from "../controllers/task.js";

router.get("/", auth, getUserTasks);
router.get("/search", auth, getTaskByCategory);
router.get("/search/admin", auth, getTaskByCategoryByAdmin);
router.get("/allTasks", auth, getAllTasks);
router.post("/", auth, createTask);
router.patch("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
