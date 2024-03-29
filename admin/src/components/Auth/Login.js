import React, { useState } from "react";
import axios from "axios";
import { UserOutlined, MailFilled , LockFilled } from '@ant-design/icons';
import { loginAdmin } from "../../utils/constant";
import { useNavigate, Link } from "react-router-dom";

import '../../styles/components/Auth/Login.scss'

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${loginAdmin}`, { email, password })
      .then((res) => {
        if (res.data.message === "User not registered") {
            setError("User not registered");
          } else if (res.data.success) {
            navigate('/dashboard');
          } else {
            setError("An error occurred. Please try again later.");
          }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("An error occurred. Please try again later."); 
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="user-icon"> 
          <UserOutlined />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className="input-container"> 
            <div className="input">
              <label className="label"><MailFilled  /></label>
              <input
                type="text" // Use type="email" for better validation and autocomplete support
                placeholder="Email Address"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="label"><LockFilled /></label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="btn">
            <button className="loginBtn" type="submit">LOGIN</button>
          </div>
          {/* <Link to="/forgotPassword">Forgot Password</Link> */}
        </form>

        <p className="sub-options">Don't Have an Account? <Link to="/register"> <u>Sign Up</u> </Link> </p>
      </div>
    </div>
  );
};