import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <img src="https://www.carmag.co.za/wp-content/uploads/logos/carmag-logo.svg" alt="CarMag Logo" className="logo-image" />
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </div>
        <ul className={menuOpen ? 'navbar-menu active' : 'navbar-menu'}>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/add-car">Add Car</Link></li>
          <li><Link to="/cars">Cars</Link></li>
          <li><Link to="/leads">Leads</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;