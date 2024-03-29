import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { EyeFilled, MoreOutlined, ArrowUpOutlined, ArrowDownOutlined, DollarCircleOutlined   } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

import { salesUrl } from '../../utils/constant';

import '../../styles/components/Box/sales.scss';

export const Income = () => {
  const [todayIncome, setTodayIncome] = useState(0);
  const [yesterdayIncome, setYesterdayIncome] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [currentDay, setCurrentDay] = useState('');
  const [arrowIcon, setArrowIcon] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in ISO format
  
    axios.get(`${salesUrl}`)
      .then((res) => {
        const todaySales = res.data.filter((sale) => sale.InvoiceDate.startsWith(today));
        console.log('Sales Data:', res.data);
  
        const totalTodayIncome = todaySales.reduce((total, sale) => {
          const saleAmount = sale.Quantity * sale.UnitPrice;
          if (!isNaN(saleAmount)) {
            return total + saleAmount;
          }
          return total;
        }, 0);
  
        // Set yesterdayIncome and calculate percentage change here
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const formattedYesterday = yesterday.toISOString().split('T')[0];
        const yesterdaySales = res.data.filter((sale) => sale.InvoiceDate.startsWith(formattedYesterday));
  
        const totalYesterdayIncome = yesterdaySales.reduce((total, sale) => {
          const saleAmount = sale.Quantity * sale.UnitPrice;
          if (!isNaN(saleAmount)) {
            return total + saleAmount;
          }
          return total;
        }, 0);
  
        setYesterdayIncome(totalYesterdayIncome);
  
        // Calculate percentage change with a cap of 100%
        const rawPercentageChange = ((totalTodayIncome - totalYesterdayIncome) / totalYesterdayIncome) * 100;
        const percentageChange = Math.min(rawPercentageChange, 100);
        setPercentageChange(percentageChange);
  
        // Set arrow icon based on percentage change
        setArrowIcon(percentageChange < 0 ? <ArrowDownOutlined style={{ color: 'red' }} /> : <ArrowUpOutlined style={{ color: 'green' }} />);
  
        // Set todayIncome
        setTodayIncome(totalTodayIncome);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  
    // Get the current day for dynamic display
    const currentDate = new Date();
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    setCurrentDay(formattedDate);
  }, []);

  // Format the todayIncome with commas and two decimal places
  const formattedTodayIncome = todayIncome.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // const menu = (
  //   <Menu>
  //     <Link to="/incomeChart">See Chart</Link>
  //   </Menu>
  // );

  return (
    <div className="salesContainer">
      <div className="sales">
        <div className="salesInfo">
          <div className="title">Today's Income</div>
          <div className="amountContainer">
            <div className="amountIcon"><DollarCircleOutlined   /></div>
            <div className="amount">PHP {formattedTodayIncome}</div>
          </div>
        </div>
        <div className="percentageInfo">
            <Link to="/incomeChart" className="more-icon"> <EyeFilled style={{fontSize:'18px'}}/> </Link>
          <div className="percentage">
            {arrowIcon} {Math.abs(percentageChange).toFixed(2)}%
          </div>
        </div>
      </div>
      <div className="duration">{currentDay}</div>
    </div>
  );
};
