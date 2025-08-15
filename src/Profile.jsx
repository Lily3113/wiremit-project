import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { auth } from './firebase-config';
import { signOut } from 'firebase/auth';
import { useAuth } from './AuthContext';
import Footer from './Footer';
import './App.css';
import './App.css';
import { FaUserCircle } from 'react-icons/fa'; 

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Logout Error:", error.message);
        }
    };

   
    const username = user ? user.email.split('@')[0] : 'Guest';

    return (
        <div className="profile-container">
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src="/wiremit-logo.png" alt="Wiremit Logo" className="logo" />
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
                <div className="profile-card">
                    <div className="profile-header">
                        <FaUserCircle className="profile-icon" /> 
                        <h2>{username}</h2> 
                    </div>
                    <div className="profile-details">
                        <div className="detail-item">
                            <span className="detail-label">Email:</span>
                            <span className="detail-value">{user ? user.email : 'N/A'}</span>
                        </div>
                        {/* Placeholder information relevant to Zimbabwe */}
                        <div className="detail-item">
                            <span className="detail-label">Location:</span>
                            <span className="detail-value">Zimbabwe</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Account Status:</span>
                            <span className="detail-value">Active</span>
                        </div>
                        <p className="profile-message">You can update your profile information here in the future.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;