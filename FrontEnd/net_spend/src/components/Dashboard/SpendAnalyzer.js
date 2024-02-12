// src/components/Dashboard/SpendAnalyzer.js
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function SpendAnalyzer({ transactions }) {
  // Example structure for transactions: [{ category: 'Groceries', amount: 150 }, ...]

  const [data, setData] = useState([]);

  useEffect(() => {
    // Transform transactions into a format suitable for the chart
    const chartData = transformDataForChart(transactions);
    setData(chartData);
  }, [transactions]);

  const transformDataForChart = (transactions) => {
    // Implement logic to aggregate transactions by category, for example
    // This is a placeholder function
    return transactions; // Transform this according to your needs
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SpendAnalyzer;
