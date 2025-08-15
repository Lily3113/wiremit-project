import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config'; 
import './App.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in successfully!");
        navigate('/dashboard'); 
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signed up successfully!");
        navigate('/dashboard'); 
      }
    } catch (firebaseError) {
      console.error("Authentication Error:", firebaseError.message);
      setError("Invalid credentials or an account with that email already exists.");
    }
  };

  return (
    <div className="login-page">
      <div className="auth-card">
        <div className="logo-section">
          <img src="/wiremit-logo.png" alt="Wiremit Logo" className="logo" />
        </div>
        
        <form onSubmit={handleFormSubmit} className="auth-form">
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required 
            />
          )}
          
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required 
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required 
          />
          
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="auth-button">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? ' Sign Up' : ' Log In'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;