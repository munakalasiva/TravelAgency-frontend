import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const defaultUser = { username: "admin856", password: "Travel@856" };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      credentials.username === defaultUser.username &&
      credentials.password === defaultUser.password
    ) {
      localStorage.setItem("isAuthenticated", "true"); // Save login state
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <img className="img" src="/img/logo.jpg" alt="Logo" />
      <div className="login-card">
        <h2 className="login-title">WELCOME TO <br/><span className="span-head">TRAVEL AGENCY</span></h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={credentials.username}
            onChange={handleChange}
            required
            className="login-input"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

