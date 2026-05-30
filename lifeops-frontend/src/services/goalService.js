import axios from "axios";

const API = "http://localhost:5000/api/goals";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getGoals = async () => {
  const res = await axios.get(API, authConfig());
  return res.data;
};

export const createGoal = async (data) => {
  const res = await axios.post(API, data, authConfig());
  return res.data;
};

export const toggleGoal = async (id) => {
  const res = await axios.put(`${API}/${id}`, {}, authConfig());
  return res.data;
};

export const deleteGoal = async (id) => {
  const res = await axios.delete(`${API}/${id}`, authConfig());
  return res.data;
};
