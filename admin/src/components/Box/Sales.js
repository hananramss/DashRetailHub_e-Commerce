import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EyeFilled, MoreOutlined, ArrowUpOutlined, ArrowDownOutlined, BarChartOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { salesUrl } from '../../utils/constant';
import '../../styles/components/Box/sales.scss';
import axios from 'axios';

export const Sales = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [lastYearSales, setLastYearSales] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [currentYear, setCurrentYear] = useState('');
  const [arrowIcon, setArrowIcon] = useState(null);

  useEffect(() => {
    axios
      .get(`${salesUrl}`)
      .then((res) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        // Filter sales data for the current year
        const thisYearSales = res.data
          .filter((sale) => new Date(sale.InvoiceDate).getFullYear() === currentYear)
          .reduce((acc, sale) => acc + sale.Quantity * sale.UnitPrice, 0);

        // Calculate last year's sales
        const lastYear = currentYear - 1;
        const lastYearSales = res.data
          .filter((sale) => new Date(sale.InvoiceDate).getFullYear() === lastYear)
          .reduce((acc, sale) => acc + sale.Quantity * sale.UnitPrice, 0);

        // Log sales data to the console
        console.log('2024 Sales:', thisYearSales);
        console.log('2023 Sales:', lastYearSales);

        // Calculate percentage change with a cap of 100%
        const rawPercentageChange = ((thisYearSales - lastYearSales) / lastYearSales) * 100;
        const percentageChange = Math.min(rawPercentageChange, 100);

        // Set the correct values
        setTotalSales(thisYearSales);
        setLastYearSales(lastYearSales);
        setPercentageChange(percentageChange);
        setArrowIcon(percentageChange < 0 ? <ArrowDownOutlined style={{ color: 'red' }} /> : <ArrowUpOutlined style={{ color: 'green' }} />);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });

    // Get the current year for dynamic display
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    setCurrentYear(`Year ${currentYear}`);
  }, []);

  // Format the totalSales with commas and two decimal places
  const formattedTotalSales = totalSales.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // const menu = (
  //   <Menu>
  //     <Link to="/SalesChart">See Chart</Link>
  //   </Menu>
  // );

  return (
    <div className="salesContainer">
      <div className="sales">
        <div className="salesInfo">
          <div className="title">Total Sales</div>
          <div className="amountContainer">
            <div className="amountIcon"><BarChartOutlined /></div>
            <div className="amount">PHP {formattedTotalSales}</div>
          </div>
          <div></div>
        </div>
        <div className="percentageInfo">
            <Link to="/SalesChart" className="more-icon"> <EyeFilled style={{fontSize:'18px'}}/> </Link>
          <div className="percentage">
            {arrowIcon} {Math.abs(percentageChange).toFixed(2)}%
          </div>
        </div>
      </div>
      <div className="duration">{currentYear}</div>
    </div>
  );
};
