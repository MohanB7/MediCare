import React, { useState } from 'react';
import PatientProfile from './PatientProfile';
import PatientAppointments from './PatientAppointments';
import MedicalRecords from './MedicalRecords';

const PatientDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('appointments');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <PatientProfile user={user} />;
      case 'appointments':
        return <PatientAppointments user={user} />;
      case 'records':
        return <MedicalRecords user={user} />;
      default:
        return <PatientAppointments user={user} />;
    }
  };

  return (
    <div className="row g-4">
      <div className="col-lg-3">
        <div className="card shadow-sm border-0 rounded-4 teal-sidebar">
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <i className="fa-solid fa-user fa-3x" style={{ color: 'var(--primary)' }}></i>
              </div>
              <h5 className="fw-bold mb-1 text-white">{user.name}</h5>
              <p className="badge bg-light text-primary">Patient</p>
            </div>
            
            <div className="nav flex-column nav-pills teal-nav" role="tablist" aria-orientation="vertical">
              <button className={`nav-link text-start py-3 mb-2 ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => setActiveTab('appointments')}>
                <i className="fa-solid fa-calendar-list me-2 w-20px text-center"></i> My Appointments
              </button>
              <button className={`nav-link text-start py-3 mb-2 ${activeTab === 'records' ? 'active' : ''}`} onClick={() => setActiveTab('records')}>
                <i className="fa-solid fa-file-medical me-2 w-20px text-center"></i> Medical Records
              </button>
              <button className={`nav-link text-start py-3 mb-2 ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                <i className="fa-solid fa-id-card me-2 w-20px text-center"></i> Complete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-lg-9">
        {renderContent()}
      </div>
    </div>
  );
};

export default PatientDashboard;
