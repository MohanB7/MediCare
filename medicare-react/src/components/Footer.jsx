import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
        <div className="container">
            <div className="row text-center text-md-start g-4">
                <div className="col-md-4">
                    <h4 className="fw-bold">
                        <i className="fa-solid fa-notes-medical text-white me-2"></i>MediCare+
                    </h4>
                    <p className="mt-3">Modernizing healthcare management for hospitals, doctors, and patients worldwide.</p>
                </div>
                <div className="col-md-4 text-center">
                    <h4>Quick Links</h4>
                    <ul className="list-unstyled mt-3">
                        <li><Link to="/about" className="text-white-50 text-decoration-none">About Us</Link></li>
                        <li><Link to="/appointment" className="text-white-50 text-decoration-none">Book Appointment</Link></li>
                        <li><Link to="/contact" className="text-white-50 text-decoration-none">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="col-md-4 text-center text-md-end">
                    <h4>Connect With Us</h4>
                    <div className="social mt-3 justify-content-center justify-content-md-end d-flex">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
            <hr className="mt-5 mb-4 border-white opacity-25" />
            <div className="text-center">
                <p className="mb-0">© 2026 MediCare+. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
