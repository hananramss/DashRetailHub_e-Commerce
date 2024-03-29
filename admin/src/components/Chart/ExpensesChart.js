import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { expensesUrl } from '../../utils/constant';

import '../../styles/components/Charts/ExpensesChart.scss';

export const ExpensesChart = () => {
    const [totalExpenses, setTotalExpenses] = useState({ amount: 0 });
    const [lastYearExpenses, setLastYearExpenses] = useState({ amount: 0 });
    const [currentYear, setCurrentYear] = useState('');
    const [lastYear, setLastYear] = useState('');
    const [selectedYear, setSelectedYear] = useState(''); // 'combined', '2023', or '2024'
    const [chartData, setChartData] = useState({
      labels: [],
      datasets: [],
    });
  
    useEffect(() => {
      axios
        .get(`${expensesUrl}`)
        .then((res) => {
          console.log('API Response:', res.data);
  
          const currentDate = new Date();
          setCurrentYear(currentDate.getFullYear().toString());
  
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
          setTotalExpenses({ amount: thisYearExpenses });
  
          // Calculate total expenses for last year
          const lastYear = currentDate.getFullYear() - 1;
          setLastYear(lastYear.toString());
  
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
          setLastYearExpenses({ amount: lastYearExpenses });
  
          // Extract unique labels without repetition
          const uniqueLabels = Array.from(new Set(res.data.map((expense) => expense.ExpenseCategory)));
  
          // Initialize arrays before using them
          const labels = uniqueLabels;
  
          // Calculate expenses by category based on the selected year
          const totalExpensesData = res.data
            .filter((expense) => new Date(expense.ExpenseDate).getFullYear() === 2024)
            .map((expense) => parseFloat(expense.Amount));
  
          const lastYearExpensesData = res.data
            .filter((expense) => new Date(expense.ExpenseDate).getFullYear() === lastYear)
            .map((expense) => parseFloat(expense.Amount));
  
          setChartData({
            labels,
            datasets: [
              {
                label: `Total Expenses ${currentYear}`,
                data: selectedYear === '2024' || selectedYear === '' ? totalExpensesData : [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
              {
                label: `Last Year Expenses ${lastYear}`,
                data: selectedYear === '2023' || selectedYear === '' ? lastYearExpensesData : [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          });
        })
        .catch((err) => {
          console.error('Error fetching data:', err);
  
          if (err.response) {
            console.error('Server responded with:', err.response.status, err.response.data);
          } else if (err.request) {
            console.error('No response received. Request details:', err.request);
          } else {
            console.error('Error details:', err.message);
          }
        });
    }, [selectedYear]); // Trigger the effect when the selectedYear changes
  
    // Format the totalExpenses with commas and two decimal places
    const formattedThisYearExpenses = totalExpenses.amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    // Format the lastYearExpenses with commas and two decimal places
    const formattedLastYearExpenses = lastYearExpenses.amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return (
      <div className="expensesChart" style={{ height: '85%' }}>
        <div className="title-container">
          <div className="title">Total Expenses {selectedYear}</div>
          <div className="btns">
                <button className="btn" onClick={() => setSelectedYear('2023')}>2023</button>
                <button className="btn" onClick={() => setSelectedYear('2024')}>2024</button>
                <button className="btn" onClick={() => setSelectedYear('')}>Combined</button>
          </div> 
        </div>
        {selectedYear !== '2024' && selectedYear !== '' &&  (
            <div className="amount">
                Amount: PHP {formattedLastYearExpenses}
            </div>
          )}       
        {selectedYear !== '2023' && selectedYear !== '' &&  (
            <div className="amount">
                Amount: PHP {formattedThisYearExpenses} 
            </div>
          )}   
        <Bar className="bar"
          data={chartData}
          options={{
            maintainAspectRatio: false, // Set to false to allow manual adjustment
            responsive: true,
            scales: {
                x: {
                  grid: {
                    display: false,
                    borderWidth: 0, // Set x-axis border width to 0
                  },
                },
                y: {
                  grid: {
                    display: false,
                    borderWidth: 0, // Set y-axis border width to 0
                  },
                },
              },
            plugins: {
              legend: {
                display: true, // Set to true to display the legend
              },
            },
          }}
        />
      </div>
    );
  };
  