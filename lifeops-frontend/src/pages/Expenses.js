import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getExpenses, createExpense, deleteExpense } from "../services/expenseService";
import "../styles/pages.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error loading expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!description || !amount || !date) return;

    try {
      await createExpense({ description, amount: Number(amount), date });
      setDescription("");
      setAmount("");
      loadExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      loadExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <Layout>
      <div className="page-header">
        <h1>Expenses</h1>
        <p>Keep your finances in check 💰</p>
      </div>

      <div className="expense-summary">
        <div className="summary-box glass-card">
          <h4>Total Spent</h4>
          <div className="value">₹{totalExpense.toLocaleString()}</div>
        </div>
        <div className="summary-box glass-card">
          <h4>Last Transaction</h4>
          <div className="value">
            {expenses.length > 0 ? `₹${expenses[0].amount.toLocaleString()}` : "N/A"}
          </div>
        </div>
        <div className="summary-box glass-card">
          <h4>Count</h4>
          <div className="value">{expenses.length}</div>
        </div>
      </div>

      <div className="glass-card page-card">
        <form onSubmit={handleAddExpense} className="add-form" style={{ flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              placeholder="Description (e.g., Coffee)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ flex: 2 }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>Add Expense</button>
          </div>
        </form>

        <div className="list-container">
          {loading ? (
            <p>Loading expenses...</p>
          ) : expenses.length === 0 ? (
            <p className="empty-msg">No expenses recorded yet. Track your wealth!</p>
          ) : (
            expenses.map((exp) => (
              <div key={exp._id} className="list-item expense-item">
                <div className="item-info">
                  <div>
                    <div style={{ fontWeight: 500 }}>{exp.description}</div>
                    <div className="date">{new Date(exp.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div className="amount">₹{exp.amount.toLocaleString()}</div>
                  <button className="delete-btn" onClick={() => handleDeleteExpense(exp._id)}>
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Expenses;
