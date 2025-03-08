import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserForm from "./components/UserForm";
import Transactions from "./components/Transactions";
import "./App.css";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/" />;
};

const AppContent = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);
  
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isDashboard = location.pathname === "/dashboard";

  // Fetch transactions from backend
  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="main">
      {!isLoginPage && <Navbar />} {/* Navbar shown except on Login */}
      <div className={!isDashboard && !isLoginPage ? "main-content" : "dashboard-content"}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route
            path="/userform"
            element={
              <PrivateRoute>
                <UserForm
                  fetchTransactions={fetchTransactions}
                  editTransaction={editTransaction}
                  setEditTransaction={setEditTransaction}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Transactions
                  transactions={transactions}
                  fetchTransactions={fetchTransactions}
                  setEditTransaction={setEditTransaction}
                />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      {!isLoginPage && <Footer />} {/* Footer shown except on Login */}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;







