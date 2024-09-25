import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarForm from '../components/CarForm';
import ImageUpload from '../components/ImageUpload';
import { fetchCarById, updateCar } from '../services/api';
import './CarForm.css';

const EditCar = () => {
  const [car, setCar] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCar = async () => {
      try {
        const fetchedCar = await fetchCarById(id);
        setCar(fetchedCar);
        setUploadedImages(fetchedCar.images || []);
      } catch (err) {
        setError('Failed to load car details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCar();
  }, [id]);

  const handleSubmit = async (carData) => {
    try {
      const formData = new FormData();
      
      Object.keys(carData).forEach(key => {
        formData.append(key, carData[key]);
      });
      
      uploadedImages.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      await updateCar(id, formData);
      alert('Car updated successfully!');
      navigate('/cars');
    } catch (error) {
      console.error('Error updating car:', error);
      alert('Failed to update car. Please try again.');
    }
  };

  const handleImageUpload = (files) => {
    setUploadedImages(prevImages => [...prevImages, ...files]);
  };

  if (loading) return <div className="loading">Loading car details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!car) return <div className="error">Car not found</div>;

  return (
    <div className="main-container">
      <h1>Edit Car</h1>
      <div className="form-container">
        <CarForm onSubmit={handleSubmit} initialData={car} />
      </div>
      <div className="dropzone-container">
        <ImageUpload onUpload={handleImageUpload} initialImages={uploadedImages} />
      </div>
      <button type="submit" onClick={() => document.querySelector('form').requestSubmit()}>
        Update Car
      </button>
    </div>
  );
};

export default EditCar;