import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Appointment from './pages/Appointment';
import ForgetPass from './pages/ForgetPass';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return !user ? children : <Navigate to="/home" replace />;
};

function App() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          {/* Landing page redirects to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Public Auth Routes */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/forget_pass" element={<PublicRoute><ForgetPass /></PublicRoute>} />
          
          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
