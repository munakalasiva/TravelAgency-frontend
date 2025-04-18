
import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../index.js";

import "./index.css";
import bgImage from "../../assets/tourist-from-mountain-top-sun-ra.webp";

const UserForm = ({ fetchTransactions, editTransaction, setEditTransaction }) => {
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
    refundAmount: "",
    amountPending: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTransaction) {
      setFormData({
        ...editTransaction,
        bookingDate: editTransaction.bookingDate
          ? new Date(editTransaction.bookingDate).toISOString().split("T")[0]
          : "",
        refundAmount: editTransaction.refundAmount || ""
      });
    }
  }, [editTransaction]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      amountPending: (
        Number(prev.amountTotal || 0) -
        Number(prev.amountAdvance || 0) -
        Number(prev.refundAmount || 0)
      ).toString()
    }));
  }, [formData.amountTotal, formData.amountAdvance, formData.refundAmount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "phone") {
      const isValidPhone = /^[6-9]\d{9}$/.test(value);
      setErrors((prev) => ({ ...prev, phone: isValidPhone ? "" : "Invalid phone number" }));
    }

    if (name === "email") {
      const isValidEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);
      setErrors((prev) => ({ ...prev, email: isValidEmail ? "" : "Invalid Gmail address" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isPhoneValid = /^[6-9]\d{9}$/.test(formData.phone);
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email);

    if (!isPhoneValid || !isEmailValid) {
      setErrors({
        phone: !isPhoneValid ? "Phone must be a valid 10-digit Indian number" : "",
        email: !isEmailValid ? "Email must be a valid Gmail address" : ""
      });
      return;
    }

    try {
      if (editTransaction) {
        await axios.put(`${server}/api/transactions/${editTransaction._id}`, formData);
      } else {
        await axios.post(`${server}/api/transactions`, formData);
      }

      if (fetchTransactions) fetchTransactions();

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
        refundAmount: "",
        amountPending: ""
      });
      setEditTransaction(null);
      setErrors({});
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", height: "auto" }} className="image-bg">
      <div className="booking-card">
        <form className="form-container" onSubmit={handleSubmit}>
          <h2>{editTransaction ? "Edit Transaction" : "Book Ticket"}</h2>

          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />

          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          {errors.phone && <span className="error-text">{errors.phone}</span>}

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <div className="input-row">
            <input type="text" name="fromAddress" placeholder="From Address" value={formData.fromAddress} onChange={handleChange} required />
            <input type="text" name="toAddress" placeholder="To Address" value={formData.toAddress} onChange={handleChange} required />
          </div>

          <label>BOOKING DATE</label>
          <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} required />

          <select name="mode" value={formData.mode} onChange={handleChange} required>
            <option value="">Select Mode</option>
            <option value="Car">Car</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Flight">Flight</option>
          </select>

          <input type="number" name="amountTotal" placeholder="Total Amount" value={formData.amountTotal} onChange={handleChange} required />
          <input type="number" name="amountAdvance" placeholder="Advance Amount" value={formData.amountAdvance} onChange={handleChange} required />
          <input type="number" name="refundAmount" placeholder="Refund Amount" value={formData.refundAmount} onChange={handleChange} />

          <label>PENDING AMOUNT</label>
          <input type="number" name="amountPending" placeholder="Pending Amount" value={formData.amountPending} readOnly />

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
                  refundAmount: "",
                  amountPending: ""
                });
                setErrors({});
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
