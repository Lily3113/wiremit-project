import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './App.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links-container">
        
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            
            <li><a href="#">Tracking Transfer</a></li>
            <li><a href="#">Send Money</a></li>
            <li><a href="#">Dashboard</a></li>
          </ul>
        </div>
        
        {/* Legal & Other Links */}
        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Terms and Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Contacts</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-column contact-info">
          <h4>Contact Us</h4>
          <p><strong>United Kingdom</strong></p>
          <p>Call Now: +44 170 8918570</p>
          <p>WhatsApp: +44 7990 137116</p>
          <br />
          <p><strong>Zimbabwe</strong></p>
          <p>Call Now: +263 78 689 3253</p>
          <p>WhatsApp: +263 78 689 3253</p>
          <br />
          <a href="mailto:info@wiremit.money" className="email-link">info@wiremit.money</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="#" aria-label="YouTube"><FaYoutube /></a>
        </div>
        <p>&copy; {new Date().getFullYear()} Wiremit. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;