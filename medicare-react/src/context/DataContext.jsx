import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Doctors (Users with role doctor - since user changed enum to lowercase)
        const usersResponse = await axios.get('https://medicare-1-nggy.onrender.com/api/users');
        // Filter on the frontend just to be safe with case sensitivity, or let backend return all and filter
        const mappedUsers = usersResponse.data.map(u => ({ ...u, name: u.fullName, id: u._id }));
        setUsers(mappedUsers);

        // Fetch Appointments
        const appointmentsResponse = await axios.get('https://medicare-1-nggy.onrender.com/api/appointments');
        const mappedAppointments = appointmentsResponse.data.map(a => ({ ...a, id: a._id }));
        setAppointments(mappedAppointments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const addUser = (newUser) => {
    // Adding user is handled directly in Signup.jsx API call, 
    // but if we need to update context locally:
    setUsers([...users, { ...newUser, id: Date.now() }]);
  };

  const addAppointment = async (newAppointment) => {
    try {
      const response = await axios.post('https://medicare-1-nggy.onrender.com/api/appointments', newAppointment);
      const appt = response.data.appointment;
      setAppointments([...appointments, { ...appt, id: appt._id }]);
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  const updateAppointment = async (id, updatedData) => {
    try {
      const response = await axios.put(`https://medicare-1-nggy.onrender.com/api/appointments/${id}`, updatedData);
      const appt = response.data.appointment;
      setAppointments(appointments.map(a => a.id === id || a._id === id ? { ...appt, id: appt._id } : a));
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://medicare-1-nggy.onrender.com/api/users/${id}`);
      setUsers(users.filter(u => u.id !== id && u._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <DataContext.Provider value={{ users, appointments, addUser, deleteUser, addAppointment, updateAppointment }}>
      {children}
    </DataContext.Provider>
  );
};
