import React from 'react';
import { useData } from '../../context/DataContext';

const AdminDashboard = ({ user }) => {
  const { users, appointments, deleteUser } = useData();

  const totalUsers = users.filter(u => u.role?.toLowerCase() === 'patient').length;
  const totalDoctors = users.filter(u => u.role?.toLowerCase() === 'doctor').length;
  const upcomingAppointments = appointments.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled').length;
  const completedAppointments = appointments.filter(a => a.status === 'Completed').length;
  const revenue = `$${(completedAppointments * 100).toLocaleString()}`;

  // Display all users for admin management
  const allUsers = users.slice().reverse();

  return (
    <div className="admin-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Admin Dashboard</h2>
          <p className="text-muted mb-0">Welcome back, {user?.name || 'Administrator'}</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4">
          <i className="fa-solid fa-download me-2"></i>Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 h-100" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #e0efff 100%)' }}>
            <div className="card-body p-4 text-center">
              <div className="icon-wrapper bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                <i className="fa-solid fa-users"></i>
              </div>
              <h3 className="fw-bold mb-1">{totalUsers}</h3>
              <p className="text-muted mb-0 fw-semibold">Total Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 h-100" style={{ background: 'linear-gradient(135deg, #f0fcf6 0%, #e0f8eb 100%)' }}>
            <div className="card-body p-4 text-center">
              <div className="icon-wrapper bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                <i className="fa-solid fa-user-doctor"></i>
              </div>
              <h3 className="fw-bold mb-1">{totalDoctors}</h3>
              <p className="text-muted mb-0 fw-semibold">Total Doctors</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 h-100" style={{ background: 'linear-gradient(135deg, #fff5f0 0%, #ffeae0 100%)' }}>
            <div className="card-body p-4 text-center">
              <div className="icon-wrapper bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              <h3 className="fw-bold mb-1">{upcomingAppointments}</h3>
              <p className="text-muted mb-0 fw-semibold">Appointments</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 h-100" style={{ background: 'linear-gradient(135deg, #fdf0f5 0%, #fce0ec 100%)' }}>
            <div className="card-body p-4 text-center">
              <div className="icon-wrapper bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3 className="fw-bold mb-1">{revenue}</h3>
              <p className="text-muted mb-0 fw-semibold">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
          <h5 className="fw-bold mb-0">All Users</h5>
        </div>
        <div className="card-body p-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="text-muted fw-semibold rounded-start">Name</th>
                  <th scope="col" className="text-muted fw-semibold">Email</th>
                  <th scope="col" className="text-muted fw-semibold">Role</th>
                  <th scope="col" className="text-muted fw-semibold rounded-end">Joined</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar me-3 bg-light text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>
                          {u.name ? u.name.charAt(0) : '?'}
                        </div>
                        <span className="fw-medium">{u.name}</span>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge rounded-pill px-3 py-2 ${u.role?.toLowerCase() === 'doctor' ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                    <td className="text-end">
                      <button 
                        className="btn btn-sm btn-outline-danger" 
                        onClick={() => deleteUser(u.id)}
                        title="Delete User"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
