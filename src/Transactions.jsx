import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from './Footer';
import './App.css';
import './App.css';

const mockTransactions = [
    { id: 1, sender: 'You', recipient: 'Simba Masike', amount: '50.00', currency: 'GBP', date: '2025-08-14' },
    { id: 2, sender: 'You', recipient: 'Nigel Nkomo', amount: '75.50', currency: 'ZAR', date: '2025-08-13' },
    { id: 3, sender: 'You', recipient: 'Tariro Moyo', amount: '120.00', currency: 'GBP', date: '2025-08-12' },
    { id: 4, sender: 'You', recipient: 'Simba Masike', amount: '35.00', currency: 'ZAR', date: '2025-08-11' },
    { id: 5, sender: 'You', recipient: 'Nigel Nkomo', amount: '100.00', currency: 'GBP', date: '2025-08-10' },
    { id: 6, sender: 'You', recipient: 'Tariro Moyo', amount: '50.00', currency: 'ZAR', date: '2025-08-09' },
    { id: 7, sender: 'You', recipient: 'Simba Masike', amount: '65.00', currency: 'GBP', date: '2025-08-08' },
    { id: 8, sender: 'You', recipient: 'Nigel Nkomo', amount: '90.00', currency: 'ZAR', date: '2025-08-07' },
    { id: 9, sender: 'You', recipient: 'Tariro Moyo', amount: '25.00', currency: 'GBP', date: '2025-08-06' },
    { id: 10, sender: 'You', recipient: 'Simba Masike', amount: '150.00', currency: 'ZAR', date: '2025-08-05' },
    { id: 11, sender: 'You', recipient: 'Nigel Nkomo', amount: '80.00', currency: 'GBP', date: '2025-08-04' },
    { id: 12, sender: 'You', recipient: 'Tariro Moyo', amount: '45.00', currency: 'ZAR', date: '2025-08-03' },
    { id: 13, sender: 'You', recipient: 'Simba Masike', amount: '110.00', currency: 'GBP', date: '2025-08-02' },
    { id: 14, sender: 'You', recipient: 'Nigel Nkomo', amount: '60.00', currency: 'ZAR', date: '2025-08-01' },
    { id: 15, sender: 'You', recipient: 'Tariro Moyo', amount: '95.00', currency: 'GBP', date: '2025-07-31' },
    { id: 16, sender: 'You', recipient: 'Simba Masike', amount: '55.00', currency: 'ZAR', date: '2025-07-30' },
];

const Transactions = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 10;
    const totalPages = Math.ceil(mockTransactions.length / transactionsPerPage);

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = mockTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleLogout = () => {
        // Mock logout function
        alert("Logging out...");
    };

    return (
        <div className="transactions-container">
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
                <div className="transactions-card">
                    <h2>Transaction History</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Recipient</th>
                                <th>Amount</th>
                                <th>Currency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTransactions.map(tx => (
                                <tr key={tx.id}>
                                    <td>{tx.date}</td>
                                    <td>{tx.recipient}</td>
                                    <td>{tx.amount}</td>
                                    <td>{tx.currency}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Transactions;
