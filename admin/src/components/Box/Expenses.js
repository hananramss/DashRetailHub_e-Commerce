import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EyeFilled, MoreOutlined, ArrowUpOutlined, ArrowDownOutlined, CreditCardOutlined    } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { expensesUrl } from '../../utils/constant';
import '../../styles/components/Box/sales.scss';
import axios from 'axios';

export const Expenses = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [lastYearExpenses, setLastYearExpenses] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [currentYear, setCurrentYear] = useState('');
  const [arrowIcon, setArrowIcon] = useState(null);

  useEffect(() => {
    axios
      .get(`${expensesUrl}`)
      .then((res) => {
        console.log('Response data:', res.data);

        // Get the current year for dynamic display
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        setCurrentYear(`Year ${currentYear}`);

        // Calculate total expenses for the current year (2024)
      const thisYearExpenses = res.data.reduce((acc, expense) => {
        const expenseAmount = parseFloat(expense.Amount);
        const expenseYear = new Date(expense.ExpenseDate).getFullYear();

        if (!isNaN(expenseAmount) && expenseYear === 2024) {
          return acc + expenseAmount;
        }
        return acc;
      }, 0);

        console.log('Total Expenses:', thisYearExpenses);
        setTotalExpenses(thisYearExpenses);

        // Calculate total expenses for last year
        const lastYear = currentYear - 1;
        const lastYearExpenses = res.data.reduce((acc, expense) => {
          const expenseDate = new Date(expense.ExpenseDate);
          if (expenseDate.getFullYear() === lastYear) {
            const expenseAmount = parseFloat(expense.Amount);
            if (!isNaN(expenseAmount)) {
              return acc + expenseAmount;
            }
          }
          return acc;
        }, 0);

        console.log('Last Year Expenses:', lastYearExpenses);
        setLastYearExpenses(lastYearExpenses);

        // Calculate percentage change with a cap of 100%
        const rawPercentageChange = ((thisYearExpenses - lastYearExpenses) / lastYearExpenses) * 100;
        const percentageChange = Math.min(rawPercentageChange, 100);

        setPercentageChange(percentageChange);
        setArrowIcon(percentageChange < 0 ? <ArrowDownOutlined style={{ color: 'red' }} /> : <ArrowUpOutlined style={{ color: 'green' }} />);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  // Format the totalExpenses with commas and two decimal places
  const formattedTotalExpenses = totalExpenses.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // const menu = (
  //   <Menu>
  //     <Link to="/ExpensesChart">See Chart</Link>
  //   </Menu>
  // );

  return (
    <div className="salesContainer">
      <div className="sales">
        <div className="salesInfo">
          <div className="title">Total Expenses</div>
          <div className="amountContainer">
            <div className="amountIcon"><CreditCardOutlined    /></div>
            <div className="amount">PHP {formattedTotalExpenses}</div>
          </div>
          <div></div>
        </div>
        <div className="percentageInfo">
          {/* <Dropdown overlay={menu} placement="bottomRight">
            <Link to="/" className="more-icon"> <MoreOutlined /> </Link>
          </Dropdown> */}
           <Link to="/ExpensesChart" className="more-icon"> <EyeFilled style={{fontSize:'18px'}}/> </Link>
          <div className="percentage">
            {arrowIcon} {Math.abs(percentageChange).toFixed(2)}%
          </div>
        </div>
      </div>
      <div className="duration">{currentYear}</div>
    </div>
  );
};
