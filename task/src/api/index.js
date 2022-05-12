import axios from "axios";

const API = axios.create({ baseURL: "https://task-testy.herokuapp.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

//TASKS
export const fetchTasks = () => API.get("/task");
export const fetchAllTasks = () => API.get("/task/allTasks");
export const createTask = (newTask) => API.post("/task", newTask);
export const updateTask = (id, updatedTask) =>
  API.patch(`/task/${id}`, updatedTask);

export const deleteTask = (id) => API.delete(`/task/${id}`);

export const fetchTaskBySearch = (searchQuery) =>
  API.get(`/task/search?searchQuery=${searchQuery.search}`);

export const fetchTaskBySearchByAdmin = (searchQuery) =>
  API.get(`/task/search/admin?searchQuery=${searchQuery.search}`);
//AUTH
export const register = (FormData) => API.post("/user/register", FormData);
export const login = (formData) => API.post("/user/login", formData);
