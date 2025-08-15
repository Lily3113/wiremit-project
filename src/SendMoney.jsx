import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { auth } from './firebase-config';
import { signOut } from 'firebase/auth';
import { useAuth } from './AuthContext';
import './App.css';
import './App.css';
import { fetchFxRates } from './fxService';

const countryCodes = [
  { code: '+263', name: 'Zimbabwe' },
  { code: '+27', name: 'South Africa' },
  { code: '+265', name: 'Malawi' },
  { code: '+260', name: 'Zambia' },
  { code: '+254', name: 'Kenya' },
  { code: '+258', name: 'Mozambique' },
  { code: '+267', name: 'Botswana' },
  { code: '+256', name: 'Uganda' },
  { code: '+234', name: 'Nigeria' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+1', name: 'United States' },
];

const SendMoney = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipient, setRecipient] = useState('');
  const [countryCode, setCountryCode] = useState('+263');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('GBP');
  const [fxRates, setFxRates] = useState(null);
  const [loadingFx, setLoadingFx] = useState(true);
  const [errorFx, setErrorFx] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  useEffect(() => {
    const getRates = async () => {
      const rates = await fetchFxRates();
      if (rates) {
        setFxRates(rates);
      } else {
        setErrorFx('Failed to fetch FX rates.');
      }
      setLoadingFx(false);
    };
    getRates();
  }, []);

  const calculateRecipientAmount = (usdAmount, currency) => {
    if (!fxRates || !fxRates[currency]) return null;

    const rate = fxRates[currency];
    let feePercentage = 0;

    if (currency === 'GBP') {
      feePercentage = 0.10;
    } else if (currency === 'ZAR') {
      feePercentage = 0.20;
    }

    const transactionFee = usdAmount * feePercentage;
    const netAmount = usdAmount - transactionFee;
    const convertedAmount = netAmount * rate;
    
    return Math.ceil(convertedAmount * 100) / 100;
  };

  const recipientAmount = amount ? calculateRecipientAmount(parseFloat(amount), targetCurrency) : null;
  const transactionFee = amount ? parseFloat(amount) * (targetCurrency === 'GBP' ? 0.10 : 0.20) : null;
  const minAmount = 10;
  const maxAmount = 1000;

  const handleSendMoney = (e) => {
    e.preventDefault();
    const usdAmount = parseFloat(amount);

    if (usdAmount < minAmount || usdAmount > maxAmount) {
      alert(`The amount must be between $${minAmount} and $${maxAmount}.`);
      return;
    }

    if (!recipientAmount) {
      alert('Cannot calculate recipient amount. Please check FX rates.');
      return;
    }

    const fullPhoneNumber = countryCode + phoneNumber;
    console.log({ recipient, fullPhoneNumber, amount: usdAmount, currency: 'USD', recipientAmount, targetCurrency });
    alert(`Sending $${usdAmount} to ${recipient}. Recipient will receive ${recipientAmount} ${targetCurrency}.`);

    setRecipient('');
    setPhoneNumber('');
    setAmount('');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/wiremit-logo.png" alt="Wiremit Logo" className="logo" />
        </div>
        <ul className="nav-links">
          <li><NavLink to="/send-money">Send Money</NavLink></li>
          <li><NavLink to="/transactions">Transactions</NavLink></li>
          <li><a href="#profile">Profile</a></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </nav>
      <div className="send-money-container">
        <div className="send-money-card">
          <img src="/wiremit-logo.png" alt="Wiremit Logo" className="form-logo" /> {/* New logo */}
          <form className="send-money-form" onSubmit={handleSendMoney}>
            <div className="form-group">
              <label htmlFor="recipient">Recipient Name</label>
              <input
                type="text"
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <div className="phone-input-group">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="country-code-select"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} ({country.name})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="phone-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount (in USD)</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="form-input"
                min={minAmount}
                max={maxAmount}
              />
              <small className="input-info">Amount must be between ${minAmount} and ${maxAmount}</small>
            </div>
            <div className="form-group">
              <label htmlFor="currency">Recipient Currency</label>
              <select
                id="currency"
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="form-input"
              >
                <option value="GBP">GBP (UK)</option>
                <option value="ZAR">ZAR (South Africa)</option>
              </select>
            </div>
            {amount && !loadingFx && (
              <div className="transaction-summary">
                <p>Transaction Fee: **${transactionFee.toFixed(2)}**</p>
                <p>Recipient Receives: **{recipientAmount} {targetCurrency}**</p>
                <small>Rates and fees applied to a net amount of ${(parseFloat(amount) - transactionFee).toFixed(2)} USD.</small>
              </div>
            )}
            {loadingFx && <p>Fetching FX rates...</p>}
            {errorFx && <p className="error-message">Error: {errorFx}</p>}
            
            <button type="submit" className="send-button">
              Send Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SendMoney;