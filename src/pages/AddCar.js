import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarForm from '../components/CarForm';
import ImageUpload from '../components/ImageUpload';
import { addCar } from '../services/api';
import './CarForm.css';

const AddCar = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (carData) => {
    try {
      const formData = new FormData();
      
      Object.keys(carData).forEach(key => {
        formData.append(key, carData[key]);
      });
      
      uploadedImages.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      await addCar(formData);
      alert('Car added successfully!');
      navigate('/cars');
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Failed to add car. Please try again.');
    }
  };

  const handleImageUpload = (files) => {
    setUploadedImages(prevImages => [...prevImages, ...files]);
  };

  return (
    <div className="main-container">
      <h1>Add New Car</h1>
      <div className="form-container">
        <CarForm onSubmit={handleSubmit} />
      </div>
      <div className="dropzone-container">
        <ImageUpload onUpload={handleImageUpload} />
      </div>
      <button type="submit" onClick={() => document.querySelector('form').requestSubmit()}>
        Add Car
      </button>
    </div>
  );
};

export default AddCar;