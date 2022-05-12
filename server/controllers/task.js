import taskMessage from "../models/taskMessage.js";
import createCustomError from "../errors/custom-error.js";
import mongoose from "mongoose";

//Get user tasks
export const getUserTasks = async (req, res) => {
  try {
    const tasks = await taskMessage.find({ creator: req.userId });

    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

//get all tasks by admin
export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await taskMessage.find({});
    res.status(200).json({ data: allTasks, count: allTasks.length });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

// create task
export const createTask = async (req, res) => {
  const task = req.body;

  const { title, category, message } = task;

  try {
    if (title === "" || category === "" || message === "") {
      return next(createCustomError("Please fill in the form completely", 404));
    } else {
      const newTask = new taskMessage({
        ...task,
        creator: req.userId,
        createdAt: new Date().toISOString(),
      });
      await newTask.save();
      res.status(201).json({ newTask });
    }
  } catch (error) {
    res.status(409).json({ msg: error.msg });
  }
};

//Update task
export const updateTask = async (req, res) => {
  const { id: _id } = req.params;
  const task = req.body;
  const { title, category, message } = task;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No task with id: ${_id}`);
  } else {
    const updatedTask = await taskMessage.findByIdAndUpdate(
      _id,
      { title, category, message },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedTask);
  }
};

//Delete tasks
export const deleteTask = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No task with id: ${_id}`);
  } else {
    await taskMessage.findByIdAndDelete(_id);
  }
  res.status(200).send("Task was deleted Successfully");
};

// get task by category
export const getTaskByCategory = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const category = new RegExp(searchQuery, "i");
    const tasks = await taskMessage.find({
      $or: [{ category }],
      creator: req.userId,
    });

    if (!tasks) {
      res.status(404).json({ msg: "Object not found" });
    }
    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

// get task by category
export const getTaskByCategoryByAdmin = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const category = new RegExp(searchQuery, "i");
    const tasks = await taskMessage.find({
      $or: [{ category }],
    });

    if (!tasks) {
      res.status(404).json({ msg: "Object not found" });
    }
    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};
