import React, { useState, useEffect } from 'react';
import ConsultationForm from './ConsultationForm';

const PatientView = ({ patient, appointment, consultationMode, onStartConsultation, onEndConsultation, onBack, onAdmitPatient }) => {
  const [patientProfile, setPatientProfile] = useState(null);

  useEffect(() => {
    if (patient) {
      const allUsers = JSON.parse(localStorage.getItem("allUsers")) || {};
      const userRecord = allUsers[patient.email];
      if (userRecord && userRecord.profile) {
        setPatientProfile(userRecord.profile);
      }
    }
  }, [patient]);

  if (!patient) return null;

  if (consultationMode) {
    return (
      <ConsultationForm 
        patient={patient} 
        patientProfile={patientProfile}
        appointment={appointment} 
        onEnd={onEndConsultation} 
      />
    );
  }

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <button className="btn btn-sm btn-outline-secondary mb-2" onClick={onBack}>
            <i className="fa-solid fa-arrow-left me-2"></i>Back to Schedule
          </button>
          <h4 className="fw-bold mb-0">Patient Details: {patient.name}</h4>
        </div>
        <button className="btn btn-primary fw-bold px-4" onClick={onStartConsultation}>
          <i className="fa-solid fa-stethoscope me-2"></i> Start Consultation
        </button>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="bg-light p-4 rounded-4 h-100">
            <h6 className="fw-bold text-primary mb-3"><i className="fa-solid fa-address-card me-2"></i>Personal Info</h6>
            <p className="mb-2"><strong>Email:</strong> {patient.email}</p>
            <p className="mb-2"><strong>Phone:</strong> {patient.phone}</p>
            <p className="mb-2"><strong>Age:</strong> {patientProfile?.age || 'N/A'}</p>
            <p className="mb-2"><strong>Gender:</strong> {patientProfile?.gender || 'N/A'}</p>
            <p className="mb-2"><strong>Blood Group:</strong> {patientProfile?.bloodGroup || 'N/A'}</p>
            <p className="mb-0"><strong>Emergency:</strong> {patientProfile?.emergencyContact || 'N/A'}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="bg-light p-4 rounded-4 h-100">
            <h6 className="fw-bold text-primary mb-3"><i className="fa-solid fa-notes-medical me-2"></i>Medical History & Records</h6>
            <p className="mb-2"><strong>Past History:</strong> {patientProfile?.medicalHistory || 'None reported.'}</p>
            
            <hr />
            <h6 className="fw-bold mb-2">Current Appointment</h6>
            <p className="mb-1 text-muted small">{appointment?.date} at {appointment?.time}</p>
            <p className="mb-0"><strong>Reason:</strong> {appointment?.reason}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-top">
        <h6 className="fw-bold mb-3">Quick Actions</h6>
        <div className="d-flex gap-2 flex-wrap">
          <button 
            className="btn btn-outline-danger btn-sm"
            onClick={onAdmitPatient}
          >
            <i className="fa-solid fa-hospital-user me-2"></i>Admit Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientView;
