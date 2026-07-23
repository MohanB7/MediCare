import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const PatientAppointments = ({ user }) => {
  const { appointments: allAppointments } = useData();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setAppointments(allAppointments.filter(a => a.email === user.email || a.patientEmail === user.email));
  }, [user, allAppointments]);

  const filteredAppointments = filter === 'All' 
    ? appointments 
    : appointments.filter(a => a.status === filter);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-success';
      case 'Completed': return 'bg-primary';
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-warning text-dark'; // Pending
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-0 overflow-hidden">
      <div className="d-flex justify-content-between align-items-center mb-0 p-4 teal-card-header">
        <h4 className="fw-bold mb-0" style={{ color: 'var(--primary)' }}>My Appointments</h4>
        <select className="form-select w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="p-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="py-3">Date & Time</th>
                <th className="py-3">Doctor</th>
                <th className="py-3">Department</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appt, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{appt.date}</strong><br />
                      <span className="text-muted small">{appt.time}</span>
                    </td>
                    <td>
                      <strong>{appt.doctor}</strong>
                    </td>
                    <td>{appt.department}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(appt.status || 'Pending')}`}>
                        {appt.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;
