import React, { createContext, useState, useContext } from 'react';

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [carAdded, setCarAdded] = useState(false);

  const refreshCars = () => {
    setCarAdded(prev => !prev);
  };

  return (
    <CarContext.Provider value={{ carAdded, refreshCars }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => useContext(CarContext);