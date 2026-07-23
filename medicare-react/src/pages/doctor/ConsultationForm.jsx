import React, { useState } from 'react';

const ConsultationForm = ({ patient, patientProfile, appointment, onEnd }) => {
  const [formData, setFormData] = useState({
    symptoms: appointment?.reason || '',
    diagnosis: '',
    notes: '',
    advice: ''
  });

  const [prescription, setPrescription] = useState([]);
  const [medInput, setMedInput] = useState({ medicine: '', dosage: '', duration: '' });

  const handleAddMed = () => {
    if (medInput.medicine && medInput.dosage) {
      setPrescription([...prescription, medInput]);
      setMedInput({ medicine: '', dosage: '', duration: '' });
    }
  };

  const handleComplete = () => {
    // Save consultation data
    const all = JSON.parse(localStorage.getItem("appointments")) || [];
    const index = all.findIndex(a => a.id === appointment?.id);
    if (index > -1) {
      all[index] = {
        ...all[index],
        status: 'Completed',
        symptoms: formData.symptoms,
        diagnosis: formData.diagnosis,
        notes: formData.notes,
        advice: formData.advice,
        prescription: prescription
      };
      localStorage.setItem("appointments", JSON.stringify(all));
    }
    alert("Consultation Completed and Saved!");
    onEnd();
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <h4 className="fw-bold mb-0 text-primary">
          <i className="fa-solid fa-stethoscope me-2"></i>
          Consultation: {patient.name}
        </h4>
        <span className="badge bg-light text-dark border">
          {patientProfile?.age ? `${patientProfile.age} yrs` : ''} {patientProfile?.gender || ''}
        </span>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <label className="form-label fw-bold">Symptoms (Reported)</label>
          <textarea className="form-control bg-light" rows="3" value={formData.symptoms} onChange={(e) => setFormData({...formData, symptoms: e.target.value})}></textarea>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Diagnosis</label>
          <textarea className="form-control" rows="3" placeholder="Enter clinical diagnosis..." value={formData.diagnosis} onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}></textarea>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Clinical Notes</label>
          <textarea className="form-control" rows="3" placeholder="Observations, vitals..." value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})}></textarea>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Advice & Follow-up</label>
          <textarea className="form-control" rows="3" placeholder="Rest, diet, follow-up after 1 week..." value={formData.advice} onChange={(e) => setFormData({...formData, advice: e.target.value})}></textarea>
        </div>
      </div>

      <h5 className="fw-bold border-bottom pb-2 mb-3">Prescription</h5>
      <div className="bg-light p-3 rounded-4 mb-4">
        <div className="row g-2 align-items-end mb-3">
          <div className="col-md-4">
            <label className="form-label small fw-bold">Medicine Name</label>
            <input type="text" className="form-control form-control-sm" value={medInput.medicine} onChange={(e) => setMedInput({...medInput, medicine: e.target.value})} placeholder="e.g. Paracetamol 500mg" />
          </div>
          <div className="col-md-3">
            <label className="form-label small fw-bold">Dosage & Frequency</label>
            <input type="text" className="form-control form-control-sm" value={medInput.dosage} onChange={(e) => setMedInput({...medInput, dosage: e.target.value})} placeholder="e.g. 1-0-1 After Food" />
          </div>
          <div className="col-md-3">
            <label className="form-label small fw-bold">Duration</label>
            <input type="text" className="form-control form-control-sm" value={medInput.duration} onChange={(e) => setMedInput({...medInput, duration: e.target.value})} placeholder="e.g. 5 days" />
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-sm btn-primary" onClick={handleAddMed}><i className="fa-solid fa-plus me-1"></i> Add</button>
          </div>
        </div>

        {prescription.length > 0 && (
          <table className="table table-sm table-bordered bg-white mb-0">
            <thead className="table-light">
              <tr>
                <th>Medicine</th>
                <th>Dosage</th>
                <th>Duration</th>
                <th style={{width: '50px'}}></th>
              </tr>
            </thead>
            <tbody>
              {prescription.map((m, i) => (
                <tr key={i}>
                  <td>{m.medicine}</td>
                  <td>{m.dosage}</td>
                  <td>{m.duration}</td>
                  <td className="text-center">
                    <button className="btn btn-sm text-danger p-0" onClick={() => setPrescription(prescription.filter((_, idx) => idx !== i))}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-secondary px-4 fw-bold" onClick={onEnd}>Cancel</button>
        <button className="btn btn-success px-5 fw-bold" onClick={handleComplete}>
          <i className="fa-solid fa-check-double me-2"></i>Complete & Save
        </button>
      </div>
    </div>
  );
};

export default ConsultationForm;
