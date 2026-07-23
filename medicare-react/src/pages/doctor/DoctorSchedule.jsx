import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const DoctorSchedule = ({ user, onSelectPatient }) => {
  const { appointments: allAppointments, updateAppointment } = useData();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('Today');

  useEffect(() => {
    setAppointments(allAppointments);
  }, [user, allAppointments]);

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredAppointments = appointments.filter(a => {
    // Only show appointments intended for this specific doctor
    if (a.doctor !== user.name && a.doctorId !== user.id) return false;
    
    if (a.status === 'Admitted') return false; // Hide admitted patients
    if (filter === 'Today') return a.date === todayStr;
    if (filter === 'Upcoming') return a.date > todayStr;
    return true; // All
  });

  const handleUpdateStatus = (id, newStatus) => {
    updateAppointment(id, { status: newStatus });
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Schedule</h4>
        <div className="btn-group">
          <button className={`btn btn-sm ${filter === 'Today' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('Today')}>Today</button>
          <button className={`btn btn-sm ${filter === 'Upcoming' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('Upcoming')}>Upcoming</button>
          <button className={`btn btn-sm ${filter === 'All' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('All')}>All</button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="py-3">Time</th>
              <th className="py-3">Patient</th>
              <th className="py-3">Reason</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appt) => (
                <tr key={appt.id}>
                  <td>
                    <strong>{appt.time}</strong><br />
                    <span className="text-muted small">{appt.date}</span>
                  </td>
                  <td>
                    <strong>{appt.name}</strong><br />
                    <span className="text-muted small">{appt.phone}</span>
                  </td>
                  <td>
                    <span className="d-inline-block text-truncate" style={{maxWidth: '150px'}} title={appt.reason}>
                      {appt.reason}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${appt.status === 'Completed' ? 'bg-primary' : (appt.status === 'Confirmed' ? 'bg-success' : 'bg-warning text-dark')}`}>
                      {appt.status || 'Pending'}
                    </span>
                  </td>
                  <td>
                    {appt.status === 'Pending' && (
                      <>
                        <button className="btn btn-sm btn-success me-1 mb-1" onClick={() => handleUpdateStatus(appt.id, 'Confirmed')}>Accept</button>
                        <button className="btn btn-sm btn-danger me-1 mb-1" onClick={() => handleUpdateStatus(appt.id, 'Cancelled')}>Reject</button>
                      </>
                    )}
                    {(appt.status === 'Confirmed' || appt.status === 'Pending') && (
                      <button className="btn btn-sm btn-primary" onClick={() => onSelectPatient({ name: appt.name, email: appt.email, phone: appt.phone }, appt)}>
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-muted">
                  <i className="fa-regular fa-calendar-xmark fa-2x mb-3 d-block"></i>
                  No appointments found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorSchedule;
