import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./index.css"; // Import the CSS file

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const navbarClass = location.pathname === "/dashboard";

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove auth state
    navigate("/"); // Redirect to login
  };

  return (
    <nav className={navbarClass ? "navbar navbar-transparent" : "navbar navbar-solid"}>
      <div className="container">
        <div className="logo">Ticket System</div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <Link to="/dashboard" className="nav-item">Home</Link>
          <Link to="/userform" className="nav-item">Book Ticket</Link>
          <Link to="/transactions" className="nav-item">Transactions</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button> {/* Logout Button */}
        </div>

        {/* Mobile Menu Button */}
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/dashboard" className="nav-item" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/userform" className="nav-item" onClick={() => setMenuOpen(false)}>Book Ticket</Link>
        <Link to="/transactions" className="nav-item" onClick={() => setMenuOpen(false)}>Transactions</Link>
        <button className="logout-btn" onClick={() => { setMenuOpen(false); handleLogout(); }}>Logout</button> {/* Logout for Mobile */}
      </div>
    </nav>
  );
};

export default Navbar;

  
