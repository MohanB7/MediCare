import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, [location]); // Re-run when route changes to catch logins/logouts

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
            <Link className="navbar-brand" to={currentUser ? "/home" : "/login"}>
                <i className="fa-solid fa-notes-medical"></i>
                MediCare+
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                <i className="fa-solid fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="menu">
                <ul className="navbar-nav ms-auto align-items-center">
                    {currentUser ? (
                      <>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`} to="/home">Home</Link>
                        </li>
                        
                        {currentUser.role?.toLowerCase() === 'patient' && (
                          <>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">Contact</Link>
                            </li>
                          </>
                        )}

                        <li className="nav-item">
                            <Link className={`nav-link text-primary fw-bold ${location.pathname === '/dashboard' ? 'active' : ''}`} to="/dashboard">
                              <i className="fa-solid fa-user me-1"></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-danger" href="#" onClick={handleLogout}>
                              <i className="fa-solid fa-right-from-bracket me-1"></i> Logout
                            </a>
                        </li>
                        
                        {currentUser.role?.toLowerCase() === 'patient' && (
                          <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                              <Link to="/appointment" className="btn btn-primary px-4">Book Appointment</Link>
                          </li>
                        )}
                      </>
                    ) : (
                      <>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`} to="/signup">Sign Up</Link>
                        </li>
                      </>
                    )}
                </ul>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
