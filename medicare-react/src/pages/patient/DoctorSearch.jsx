import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const DoctorSearch = ({ user }) => {
  const [searchParams, setSearchParams] = useState({ department: '', doctorName: '' });
  const [bookingForm, setBookingForm] = useState(null);
  const { users, addAppointment } = useData();

  const mockDoctors = users.filter(u => u.role?.toLowerCase() === 'doctor');

  const filteredDoctors = mockDoctors.filter(doc => {
    return (searchParams.department === '' || doc.department === searchParams.department) &&
           (searchParams.doctorName === '' || doc.name.toLowerCase().includes(searchParams.doctorName.toLowerCase()));
  });

  const handleBook = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const appointment = {
      name: user.name,
      email: user.email,
      phone: user.tel || 'N/A',
      department: bookingForm.department,
      doctor: bookingForm.name,
      doctorId: bookingForm.id,
      date: formData.get('date'),
      time: formData.get('time'),
      reason: formData.get('reason'),
      status: 'Pending'
    };

    addAppointment(appointment);
    
    alert("Appointment Request Sent!");
    setBookingForm(null);
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-0 overflow-hidden">
      {bookingForm ? (
        <div>
          <div className="p-4 teal-card-header">
            <button className="btn btn-sm btn-light mb-3" onClick={() => setBookingForm(null)}>
              <i className="fa-solid fa-arrow-left me-2"></i>Back to Search
            </button>
            <h4 className="fw-bold mb-0" style={{ color: 'var(--primary)' }}>Book Appointment with {bookingForm.name}</h4>
          </div>
          <div className="p-4">
            <form onSubmit={handleBook}>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Date</label>
                  <input type="date" name="date" className="form-control" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Time</label>
                  <input type="time" name="time" className="form-control" required />
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold">Reason for Visit</label>
                  <textarea name="reason" className="form-control" rows="3" required></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary fw-bold px-4">Confirm Booking</button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4 teal-card-header">
            <h4 className="fw-bold mb-0" style={{ color: 'var(--primary)' }}>Search & Book Doctor</h4>
          </div>
          <div className="p-4">
          <div className="row g-3 mb-4 bg-light p-3 rounded-4">
            <div className="col-md-5">
              <select className="form-select" value={searchParams.department} onChange={(e) => setSearchParams({...searchParams, department: e.target.value})}>
                <option value="">All Departments</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
            </div>
            <div className="col-md-7">
              <input type="text" className="form-control" placeholder="Search by doctor name..." value={searchParams.doctorName} onChange={(e) => setSearchParams({...searchParams, doctorName: e.target.value})} />
            </div>
          </div>

          <div className="row g-4">
            {filteredDoctors.map(doc => (
              <div key={doc.id} className="col-md-6">
                <div className="card h-100 border-0 bg-light rounded-4">
                  <div className="card-body">
                    <h5 className="fw-bold">{doc.name}</h5>
                    <p className="badge bg-secondary mb-2">{doc.department}</p>
                    <p className="mb-1 small"><i className="fa-solid fa-briefcase me-2 text-muted"></i>{doc.experience}</p>
                    <p className="mb-3 small"><i className="fa-regular fa-clock me-2 text-muted"></i>{doc.availableTime}</p>
                    <button className="btn btn-sm btn-primary w-100 fw-bold rounded-pill" onClick={() => setBookingForm(doc)}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorSearch;
