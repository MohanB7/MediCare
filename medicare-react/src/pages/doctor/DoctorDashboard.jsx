import React, { useState } from 'react';
import DoctorSchedule from './DoctorSchedule';
import PatientView from './PatientView';
import { useData } from '../../context/DataContext';

const DoctorDashboard = ({ user }) => {
  const { updateAppointment } = useData();
  const [activeTab, setActiveTab] = useState('schedule');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [consultationMode, setConsultationMode] = useState(false);
  const [appointmentRef, setAppointmentRef] = useState(null);

  const handlePatientSelect = (patient, appointment) => {
    setSelectedPatient(patient);
    setAppointmentRef(appointment);
    setActiveTab('patientView');
  };

  const startConsultation = () => {
    setConsultationMode(true);
  };

    const endConsultation = () => {
    setConsultationMode(false);
    setSelectedPatient(null);
    setActiveTab('schedule');
  };

  const handleAdmitPatient = () => {
    if (appointmentRef) {
      updateAppointment(appointmentRef.id, { status: 'Admitted' });
      alert(`Patient ${selectedPatient.name} has been admitted.`);
      setActiveTab('schedule');
      setSelectedPatient(null);
    }
  };

  const renderContent = () => {
    if (activeTab === 'schedule') {
      return <DoctorSchedule user={user} onSelectPatient={handlePatientSelect} />;
    } else if (activeTab === 'patientView') {
      return (
        <PatientView 
          patient={selectedPatient} 
          appointment={appointmentRef}
          consultationMode={consultationMode}
          onStartConsultation={startConsultation}
          onEndConsultation={endConsultation}
          onBack={() => setActiveTab('schedule')}
          onAdmitPatient={handleAdmitPatient}
        />
      );
    }
  };

  return (
    <div className="row g-4">
      <div className="col-lg-3">
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <i className="fa-solid fa-user-doctor fa-3x text-primary"></i>
              </div>
              <h5 className="fw-bold mb-1">{user.name}</h5>
              <p className="badge bg-secondary">Doctor</p>
            </div>
            
            <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
              <button 
                className={`nav-link text-start py-3 mb-2 ${activeTab === 'schedule' ? 'active' : ''}`} 
                onClick={() => { setActiveTab('schedule'); setConsultationMode(false); }}
              >
                <i className="fa-solid fa-calendar-day me-2 w-20px text-center"></i> My Schedule
              </button>
              {activeTab === 'patientView' && (
                <button className="nav-link text-start py-3 mb-2 active">
                  <i className="fa-solid fa-bed-pulse me-2 w-20px text-center"></i> Patient Details
                </button>
              )}
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

export default DoctorDashboard;
