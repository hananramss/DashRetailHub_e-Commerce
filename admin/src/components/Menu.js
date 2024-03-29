import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import '../styles/components/menu.scss';

export const Menu = () => {
  const location = useLocation();

  return (
    <div className="menu">
      <div className="item">
        <span className="title">MAIN</span>
        <Link to="/dashboard" className={`listItem ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <DashboardOutlined />
          <span className="listItemTitle">Dashboard</span>
        </Link>
      </div>
      <div className="item">
        <span className="title">LISTS</span>
        <Link to="/users" className={`listItem ${location.pathname === '/users' ? 'active' : ''}`}>
          <UserOutlined />
          <span className="listItemTitle">Users</span>
        </Link>
        <Link to="/products" className={`listItem ${location.pathname === '/products' ? 'active' : ''}`}>
          <ShoppingCartOutlined />
          <span className="listItemTitle">Products</span>
        </Link>
        <Link to="/orders" className={`listItem ${location.pathname === '/orders' ? 'active' : ''}`}>
          <ShoppingOutlined />
          <span className="listItemTitle">Orders</span>
        </Link>
      </div>
      <div className="item">
        <span className="title">ANALYTICS</span>
        <Link to="/dashboard" className={`listItem ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <BarChartOutlined />
          <span className="listItemTitle">Charts</span>
        </Link>
        <Link to="/users" className={`listItem ${location.pathname === '/users' ? 'active' : ''}`}>
          <FileTextOutlined />
          <span className="listItemTitle">Logs</span>
        </Link>
      </div>
      <div className="item">
        <span className="title">MAINTENANCE</span>
        <Link to="/products" className={`listItem ${location.pathname === '/products' ? 'active' : ''}`}>
          <SettingOutlined />
          <span className="listItemTitle">Settings</span>
        </Link>
      </div>
    </div>
  );
};
