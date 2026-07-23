import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <section className="hero mt-5 pt-5" style={{ background: "linear-gradient(135deg, rgba(0, 150, 136, 0.9) 0%, rgba(77, 182, 172, 0.8) 100%), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", minHeight: "50vh" }}>
        <div className="container text-center text-white">
          <h1 className="display-3 fw-bold mb-3" style={{textShadow: '0 4px 10px rgba(0,0,0,0.2)'}}>About MediCare+</h1>
          <p className="lead" style={{opacity: 0.9}}>Providing quality healthcare with modern technology and compassionate care.</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Who We Are</h2>
              <p className="text-muted fs-5">
                MediCare+ is a modern Hospital Management System designed to simplify healthcare services for
                patients, doctors, and hospital administrators. Our platform enables secure access to medical
                information, appointment scheduling, and efficient healthcare management.
              </p>
              <p className="text-muted fs-5">
                We focus on delivering better healthcare experiences through digital innovation, ensuring fast,
                reliable, and user-friendly services.
              </p>
              <Link to="/contact" className="btn btn-outline-primary mt-3 rounded-pill fw-bold text-uppercase px-4 py-2">Contact Us</Link>
            </div>
            <div className="col-lg-6">
              <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                className="img-fluid rounded-4 shadow-lg" alt="About MediCare+" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-5 my-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 p-4 text-center rounded-4">
                <div className="card-icon mx-auto">
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <h3 className="fw-bold mb-3">Mission</h3>
                <p className="text-muted">
                  Deliver high-quality healthcare services using modern digital solutions and patient-centered workflows.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 p-4 text-center rounded-4">
                <div className="card-icon mx-auto">
                  <i className="fa-solid fa-eye"></i>
                </div>
                <h3 className="fw-bold mb-3">Vision</h3>
                <p className="text-muted">
                  Become the leading smart healthcare platform, seamlessly connecting patients with top medical professionals.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 p-4 text-center rounded-4">
                <div className="card-icon mx-auto">
                  <i className="fa-solid fa-hand-holding-heart"></i>
                </div>
                <h3 className="fw-bold mb-3">Values</h3>
                <p className="text-muted">
                  Compassion, Innovation, Trust, Integrity, and Excellence in every aspect of healthcare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
