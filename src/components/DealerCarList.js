import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCar } from '../services/api';
import './DealerCarList.css';

const DealerCarList = ({ cars, setCars }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(id);
        setCars(cars.filter(car => car.id !== id));
      } catch (error) {
        console.error('Error deleting car:', error);
        alert('Failed to delete car. Please try again.');
      }
    }
  };

  return (
    <div className="dealer-cars">
      <h2 className="dealer-cars-title">Your Cars</h2>
      <div className="dealer-car-list">
        {cars.map(car => (
          <div key={car.id} className="dealer-car-card">
            <img 
              src={car.image || '/images/default-car.jpg'} 
              alt={`${car.make} ${car.model}`} 
              className="dealer-car-image"
            />
            <div className="dealer-car-info">
              <h3 className="dealer-car-name">{car.make} {car.model}</h3>
              <p>{car.year} • {car.mileage}km</p>
              <p className="dealer-car-price">${car.price.toLocaleString()}/day</p>
            </div>
            <div className="dealer-car-actions">
              <button onClick={() => navigate(`/edit-car/${car.id}`)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(car.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealerCarList;