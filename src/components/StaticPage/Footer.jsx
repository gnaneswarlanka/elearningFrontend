import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
<<<<<<< HEAD
    <footer>
      <p>&copy; 2025 E-Learning Platform</p>
     
=======
    <footer className="bg-dark text-white py-4">
      <div className="container">
        {/* Existing copyright information */}
        <p className="text-center mb-3">&copy; 2025 E-Learning Platform</p>

        {/* Navigation links */}
        <nav className="text-center mb-3">
          <ul className="list-inline">
            <li className="list-inline-item"><a href="/about" className="text-white text-decoration-none">About Us</a></li>
            <li className="list-inline-item"><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            <li className="list-inline-item"><a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a></li>
            <li className="list-inline-item"><a href="/terms" className="text-white text-decoration-none">Terms of Service</a></li>
          </ul>
        </nav>

        {/* Contact information */}
        <div className="text-center mb-3">
          <p>Email: <a href="mailto:support@elearningplatform.com" className="text-white text-decoration-none">support@elearningplatform.com</a></p>
          <p>Phone: <a href="tel:+15551234567" className="text-white text-decoration-none">+1 (555) 123-4567</a></p>
        </div>

        {/* Social media icons */}
        <div className="text-center">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
            <i className="bi bi-facebook"></i> Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
            <i className="bi bi-twitter"></i> Twitter
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <i className="bi bi-linkedin"></i> LinkedIn
          </a>
        </div>
      </div>
>>>>>>> 622b69c54a24046db426789df9b1a655e8eaf707
    </footer>
  );
}

export default Footer;