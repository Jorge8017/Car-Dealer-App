import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchLeads, fetchCars } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedLeads, fetchedCars] = await Promise.all([fetchLeads(), fetchCars()]);
        setLeads(fetchedLeads);
        setCars(fetchedCars);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Quick Stats</h2>
          <div className="card-divider"></div>
          <ul className="card-list">
            <li>
              <span className="item-label">Total Cars:</span>
              <span className="item-value">{cars.length}</span>
            </li>
            <li>
              <span className="item-label">Total Leads:</span>
              <span className="item-value">{leads.length}</span>
            </li>
          </ul>
          <Link to="/full-stats" className="view-all-button">View All Stats</Link>
        </div>
        
        <div className="dashboard-card">
          <h2>Recent Leads</h2>
          <div className="card-divider"></div>
          <ul className="card-list">
            {leads.slice(0, 2).map(lead => (
              <li key={lead.id}>
                <span className="item-label">{lead.name}</span>
                <span className="item-value">{lead.email}</span>
              </li>
            ))}
          </ul>
          <Link to="/leads" className="view-all-button">View All Leads</Link>
        </div>
        
        <div className="dashboard-card">
          <h2>Recently Added Cars</h2>
          <div className="card-divider"></div>
          <ul className="card-list">
            {cars.slice(0, 2).map(car => (
              <li key={car.id}>
                <span className="item-label">{car.make} {car.model}</span>
                <span className="item-value">{car.year}</span>
              </li>
            ))}
          </ul>
          <Link to="/cars" className="view-all-button">View All Cars</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;