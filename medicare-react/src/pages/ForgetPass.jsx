import React from 'react';
import { Link } from 'react-router-dom';

const ForgetPass = () => {
  return (
    <div className="container" style={{ marginTop: '120px', marginBottom: '80px' }}>
      <div className="card shadow auth-card mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div className="logo-icon d-inline-block p-3 rounded" style={{ fontSize: '50px', color: 'var(--primary)', background: 'rgba(0, 150, 136, 0.05)' }}>
              <i className="fa-solid fa-key"></i>
            </div>
            <h3 className="fw-bold mt-3">Forgot Password?</h3>
            <p className="text-muted">Enter your registered email address below to receive a password reset link.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Reset link sent!'); }}>
            <div className="mb-4">
              <label className="form-label fw-bold">Email Address</label>
              <input type="email" className="form-control" placeholder="name@example.com" required />
            </div>
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-bold text-uppercase">
                <i className="fa-solid fa-paper-plane me-2"></i>Send Reset Link
              </button>
            </div>
          </form>

          <div className="text-center mt-4 pt-3 border-top">
            <Link to="/login" className="text-decoration-none text-muted">
              <i className="fa-solid fa-arrow-left me-1"></i>Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
