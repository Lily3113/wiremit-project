import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { auth } from './firebase-config';
import { signOut } from 'firebase/auth';
import { useAuth } from './AuthContext';
import Footer from './Footer'; 
import './App.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const ads = ['/ads1.png', '/ads2.png']; 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  useEffect(() => {
    const adInterval = setInterval(() => {
      setCurrentAdIndex((prevIndex) =>
        prevIndex === ads.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(adInterval);
  }, [ads.length]);

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <NavLink to="/dashboard">
            <img src="/wiremit-logo.png" alt="Wiremit Logo" className="logo" />
          </NavLink>
        </div>
        <ul className="nav-links">
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/send-money">Send Money</NavLink></li>
          <li><NavLink to="/transactions">Transactions</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </nav>

      <div className="main-content">
        <div className="welcome-section">
          <h1>Welcome, {user ? user.email : 'User'} 🎉</h1>
          <p> Let's get started with your transactions.</p>

          <div className="ad-section">
            <h3>Sponsored Content</h3>
            <div className="carousel-container">
              <div 
                className="ads-container" 
                style={{ 
                  transform: `translateX(-${currentAdIndex * 100}%)`, 
                  "--ads-count": ads.length 
                }}
              >
                {ads.map((ad, index) => (
                  <div key={index} className="ad-wrapper">
                    <img src={ad} alt={`Ad ${index + 1}`} className="ad-image" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer /> 
    </div>
  );
};

export default Dashboard;
