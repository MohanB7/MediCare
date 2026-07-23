import React, { useState, useEffect } from 'react';

const PatientProfile = ({ user }) => {
  const [profile, setProfile] = useState({
    age: '',
    gender: '',
    bloodGroup: '',
    address: '',
    emergencyContact: '',
    medicalHistory: ''
  });

  useEffect(() => {
    // Load existing profile if any
    const users = JSON.parse(localStorage.getItem("allUsers")) || {};
    if (users[user.email]) {
      setProfile(users[user.email].profile || profile);
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({...profile, [e.target.name]: e.target.value});
  };

  const handleSave = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("allUsers")) || {};
    
    // Create user record if not exists
    if (!users[user.email]) {
      users[user.email] = { ...user };
    }
    
    users[user.email].profile = profile;
    localStorage.setItem("allUsers", JSON.stringify(users));
    alert("Profile updated successfully!");
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4">
      <h4 className="fw-bold mb-4">Complete Your Profile</h4>
      <form onSubmit={handleSave}>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-bold">Full Name</label>
            <input type="text" className="form-control bg-light" value={user.name} disabled />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Email</label>
            <input type="email" className="form-control bg-light" value={user.email} disabled />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Age</label>
            <input type="number" name="age" className="form-control" value={profile.age} onChange={handleChange} placeholder="e.g. 35" />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Gender</label>
            <select name="gender" className="form-select" value={profile.gender} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Blood Group</label>
            <select name="bloodGroup" className="form-select" value={profile.bloodGroup} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label fw-bold">Address</label>
            <input type="text" name="address" className="form-control" value={profile.address} onChange={handleChange} placeholder="Full Address" />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Emergency Contact (Phone)</label>
            <input type="tel" name="emergencyContact" className="form-control" value={profile.emergencyContact} onChange={handleChange} placeholder="e.g. +1 555-0101" />
          </div>
          <div className="col-12">
            <label className="form-label fw-bold">Past Medical History</label>
            <textarea name="medicalHistory" className="form-control" rows="4" value={profile.medicalHistory} onChange={handleChange} placeholder="Diabetes, Hypertension, Asthma, etc."></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-primary px-4 fw-bold">Save Profile</button>
      </form>
    </div>
  );
};

export default PatientProfile;
