import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './FullStats.css';

const generateMonthlyData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    monthlyLeads: Math.floor(Math.random() * 100) + 50,
    topModels: [
      { name: 'Model A', Units: Math.floor(Math.random() * 100) + 200 },
      { name: 'Model B', Units: Math.floor(Math.random() * 100) + 150 },
      { name: 'Model C', Units: Math.floor(Math.random() * 100) + 100 },
    ],
    leadsByBrand: [
      { name: 'Toyota', Conversion: Math.floor(Math.random() * 30) + 60 },
      { name: 'VW', Conversion: Math.floor(Math.random() * 30) + 50 },
      { name: 'BMW', Conversion: Math.floor(Math.random() * 30) + 40 },
      { name: 'Mini', Conversion: Math.floor(Math.random() * 30) + 30 },
    ],
    serviceRevenue: Math.floor(Math.random() * 10000) + 10000,
  }));
};

const allMonthsData = generateMonthlyData();

const FullStats = () => {
  const [selectedMonth, setSelectedMonth] = useState('Overall');

  const monthlyLeadsData = allMonthsData.map(data => ({
    name: data.month,
    Sales: data.monthlyLeads,
  }));

  const overallData = useMemo(() => {
    const topModels = allMonthsData.reduce((acc, month) => {
      month.topModels.forEach(model => {
        if (!acc[model.name]) acc[model.name] = 0;
        acc[model.name] += model.Units;
      });
      return acc;
    }, {});

    const leadsByBrand = allMonthsData.reduce((acc, month) => {
      month.leadsByBrand.forEach(brand => {
        if (!acc[brand.name]) acc[brand.name] = [];
        acc[brand.name].push(brand.Conversion);
      });
      return acc;
    }, {});

    const avgLeadsByBrand = Object.entries(leadsByBrand).map(([name, conversions]) => ({
      name,
      Conversion: conversions.reduce((sum, val) => sum + val, 0) / conversions.length
    }));

    const totalServiceRevenue = allMonthsData.reduce((sum, month) => sum + month.serviceRevenue, 0);

    return {
      topModels: Object.entries(topModels).map(([name, Units]) => ({ name, Units })),
      leadsByBrand: avgLeadsByBrand,
      serviceRevenue: totalServiceRevenue
    };
  }, []);

  const currentData = selectedMonth === 'Overall' ? overallData : allMonthsData.find(data => data.month === selectedMonth) || overallData;

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="full-stats-container">
      <div className="full-stats-header">
        <h1>Analytics Dashboard</h1>
        <select value={selectedMonth} onChange={handleMonthChange} className="month-selector">
          <option value="Overall">Overall</option>
          {allMonthsData.map(data => (
            <option key={data.month} value={data.month}>{data.month}</option>
          ))}
        </select>
      </div>
      <div className="full-stats-dashboard">
        <div className="stat-card">
          <h2>Monthly Leads</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyLeadsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="stat-card">
          <h2>Top Models {selectedMonth !== 'Overall' && `(${selectedMonth})`}</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData.topModels || []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Units" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="stat-card">
          <h2>Leads by Brand {selectedMonth !== 'Overall' && `(${selectedMonth})`}</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData.leadsByBrand || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Conversion" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="stat-card">
          <h2>Service Department Revenue {selectedMonth !== 'Overall' && `(${selectedMonth})`}</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[{ name: selectedMonth, Revenue: currentData.serviceRevenue || 0 }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Revenue" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FullStats;
