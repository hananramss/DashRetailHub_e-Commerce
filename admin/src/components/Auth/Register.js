import React, { useState } from "react";
import axios from "axios";
import { UserOutlined, MailFilled, LockFilled } from '@ant-design/icons';
import { registerAdmin } from "../../utils/constant";
import { useNavigate, Link  } from "react-router-dom";

import '../../styles/components/Auth/Login.scss'

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Function to handle form submission (Add)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setError("Passwords do not match");
      return;
    }
  
    axios
      .post(`${registerAdmin}`, { username, email, password })
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          // Store username in local storage upon successful registration
          localStorage.setItem('username', username);
          navigate('/login');
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("An error occurred while processing your request.");
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="reg-icon"> 
          <UserOutlined />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className="input-container">
            <div className="input">
              <label className="label"><UserOutlined/></label>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label className="label"><MailFilled  /></label>
              <input
                type="text"
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
            <div className="input">
              <label className="label"><LockFilled /></label>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="btn">
            <button className="loginBtn" type="submit">REGISTER</button>
          </div>
        </form>

        <p className="sub-options">Don't Have an Account? <Link to="/login"> <u>Login</u> </Link> </p>
      </div>
    </div>
  );
};
