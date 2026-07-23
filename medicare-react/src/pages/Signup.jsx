import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useData } from "../context/DataContext";

const Signup = () => {
  const { addUser } = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    department: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { fullName, email, phone, password, confirmPassword, role, department } = formData;

    // Validation
    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !role
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (role === 'doctor' && !department.trim()) {
      alert("Please specify a department for the doctor.");
      return;
    }

    // Full Name Validation
    if (fullName.trim().length < 3) {
      alert("Full name must contain at least 3 characters.");
      return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone Validation (Indian Mobile Number)
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone.trim())) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Password Validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Send data to backend
      const response = await axios.post(
        "https://medicare-1-nggy.onrender.com/api/users/",
        {
          fullName,
          email,
          tel: phone,
          password,
          confirmPassword,
          role,
          department
        }
      );

      alert(response.data.message || "Account created successfully!");

      const user = {
        name: fullName,
        email,
        phone,
        role,
        department,
      };

      localStorage.setItem("currentUser", JSON.stringify(user));
      addUser(user);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "patient",
        department: "",
      });

      navigate("/home");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to create account. Please try again."
      );
    }
  };

  return (
    <div
      className="container"
      style={{ marginTop: "100px", marginBottom: "50px" }}
    >
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div
              className="d-inline-block p-3 rounded"
              style={{
                fontSize: "50px",
                color: "var(--primary)",
                background: "rgba(0,150,136,0.05)",
              }}
            >
              <i className="fa-solid fa-user-plus"></i>
            </div>

            <h3 className="fw-bold mt-3">Create Account</h3>
          </div>

          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label fw-bold">Full Name</label>

              <input
                type="text"
                name="fullName"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Email Address</label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Phone Number</label>

              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold d-block">Register As</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="rolePatient"
                  value="patient"
                  checked={formData.role === "patient"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="rolePatient">
                  Patient
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="roleDoctor"
                  value="doctor"
                  checked={formData.role === "doctor"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="roleDoctor">
                  Doctor
                </label>
              </div>
            </div>

            {formData.role === 'doctor' && (
              <div className="mb-3">
                <label className="form-label fw-bold">Department</label>
                <select 
                  className="form-select" 
                  name="department" 
                  value={formData.department} 
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
              </div>
            )}

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Password</label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="d-grid mt-3">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <span>Already have an account? </span>

            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;