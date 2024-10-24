import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

const mockFeaturedCars = [
  { id: 1, make: 'Toyota', model: 'Camry', year: 2022, price: 25000, image: '/images/default-car.jpg', mileage: 15000, condition: 'Used', variant: 'LE', stockNo: 'TC001', vin: '1HGBH41JXMN109186', mmCode: 'CAM22', demoCar: false, colour: 'Silver', serviceHistory: 'Full dealer service history', motorPlan: '3 years/60,000 km', warranty: '5 years/100,000 km', extras: 'Bluetooth, Backup Camera', region: 'Western Cape', city: 'Cape Town', description: 'Well-maintained Toyota Camry with low mileage. Perfect for family use.' },
  { id: 2, make: 'Honda', model: 'Civic', year: 2023, price: 22000, image: '/images/default-car.jpg', mileage: 5000, condition: 'New', variant: 'Sport', stockNo: 'HC001', vin: '2HGFC2F59MH501234', mmCode: 'CIV23', demoCar: true, colour: 'Red', serviceHistory: 'First service done', motorPlan: '5 years/100,000 km', warranty: '5 years/unlimited km', extras: 'Sunroof, Apple CarPlay', region: 'Gauteng', city: 'Johannesburg', description: 'Brand new Honda Civic with sporty features. Ideal for city driving.' },
];

let mockDealerCars = [];

const mockLeads = [
  { 
    id: 1, 
    name: 'Dewald', 
    phone: '0734000299', 
    email: 'koekemoer.family@gmail.com',
    url: 'https://www.carmag.co.za/car-for-sale/used-2017-ford-ecosport-johannesburg/8277898/',
    carName: 'Ford EcoSport 2017'
  },
  { 
    id: 2, 
    name: 'Anna Moepye', 
    phone: '0817155327', 
    email: 'siphenianna7@gmail.com',
    url: 'https://www.carmag.co.za/car-for-sale/used-2018-toyota-corolla-johannesburg/8277909/',
    carName: 'Toyota Corolla 2018'
  },
  { 
    id: 3, 
    name: 'P Mngoma', 
    phone: '0837457311', 
    email: 'phumlilemngoma86@gmail.com',
    url: 'https://www.carmag.co.za/car-for-sale/used-2016-volkswagen-polo-johannesburg/8277924/',
    carName: 'Volkswagen Polo 2016'
  },
  { 
    id: 4, 
    name: 'Justin', 
    phone: '0747524564', 
    email: 'justinmathews355@gmail.com',
    url: 'https://www.carmag.co.za/car-for-sale/used-2014-mitsubishi-asx-johannesburg/8277933/',
    carName: 'Mitsubishi ASX 2014'
  },
];

const mockProfile = {
  name: 'John Doe Motors',
  email: 'john@doemotors.com',
  phone: '(555) 123-4567',
  address: '123 Main St, Anytown, USA',
  dealershipName: 'John Doe Motors',
  licenseNumber: 'ABC12345',
  yearsInOperation: 10,
  vehicleTypes: 'New, Used, All brands',
  inventoryCount: 50,
  paymentMethods: 'Cash, Credit Card, Financing',
  bankDetails: 'XXXX-XXXX-XXXX-1234',
  govtId: 'ID12345678',
  preferredCommunication: 'email'
};

export const login = async (email, password) => {
  if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    if (email === 'demo@example.com' && password === 'password') {
      return new Promise(resolve => 
        setTimeout(() => resolve({ token: 'mock-jwt-token' }), 500)
      );
    } else {
      throw new Error('Invalid credentials');
    }
  } else {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
};

export const fetchCars = async () => {
  if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    return new Promise(resolve => setTimeout(() => resolve(mockFeaturedCars), 500));
  } else {
    try {
      const response = await axios.get(`${API_BASE_URL}/cars`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  }
};

export const addCar = async (formData) => {
  if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    const carData = {};
    const images = [];
    for (let [key, value] of formData.entries()) {
      if (key.startsWith('image')) {
        images.push(URL.createObjectURL(value));
      } else {
        carData[key] = value;
      }
    }
    const newCar = { ...carData, id: Date.now(), images };
    mockDealerCars.push(newCar);
    return new Promise(resolve => setTimeout(() => resolve(newCar), 500));
  } else {
    try {
      const response = await axios.post(`${API_BASE_URL}/cars`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding car:', error);
      throw error;
    }
  }
};

export const fetchLeads = async () => {
  if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    return new Promise(resolve => setTimeout(() => resolve(mockLeads), 500));
  } else {
    try {
      const response = await axios.get(`${API_BASE_URL}/leads`);
      return response.data;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  }
};

export const fetchProfile = async () => {
  if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    return new Promise(resolve => setTimeout(() => resolve(mockProfile), 500));
  } else {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile`);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }
};

export const updateProfile = async (profileData) => {
  if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    return new Promise(resolve => setTimeout(() => resolve({ ...mockProfile, ...profileData }), 500));
  } else {
    try {
      const response = await axios.put(`${API_BASE_URL}/profile`, profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
};

export const fetchCarById = async (id) => {
  if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    const car = [...mockFeaturedCars, ...mockDealerCars].find(car => car.id === parseInt(id));
    return new Promise(resolve => 
      setTimeout(() => {
        if (car) {
          resolve(car);
        } else {
          throw new Error('Car not found');
        }
      }, 500)
    );
  } else {
    try {
      const response = await axios.get(`${API_BASE_URL}/cars/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching car details:', error);
      throw error;
    }
  }
};

export const fetchDealerCars = async () => {
  if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    return new Promise(resolve => setTimeout(() => resolve(mockDealerCars), 500));
  } else {
    try {
      const response = await axios.get(`${API_BASE_URL}/dealer-cars`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dealer cars:', error);
      throw error;
    }
  }
};

export const deleteCar = async (id) => {
  if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    mockDealerCars = mockDealerCars.filter(car => car.id !== id);
    return new Promise(resolve => setTimeout(() => resolve(), 500));
  } else {
    try {
      await axios.delete(`${API_BASE_URL}/cars/${id}`);
    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
  }
};

export const updateCar = async (id, carData) => {
  if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    const index = mockDealerCars.findIndex(car => car.id === parseInt(id));
    if (index !== -1) {
      mockDealerCars[index] = { ...mockDealerCars[index], ...carData };
    }
    return new Promise(resolve => setTimeout(() => resolve({ ...carData, id }), 500));
  } else {
    try {
      const response = await axios.put(`${API_BASE_URL}/cars/${id}`, carData);
      return response.data;
    } catch (error) {
      console.error('Error updating car:', error);
      throw error;
    }
  }
};
