import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Users } from './pages/Users';
import { Orders } from './pages/Orders';
import { IncomeChart } from './components/Chart/IncomeChart';
import { SalesChart } from './components/Chart/SalesChart';
import { ExpensesChart } from './components/Chart/ExpensesChart';
import { Navbar } from './components/Navbar';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';

import './styles/main/main.scss';

const Layout = () => {
  
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const App = () => {

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        
        {/* Default route to the login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Private routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/incomeChart" element={<IncomeChart />} />
          <Route path="/salesChart" element={<SalesChart />} />
          <Route path="/expensesChart" element={<ExpensesChart />} />
        </Route>
      </Routes>
    </Router>
  );
}
