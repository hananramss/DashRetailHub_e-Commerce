import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { salesUrl } from '../../utils/constant';
import '../../styles/components/Charts/IncomeCharts.scss';

export const IncomeChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Income',
        data: [],
        fill: false,
        borderColor: '#1890ff', // You can customize the color
      },
    ],
  });

  const [totalTodayIncome, setTotalTodayIncome] = useState(0);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in ISO format
  
    axios.get(`${salesUrl}`)
      .then((res) => {
        const todaySales = res.data.filter((sale) => sale.InvoiceDate.startsWith(today));
        console.log('Sales Data:', todaySales);
  
        const totalTodayIncome = todaySales.reduce((total, sale) => {
          const saleAmount = sale.Quantity * sale.UnitPrice;
          return total + (isNaN(saleAmount) ? 0 : saleAmount);
        }, 0);
  
        // Set data for the bar chart
        const labels = todaySales.map((sale) => {
          const invoiceDate = new Date(sale.InvoiceDate);
          return invoiceDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        });
        const dataPoints = todaySales.map((sale) => sale.Quantity * sale.UnitPrice);
  
        setChartData({
          labels,
          datasets: [
            {
              label: 'Today\'s Income',
              data: dataPoints,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
  
        setTotalTodayIncome(totalTodayIncome);
  
        // Set current date
        setCurrentDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
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
  }, []);

  // Format the totalSales with commas and two decimal places
  const formattedTodaysIncome = totalTodayIncome.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="incomeChart" style={{ height: '85%' }}>
      <div className="title-container">
        <div className="title">Today's Income ({currentDate})</div>
      </div>
      <div className=" amount">PHP {formattedTodaysIncome}</div>
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
              display: false, // Set to false to hide the legend
            },
          },
        }}
      />
    </div>
  );
};
