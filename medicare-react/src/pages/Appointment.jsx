import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const Appointment = () => {
  const { users, addAppointment } = useData();
  const doctors = users.filter(u => u.role?.toLowerCase() === 'doctor');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    department: '',
    doctor: 'Any Available Doctor',
    date: '',
    time: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const { fullName, email, phone, dateOfBirth, department, date, time } = formData;

    if (!fullName.trim() || !email.trim() || !phone.trim() || !dateOfBirth || !department || !date || !time) {
      alert("Please fill in all required fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }
    const phoneRegex = /^\+?[0-9\s\-\(\)]+$/;
    if (!phoneRegex.test(phone.trim())) {
      alert("Please enter a valid phone number.");
      return;
    }

    const appointment = {
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dateOfBirth,
      department,
      doctor: formData.doctor,
      date,
      time,
      reason: formData.reason.trim()
    };

    addAppointment(appointment);

    alert("Confirm Booking successful!");
    setFormData({
      fullName: '', email: '', phone: '', dateOfBirth: '', department: '', doctor: 'Any Available Doctor', date: '', time: '', reason: ''
    });
  };

  return (
    <div className="container" style={{ marginTop: '120px', marginBottom: '60px' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg p-5 border-0 rounded-4">
            <div className="text-center mb-5">
              <div className="logo-icon mb-3 d-inline-block p-3 rounded" style={{ fontSize: '40px', color: 'var(--primary)', background: 'rgba(0, 150, 136, 0.05)' }}>
                <i className="fa-solid fa-calendar-plus"></i>
              </div>
              <h2 className="fw-bold">Book an Appointment</h2>
              <p className="text-muted">Fill out the form below and we will contact you to confirm your appointment.</p>
            </div>

            <form onSubmit={handleBooking} noValidate>
              <h5 className="fw-bold mb-4 border-bottom pb-2">Patient Information</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Full Name</label>
                  <input type="text" name="fullName" className="form-control" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Email Address</label>
                  <input type="email" name="email" className="form-control" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Phone Number</label>
                  <input type="tel" name="phone" className="form-control" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Date of Birth</label>
                  <input type="date" name="dateOfBirth" className="form-control" value={formData.dateOfBirth} onChange={handleChange} required />
                </div>
              </div>

              <h5 className="fw-bold mb-4 border-bottom pb-2">Appointment Details</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Department</label>
                  <select name="department" className="form-select" value={formData.department} onChange={handleChange} required>
                    <option disabled value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="General Medicine">General Medicine</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Preferred Doctor (Optional)</label>
                  <select name="doctor" className="form-select" value={formData.doctor} onChange={handleChange}>
                    <option value="Any Available Doctor">Any Available Doctor</option>
                    {doctors.map(doc => (
                      <option key={doc.id} value={doc.name}>
                        {doc.name} ({doc.department || 'General'})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Preferred Date</label>
                  <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Preferred Time</label>
                  <input type="time" name="time" className="form-control" value={formData.time} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold">Reason for Visit / Symptoms</label>
                  <textarea name="reason" className="form-control" rows="4" placeholder="Briefly describe your symptoms or reason for visit..." value={formData.reason} onChange={handleChange}></textarea>
                </div>
              </div>

              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-bold text-uppercase">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
