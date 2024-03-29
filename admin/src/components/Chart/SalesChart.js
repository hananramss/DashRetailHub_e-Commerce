import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Lines } from '../Chart/Lines';
import { Bar } from 'react-chartjs-2';
import { salesUrl } from '../../utils/constant';

import '../../styles/components/Charts/SalesChart.scss';

export const SalesChart = () => {
    const [totalSales, setTotalSales] = useState(0);
    const [currentYear, setCurrentYear] = useState('');
    const [lineChartData, setLineChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [barChartData, setBarChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        axios
            .get(`${salesUrl}`)
            .then((res) => {
                console.log('API Response:', res.data);

                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();

                // Filter sales data for the current year
                const thisYearSales = res.data
                    .filter((sale) => new Date(sale.InvoiceDate).getFullYear() === currentYear)
                    .reduce((acc, sale) => acc + sale.Quantity * sale.UnitPrice, 0);

                setTotalSales(thisYearSales);

                // Initialize arrays to store total sales for each month for both line and bar charts
                const totalSalesByMonthLine = Array(12).fill(0);
                const totalSalesByMonthBar = Array(12).fill(0);

                // Iterate through the data and accumulate total sales for each month
                res.data.forEach((sales) => {
                    const month = new Date(sales.InvoiceDate).getMonth(); // 0 (January) to 11 (December)
                    totalSalesByMonthLine[month] += sales.Quantity * sales.UnitPrice;
                    totalSalesByMonthBar[month] += sales.Quantity * sales.UnitPrice;
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

                const totalSalesDatasetLine = {
                    label: 'Total Sales (Line Chart)',
                    data: totalSalesByMonthLine,
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                };

                const totalSalesDatasetBar = {
                    label: 'Total Sales (Bar Chart)',
                    data: totalSalesByMonthBar,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                };

                setLineChartData({
                    labels,
                    datasets: [totalSalesDatasetLine],
                });

                setBarChartData({
                    labels,
                    datasets: [totalSalesDatasetBar],
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

    return (
        <div className="salesChart" style={{ height: '85%' }}>
            <div className="title-container">
                <div className="title">Total Sales ({currentYear})</div>
            </div>
            <div className="amount">PHP {formattedTotalSales}</div>
            <Bar 
                        data={barChartData}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            scales: {
                                x: { grid: { display: false, borderWidth: 0 } },
                                y: { grid: { display: false, borderWidth: 0 } },
                            },
                            plugins: { legend: { display: true } },
                        }}
                    />
                </div>
    );
};
