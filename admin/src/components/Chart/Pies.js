import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from 'react-chartjs-2';
import { defaults } from 'chart.js';
import { expensesUrl } from '../../utils/constant';


export const Pies = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios
      .get(`${expensesUrl}`)
      .then((res) => {
        console.log('API Response:', res.data);

        // Assuming the API response has properties like 'ExpenseDate', 'ExpenseCategory', 'Description', 'Amount'
        const expenses = res.data;

        // Extracting unique expense categories and sorting alphabetically
        const uniqueCategories = Array.from(new Set(expenses.map((expense) => expense.ExpenseCategory))).sort();

        // Initializing data arrays for labels and dataset
        const labels = uniqueCategories;
        const totalExpensesData = Array(uniqueCategories.length).fill(0);

        // Calculating total expenses for each category
        expenses.forEach((expense) => {
          const categoryIndex = uniqueCategories.indexOf(expense.ExpenseCategory);
          totalExpensesData[categoryIndex] += parseFloat(expense.Amount);
        });

        // Generate pastel colors for each category
        const backgroundColors = uniqueCategories.map(() => getRandomPastelColor());

        setChartData({
          labels,
          datasets: [
            {
              data: totalExpensesData,
              backgroundColor: backgroundColors,
            },
          ],
        });
      })
      .catch((err) => {
        console.error('Error fetching data:', err);

        // Log specific details of the error
        if (err.response) {
          // The request was made and the server responded with a status code
          console.error('Server responded with:', err.response.status, err.response.data);
        } else if (err.request) {
          // The request was made but no response was received
          console.error('No response received. Request details:', err.request);
        } else {
          console.error('Error details:', err.message);
        }
      });
  }, []);

  const getRandomPastelColor = () => {
    // Function to generate a random pastel color in RGBA format
    const baseColor = Math.floor(Math.random() * 360); // Random hue
    const saturation = Math.floor(Math.random() * 30) + 70; // Random saturation between 70 and 100
    const lightness = Math.floor(Math.random() * 20) + 70; // Random lightness between 70 and 90

    return `hsla(${baseColor}, ${saturation}%, ${lightness}%, 0.7)`;
  };

  return (
    <div style={{ height: '90%' }}>
      <div className="title">Top Expense Categories</div>
      <Pie
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
              align: 'start',
            },
            legend: {
              display: false,
            },
          },
          elements: {
            arc: {
              spacing: 2, // Adjust the spacing value as needed
            },
          },
        }}
      />
    </div>
  );
};
