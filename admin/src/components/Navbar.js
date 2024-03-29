import React, {useState} from 'react';
import axios from 'axios';
import { SearchOutlined  } from '@ant-design/icons';
import { BellOutlined  } from '@ant-design/icons';
import { logoutAdmin } from "../utils/constant";
import { useNavigate } from 'react-router-dom';

import '../styles/components/navbar.scss'

export const Navbar = () => { 
  // Get username from local storage
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  axios.defaults.withCredentials = true;
  
  const handleLogout = (e) => {
    e.preventDefault();
    axios.get(`${logoutAdmin}`)
      .then((res) => {
        if (res.data.success) {
          navigate('/login');
          } 
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

   // Function to toggle dropdown visibility
   const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/assets/logo.png"/>
        <span className="title">ADMIN</span>
      </div>
      <div className="icons">
        <SearchOutlined className="size"/>
        <div className="notification">
          <BellOutlined className="size"/>
          <span className="span">1</span>
        </div>
        <div className="user" onClick={toggleDropdown}>
          <img src="/assets/profile.png" alt="Profile"/>
          <span className="username">{username}</span>
          {dropdownVisible && (
          <div className="dropdown-content">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
