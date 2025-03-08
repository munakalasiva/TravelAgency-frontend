
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import bgImage from "../../assets/tourist-from-mountain-top-sun-rays-man-wear-big-backpack-against-sun-light.jpg";
const UserForm = ({ fetchTransactions, editTransaction, setEditTransaction }) => {
  // Define formData state with initial values
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    fromAddress: "",
    toAddress: "",
    bookingDate: "",
    mode: "",
    amountTotal: "",
    amountAdvance: "",
    amountPending: ""
  });

  // When editing a transaction, prefill form fields
  useEffect(() => {
    if (editTransaction) {
      setFormData({
        ...editTransaction,
        bookingDate: editTransaction.bookingDate
          ? new Date(editTransaction.bookingDate).toISOString().split("T")[0]
          : ""
      });
    }
  }, [editTransaction]);

  // Auto-calculate pending amount when amountTotal or amountAdvance changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      amountPending: Number(prev.amountTotal) - Number(prev.amountAdvance)
    }));
  }, [formData.amountTotal, formData.amountAdvance]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for both creating and updating transactions
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTransaction) {
        // Update existing transaction
        await axios.put(
          `http://localhost:5000/api/transactions/${editTransaction._id}`,
          formData
        );
      } else {
        // Create new transaction
        await axios.post("http://localhost:5000/api/transactions", formData);
      }
      // Refresh transactions
      if (fetchTransactions) {
        fetchTransactions();
      }
      // Reset form and edit mode
      setFormData({
        name: "",
        phone: "",
        email: "",
        fromAddress: "",
        toAddress: "",
        bookingDate: "",
        mode: "",
        amountTotal: "",
        amountAdvance: "",
        amountPending: ""
      });
      setEditTransaction(null);
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      height: "auto",
    }} className="image-bg">
      <div className="booking-card">
    <form className="form-container" onSubmit={handleSubmit} >
      <h2>{editTransaction ? "Edit Transaction" : "Book Ticket"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
  <div className="input-row">
      <input
        type="text"
        name="fromAddress"
        placeholder="From Address"
        value={formData.fromAddress}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="toAddress"
        placeholder="To Address"
        value={formData.toAddress}
        onChange={handleChange}
        required
      />
  </div>
      <label>BOOKING DATE</label>
      <input
        type="date"
        name="bookingDate"
        value={formData.bookingDate}
        onChange={handleChange}
        required
      />

      <select
        name="mode"
        value={formData.mode}
        onChange={handleChange}
        required
      >
        <option value="">Select Mode</option>
        <option value="Car">Car</option>
        <option value="Bus">Bus</option>
        <option value="Train">Train</option>
        <option value="Flight">Flight</option>
      </select>

      <input
        type="number"
        name="amountTotal"
        placeholder="Total Amount"
        value={formData.amountTotal}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amountAdvance"
        placeholder="Advance Amount"
        value={formData.amountAdvance}
        onChange={handleChange}
        required
      />

      <label>PENDING AMOUNT</label>
      <input
        type="number"
        name="amountPending"
        placeholder="Pending Amount"
        value={formData.amountPending}
        readOnly
      />

      <button type="submit">
        {editTransaction ? "Update Transaction" : "Book Ticket"}
      </button>
      
      {editTransaction && (
        <button 
        type="button" 
        onClick={() => {
          setEditTransaction(null);
          setFormData({
            name: "",
            phone: "",
            email: "",
            fromAddress: "",
            toAddress: "",
            bookingDate: "",
            mode: "",
            amountTotal: "",
            amountAdvance: "",
            amountPending: "",
          });
        }}
      >
        Cancel Edit
      </button>
      
      )}
    </form>
    </div>
    </div>
  );
};

export default UserForm;
