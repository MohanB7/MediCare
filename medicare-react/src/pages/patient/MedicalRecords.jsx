import React, { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';

const MedicalRecords = ({ user }) => {
  const { appointments } = useData();
  const [completedAppointments, setCompletedAppointments] = useState([]);

  useEffect(() => {
    setCompletedAppointments(appointments.filter(a => a.email === user.email && a.status === 'Completed'));
  }, [user, appointments]);

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4">
      <h4 className="fw-bold mb-4">Medical Records</h4>
      
      <div className="alert alert-secondary border-0 mb-4 rounded-4">
        <i className="fa-solid fa-info-circle me-2"></i>
        Here you can view your prescriptions and diagnoses from completed appointments.
      </div>

      <div className="accordion" id="recordsAccordion">
        {completedAppointments.length > 0 ? (
          completedAppointments.map((appt, idx) => (
            <div className="accordion-item border-0 mb-3 rounded-4 shadow-sm" key={idx}>
              <h2 className="accordion-header">
                <button className="accordion-button collapsed rounded-4 fw-bold" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx}`}>
                  Visit on {appt.date} - {appt.doctor}
                </button>
              </h2>
              <div id={`collapse${idx}`} className="accordion-collapse collapse" data-bs-parent="#recordsAccordion">
                <div className="accordion-body bg-light rounded-bottom-4">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <h6 className="fw-bold text-primary border-bottom pb-2">Consultation Notes</h6>
                      <p className="small mb-1"><strong>Symptoms:</strong> {appt.symptoms || 'N/A'}</p>
                      <p className="small mb-1"><strong>Diagnosis:</strong> {appt.diagnosis || 'N/A'}</p>
                      <p className="small mb-0"><strong>Advice:</strong> {appt.advice || 'N/A'}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold text-success border-bottom pb-2">Prescription</h6>
                      {appt.prescription && appt.prescription.length > 0 ? (
                        <ul className="list-group list-group-flush bg-transparent">
                          {appt.prescription.map((med, i) => (
                            <li className="list-group-item bg-transparent px-0 py-1 small" key={i}>
                              <strong>{med.medicine}</strong> - {med.dosage} ({med.duration})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="small text-muted mb-0">No medication prescribed.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-5">
            <i className="fa-solid fa-folder-open fa-3x text-muted mb-3"></i>
            <h5 className="text-muted">No completed visits found.</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
