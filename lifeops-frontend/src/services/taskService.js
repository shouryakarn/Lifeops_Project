import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getTasks = async () => {
  const res = await axios.get(API_URL, authConfig());
  return res.data;
};

export const createTask = async (taskData) => {
  const res = await axios.post(API_URL, taskData, authConfig());
  return res.data;
};

export const updateTask = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data, authConfig());
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, authConfig());
  return res.data;
};
