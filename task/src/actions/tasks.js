import * as api from "../api";

import {
  FETCH_TASK,
  START_LOADING,
  END_LOADING,
  CREATE,
  UPDATE,
  DELETE,
  SEARCH,
} from "../contants/actionTypes";

//get user tasks
export const getUserTasks = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchTasks();
    dispatch({ type: FETCH_TASK, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//get all tasks by admin
export const getAllTasks = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchAllTasks();
    dispatch({ type: FETCH_TASK, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//create task
export const createTask = (task, history) => async (dispatch) => {
  try {
    const { data } = await api.createTask(task);
    history.push(`/`);
    const action = { type: CREATE, payload: data.newTask };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

// update task
export const updateTask = (id, task) => async (dispatch) => {
  try {
    const { data } = await api.updateTask(id, task);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//delete task
export const deleteTask = (id) => async (dispatch) => {
  try {
    await api.deleteTask(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

//search for task
export const getTasksBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchTaskBySearch(searchQuery);
    dispatch({ type: SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//search for task
export const getTasksBySearchByAdmin = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchTaskBySearchByAdmin(searchQuery);
    dispatch({ type: SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
