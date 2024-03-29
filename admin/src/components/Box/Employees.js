import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EyeFilled, MoreOutlined, TeamOutlined  } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { employeesUrl } from '../../utils/constant';
import '../../styles/components/Box/sales.scss';
import axios from 'axios';

export const Employees = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    axios
      .get(`${employeesUrl}`)
      .then((res) => {
        console.log(res.data); // Log the response to check its structure
        const totalEmployeesCount = res.data.length;
        setTotalEmployees(totalEmployeesCount);
  
        // Get the current year for dynamic display
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        setCurrentYear(`Year ${currentYear}`);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);


  return (
    <div className="salesContainer">
      <div className="sales">
        <div className="salesInfo">
          <div className="title">Total Employees</div>
          <div className="amountContainer">
            <div className="amountIcon"><TeamOutlined /></div>
            <div className="amount">{totalEmployees}</div>
          </div>
          <div></div>
        </div>
        <div className="percentageInfo">
            <Link to="/" className="more-icon"> <EyeFilled style={{fontSize:'18px'}}/> </Link>
        </div>
      </div>
      <div className="duration">{currentYear}</div>
    </div>
  );
};
