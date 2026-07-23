import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero mt-5 pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 d-flex flex-column justify-content-center">
              <h1 className="display-3 fw-bold">
                Modern Healthcare <br />for a Better Tomorrow
              </h1>
              <p className="lead text-white-50 mb-4">
                Your trusted hospital management system for doctors and patients.
                Book appointments, manage records and access healthcare services seamlessly.
              </p>
              <div className="d-flex gap-3">
                {currentUser && currentUser.role?.toLowerCase() === 'patient' ? (
                  <Link to="/appointment" className="btn btn-light btn-lg rounded-pill px-4 fw-bold">
                    Book Appointment
                  </Link>
                ) : !currentUser ? (
                  <Link to="/appointment" className="btn btn-light btn-lg rounded-pill px-4 fw-bold">
                    Book Appointment
                  </Link>
                ) : null}

                {currentUser ? (
                  <Link to="/dashboard" className="btn btn-outline-light text-white btn-lg rounded-pill px-4 fw-bold border-white">
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link to="/login" className="btn btn-outline-light text-white btn-lg rounded-pill px-4 fw-bold border-white">
                    Access Portal
                  </Link>
                )}
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <img 
                src="/images/hospital_interior.png" 
                alt="Modern Hospital Interior" 
                className="img-fluid rounded-4 shadow-lg"
                style={{ objectFit: 'cover', height: '100%', minHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Premium Services</h2>
            <p className="text-muted">Experience world-class healthcare tailored to your needs</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 p-4 text-center">
                <div className="card-icon">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <h4 className="fw-bold mb-3">Expert Doctors</h4>
                <p className="text-muted mb-0">
                  Consult experienced specialists across multiple departments with state-of-the-art facilities.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 p-4 text-center">
                <div className="card-icon">
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <h4 className="fw-bold mb-3">Easy Appointments</h4>
                <p className="text-muted mb-0">
                  Book appointments online without waiting in long queues. Manage your schedule digitally.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 p-4 text-center">
                <div className="card-icon">
                  <i className="fa-solid fa-heart-pulse"></i>
                </div>
                <h4 className="fw-bold mb-3">24/7 Emergency</h4>
                <p className="text-muted mb-0">
                  Emergency care available round the clock with highly qualified trauma response teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-5 my-5">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3">
              <div className="stat-number">100+</div>
              <h5 className="fw-bold text-muted">Specialist Doctors</h5>
            </div>
            <div className="col-md-3">
              <div className="stat-number">50k+</div>
              <h5 className="fw-bold text-muted">Happy Patients</h5>
            </div>
            <div className="col-md-3">
              <div className="stat-number">25+</div>
              <h5 className="fw-bold text-muted">Departments</h5>
            </div>
            <div className="col-md-3">
              <div className="stat-number">24/7</div>
              <h5 className="fw-bold text-muted">Emergency Care</h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
