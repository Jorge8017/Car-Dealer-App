import React from 'react';
import { Link } from 'react-router-dom';
import './CarList.css';

const CarList = ({ cars }) => {
  return (
    <div className="featured-cars">
      <h2>Featured Cars</h2>
      <div className="car-container">
        {cars.map(car => (
          <div key={car.id} className="car-card">
            <img 
              src={car.image || '/images/default-car.jpg'} 
              alt={`${car.make} ${car.model}`} 
              className="car-image"
            />
            <div className="car-info">
              <h3 className="car-name">{car.make} {car.model}</h3>
              <p>{car.year} • {car.mileage}km</p>
              <p className="car-price">${car.price}/day</p>
              <Link to={`/car/${car.id}`} className="view-details">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;