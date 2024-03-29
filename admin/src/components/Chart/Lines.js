import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Chart as ChartJS } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import { salesUrl } from '../../utils/constant';



export const Lines = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios
      .get(`${salesUrl}`)
      .then((res) => {
        console.log('API Response:', res.data);

        // Initialize an array to store total sales for each month
        const totalSalesByMonth = Array(12).fill(0);

        // Iterate through the data and accumulate total sales for each month
        res.data.forEach((sales) => {
          const month = new Date(sales.InvoiceDate).getMonth(); // 0 (January) to 11 (December)
          totalSalesByMonth[month] += sales.Quantity * sales.UnitPrice;
        });

        const labels = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];

        const totalSalesDataset = {
          label: 'Total Sales',
          data: totalSalesByMonth,
          pointBackgroundColor: '#003F62',
          borderColor: '#5E92A3',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          fill: true, // Fill the area under the line
        };

        setChartData({
          labels,
          datasets: [totalSalesDataset],
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
  }, []);

  return (
    <div style={{ height: '80%' }}>
        {/* <div className="title">Monthly Total Sales</div> */}
            <Line
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
