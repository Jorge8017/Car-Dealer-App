import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchProfile, updateProfile } from '../services/api';
import './Profile.css';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchProfile();
        Object.keys(profile).forEach(key => {
          setValue(key, profile[key]);
        });
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  if (loading) return <div className="profile-loading">Loading profile...</div>;
  if (error) return <div className="profile-error">{error}</div>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">Dealer Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name (Individual or Dealership)</label>
          <input id="name" {...register('name', { required: 'Name is required' })} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email', { required: 'Email is required' })} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input id="phone" {...register('phone', { required: 'Phone is required' })} />
          {errors.phone && <span className="error">{errors.phone.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input id="address" {...register('address', { required: 'Address is required' })} />
          {errors.address && <span className="error">{errors.address.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="dealershipName">Dealership Name (if applicable)</label>
          <input id="dealershipName" {...register('dealershipName')} />
        </div>
        
        <div className="form-group">
          <label htmlFor="licenseNumber">Business License Number</label>
          <input id="licenseNumber" {...register('licenseNumber')} />
        </div>
        
        <div className="form-group">
          <label htmlFor="yearsInOperation">Years in Operation</label>
          <input id="yearsInOperation" type="number" {...register('yearsInOperation', { min: 0 })} />
        </div>
        
        <div className="form-group">
          <label htmlFor="vehicleTypes">Types of Vehicles Sold</label>
          <input id="vehicleTypes" {...register('vehicleTypes')} />
        </div>
        
        <div className="form-group">
          <label htmlFor="inventoryCount">Current Number of Vehicles in Stock</label>
          <input id="inventoryCount" type="number" {...register('inventoryCount', { min: 0 })} />
        </div>
        
        <div className="form-group">
          <label htmlFor="paymentMethods">Preferred Payment Methods</label>
          <input id="paymentMethods" {...register('paymentMethods')} />
        </div>
        
        <div className="form-group">
          <label htmlFor="bankDetails">Bank Account Details</label>
          <input id="bankDetails" {...register('bankDetails')} />
        </div>
        
        <div className="form-group">
          <label htmlFor="govtId">Government-issued ID Number</label>
          <input id="govtId" {...register('govtId')} />
        </div>
        
        <div className="form-group">
          <label htmlFor="preferredCommunication">Preferred Communication Method</label>
          <select id="preferredCommunication" {...register('preferredCommunication')}>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="sms">SMS</option>
          </select>
        </div>
        
        <button type="submit" className="submit-button">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;