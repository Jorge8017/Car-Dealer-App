import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDealerCars, deleteCar } from '../services/api';
import './CarsList.css';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCars = async () => {
      try {
        const fetchedCars = await fetchDealerCars();
        setCars(fetchedCars);
      } catch (err) {
        setError('Failed to fetch cars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(id);
        setCars(cars.filter(car => car.id !== id));
      } catch (err) {
        setError('Failed to delete car. Please try again later.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-car/${id}`);
  };

  if (loading) return <div className="cars-loading">Loading cars...</div>;
  if (error) return <div className="cars-error">{error}</div>;

  return (
    <div className="cars-list-container">
      <h1 className="cars-list-title">Car Dealer Inventory</h1>
      <div className="table-container">
        <table className="cars-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Stock No</th>
              <th>Model</th>
              <th>Year</th>
              <th>Mileage (km)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.id}>
                <td>
                  <img 
                    src={car.image || '/images/default-car.jpg'} 
                    alt={`${car.make} ${car.model}`} 
                    className="car-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/default-car.jpg';
                    }}
                  />
                </td>
                <td>{car.stockNo}</td>
                <td>{car.make} {car.model}</td>
                <td>{car.year}</td>
                <td>{car.mileage}</td>
                <td>
                  <button onClick={() => handleEdit(car.id)} className="edit-button">Edit</button>
                  <button onClick={() => handleDelete(car.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <Link to="/add-car" className="add-car-button">Add New Car</Link>
      </div>
    </div>
  );
};

export default CarsList;