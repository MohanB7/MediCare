import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [activeTab, setActiveTab] = useState('doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email: email.trim(),
        password: password.trim()
      });

      const user = response.data.user;
      localStorage.setItem("currentUser", JSON.stringify({
        ...user,
        name: user.fullName // Map fullName to name for compatibility
      }));

      alert("Login successful!");
      navigate('/home');
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container" style={{ marginTop: '100px', marginBottom: '50px' }}>
      <div className="card shadow border-0 rounded-4 overflow-hidden mx-auto" style={{ maxWidth: '1000px' }}>
        <div className="row g-0">
          {/* Image Section */}
          <div className="col-md-6 d-none d-md-block" style={{
            backgroundImage: 'url(/images/hospital_building.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            <div className="h-100 d-flex flex-column justify-content-end p-5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
              <h2 className="text-white fw-bold">Welcome to MediCare+</h2>
              <p className="text-white-50">Your health is our top priority. Access your dashboard and manage your appointments seamlessly.</p>
            </div>
          </div>
          
          {/* Form Section */}
          <div className="col-md-6">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="logo-icon d-inline-block p-3 rounded" style={{ fontSize: '50px', color: 'var(--primary)', background: 'rgba(0, 150, 136, 0.05)' }}>
                  <i className="fa-solid fa-user-lock"></i>
                </div>
                <h3 className="fw-bold mt-3">Welcome Back</h3>
                <p className="text-muted">Login to your MediCare+ account</p>
              </div>

              <form onSubmit={handleLogin} noValidate>
                <div className="mb-3">
                  <label className="form-label fw-bold">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder={activeTab === 'doctor' ? "dr.smith@medicareplus.com" : activeTab === 'admin' ? "admin@medicareplus.com" : "patient@example.com"} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-bold text-uppercase">
                    Login
                  </button>
                </div>
              </form>

              <div className="text-center mt-4 pt-3 border-top">
                <Link to="/forget_pass" className="text-decoration-none d-block mb-2 text-primary">
                  Forgot Password?
                </Link>
                <span className="text-muted">Don't have an account?</span>
                <Link to="/signup" className="text-decoration-none fw-bold ms-1 text-primary">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
