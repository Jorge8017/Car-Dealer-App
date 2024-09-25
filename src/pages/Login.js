import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set a dummy token to simulate logged-in state
    localStorage.setItem('token', 'dummy-token');
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img 
          src="https://www.carmag.co.za/wp-content/uploads/logos/carmag-logo.svg" 
          alt="CarMag logo" 
          className="logo"
        />
        <h2>Dealer Portal</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="access-button">Access Portal</button>
        </form>
        <a href="#" className="forgot-link">Forgot your credentials?</a>
      </div>
    </div>
  );
};

export default Login;