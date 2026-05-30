import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getExpenses = async () => {
  const res = await axios.get(API_URL, authConfig());
  return res.data;
};

export const createExpense = async (data) => {
  const res = await axios.post(API_URL, data, authConfig());
  return res.data;
};

export const deleteExpense = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, authConfig());
  return res.data;
};
