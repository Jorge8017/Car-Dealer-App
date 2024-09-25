import React, { useState, useEffect } from 'react';
import { fetchLeads } from '../services/api';
import './LeadsList.css';

const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const fetchedLeads = await fetchLeads();
        setLeads(fetchedLeads);
      } catch (err) {
        setError('Failed to fetch leads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  if (loading) return <div className="leads-loading">Loading leads...</div>;
  if (error) return <div className="leads-error">{error}</div>;

  return (
    <div className="leads-list-container">
      <h1 className="leads-list-title">Car Leads This Week</h1>
      <div className="table-container">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.email}</td>
                <td>
                  <a href={lead.url} target="_blank" rel="noopener noreferrer">
                    {lead.carName}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsList;