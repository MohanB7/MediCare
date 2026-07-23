import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientDashboard from './patient/PatientDashboard';
import DoctorDashboard from './doctor/DoctorDashboard';
import AdminDashboard from './admin/AdminDashboard';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  if (!currentUser) return null;

  return (
    <div className="container" style={{ marginTop: '100px', marginBottom: '60px' }}>
      {currentUser.role?.toLowerCase() === 'admin' ? (
        <AdminDashboard user={currentUser} />
      ) : currentUser.role?.toLowerCase() === 'doctor' ? (
        <DoctorDashboard user={currentUser} />
      ) : (
        <PatientDashboard user={currentUser} />
      )}
    </div>
  );
};

export default Dashboard;
