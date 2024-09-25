import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CarProvider } from './CarContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import ViewCar from './pages/ViewCar';
import Dashboard from './components/Dashboard';
import FullStats from './components/FullStats';
import Profile from './pages/Profile';
import LeadsList from './components/LeadsList';
import CarsList from './components/CarsList';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token');
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const LoginRoute = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  return isLoggedIn ? <Navigate to="/dashboard" /> : <Login />;
};

function App() {
  return (
    <CarProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="content">
            <Routes>
              <Route path="/login" element={<LoginRoute />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/add-car" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
              <Route path="/edit-car/:id" element={<ProtectedRoute><EditCar /></ProtectedRoute>} />
              <Route path="/view-car/:id" element={<ProtectedRoute><ViewCar /></ProtectedRoute>} />
              <Route path="/full-stats" element={<ProtectedRoute><FullStats /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/leads" element={<ProtectedRoute><LeadsList /></ProtectedRoute>} />
              <Route path="/cars" element={<ProtectedRoute><CarsList /></ProtectedRoute>} />
              <Route path="/" element={<Navigate replace to="/login" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CarProvider>
  );
}

export default App;