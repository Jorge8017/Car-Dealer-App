import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCarById, fetchProfile } from '../services/api';
import './CarDetails.css';

const MessageForm = ({ onClose, carName }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message sent:', message);
    alert('Message sent!');
    onClose();
  };

  return (
    <div className="message-form-overlay">
      <div className="message-form">
        <h2>Enquire about {carName}</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows="5"
          />
          <div className="form-buttons">
            <button type="submit">Send</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const [dealer, setDealer] = useState(null);
  const [showDealerProfile, setShowDealerProfile] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [carData, dealerData] = await Promise.all([
          fetchCarById(id),
          fetchProfile()
        ]);
        setCar(carData);
        setDealer(dealerData);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return <div className="car-details-loading">Loading car details...</div>;
  if (error) return <div className="car-details-error">{error}</div>;
  if (!car) return <div className="car-details-error">Car not found</div>;

  return (
    <div className="container">
      <h1>{car.year} {car.make} {car.model}</h1>
      
      <img src={car.image || '/images/default-car.jpg'} alt={`${car.year} ${car.make} ${car.model}`} className="car-image" />
      
      <div className="car-header">
        <div className="car-info-column">
          <span className="car-condition">{car.condition} Car</span>
          <span className="car-year">{car.year}</span>
          <span className="car-mileage">{car.mileage} Km</span>
        </div>
        <div className="price-container">
          <span className="price-label">Price:</span>
          <span className="price-value">${car.price.toLocaleString()}</span>
        </div>
      </div>

      <table className="car-specs">
        <tbody>
          <tr>
            <td>Make</td>
            <td>{car.make}</td>
            <td>Condition</td>
            <td>{car.condition}</td>
          </tr>
          <tr>
            <td>Model</td>
            <td>{car.model}</td>
            <td>Year</td>
            <td>{car.year}</td>
          </tr>
          <tr>
            <td>Dealership</td>
            <td>{dealer?.dealershipName || 'N/A'}</td>
            <td>Transmission</td>
            <td>{car.transmission}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{dealer?.address || 'N/A'}</td>
            <td>Color</td>
            <td>{car.colour}</td>
          </tr>
          <tr>
            <td>Km</td>
            <td>{car.mileage}</td>
            <td>Stock No.</td>
            <td>{car.stockNo || 'N/A'}</td>
          </tr>
          <tr>
            <td>Body Type</td>
            <td>{car.bodyType || 'N/A'}</td>
            <td>Warranty</td>
            <td>{car.warranty || 'n/a'}</td>
          </tr>
        </tbody>
      </table>

      <p className="car-description">{car.description}</p>

      <button className="cta-button" onClick={() => setShowMessageForm(true)}>Enquire Now</button>

      <button className="dealer-profile-button" onClick={() => setShowDealerProfile(!showDealerProfile)}>
        {showDealerProfile ? 'Hide Dealer Profile' : 'Show Dealer Profile'}
      </button>

      {showDealerProfile && dealer && (
        <div className="dealer-profile">
          <h2>Dealer Profile</h2>
          <div className="dealer-info">
            <p><strong>Name:</strong> {dealer.name}</p>
            <p><strong>Email:</strong> {dealer.email}</p>
            <p><strong>Phone:</strong> {dealer.phone}</p>
            <p><strong>Address:</strong> {dealer.address}</p>
            <p><strong>Dealership Name:</strong> {dealer.dealershipName}</p>
            <p><strong>Years in Operation:</strong> {dealer.yearsInOperation}</p>
            <p><strong>Inventory Count:</strong> {dealer.inventoryCount}</p>
          </div>
        </div>
      )}

      {showMessageForm && (
        <MessageForm 
          onClose={() => setShowMessageForm(false)} 
          carName={`${car.year} ${car.make} ${car.model}`} 
        />
      )}
    </div>
  );
};

export default CarDetails;