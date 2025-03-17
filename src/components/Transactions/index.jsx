import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../index.js";
import "./index.css";

const Transactions = ({ transactions, setEditTransaction, fetchTransactions }) => {
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleRemind = async (email, name, amountPending) => {
    try {
      const response = await axios.post(`${server}/api/remind`, {
        email,
        name,
        amountPending,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error sending reminder:", error);
    }
  };

  const filteredTransactions = transactions.filter((txn) => {
    const matchesName = txn.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesPhone = txn.phone.includes(searchPhone);
    const txnDate = new Date(txn.bookingDate);
    const matchesDate =
      (!fromDate || txnDate >= new Date(fromDate)) &&
      (!toDate || txnDate <= new Date(toDate));

    return matchesName && matchesPhone && matchesDate;
  });

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="tran-cont">
      <h2>Transaction Records</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Phone"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
        <div className="date-filters">
          <label>From</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <label>To</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>From-To</th>
              <th>Booking Date</th>
              <th>Total Amount</th>
              <th>Pending Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((txn) => (
              <tr key={txn._id}>
                <td>{txn.name}</td>
                <td>{txn.phone}</td>
                <td>{txn.fromAddress} → {txn.toAddress}</td>
                <td>{new Date(txn.bookingDate).toLocaleDateString()}</td>
                <td>{txn.amountTotal}</td>
                <td>{txn.amountPending}</td>
                <td className="action-buttons">
                  <button className="edit-btn" onClick={() => {
                    setEditTransaction(txn);
                    navigate("/userform");
                  }}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(txn._id)}>Delete</button>
                  <button className="remind-btn" onClick={() => handleRemind(txn.email, txn.name, txn.amountPending)}>Remind</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Transactions;






