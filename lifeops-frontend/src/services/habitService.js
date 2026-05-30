import axios from "axios";

const API_URL = "http://localhost:5000/api/habits";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getHabits = async () => {
  const res = await axios.get(API_URL, authConfig());
  return res.data;
};

export const createHabit = async (data) => {
  const res = await axios.post(API_URL, data, authConfig());
  return res.data;
};

export const toggleHabit = async (id) => {
  const res = await axios.patch(`${API_URL}/${id}`, {}, authConfig());
  return res.data;
};

export const deleteHabit = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, authConfig());
  return res.data;
};
