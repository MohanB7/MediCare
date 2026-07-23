const Appointment = require("../Models/appointment");

// Create Appointment
const CreateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json({ message: "Appointment booked successfully", appointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get Appointments (can filter by doctor name or email or patient email)
const GetAppointments = async (req, res) => {
    try {
        const { doctor, email } = req.query;
        let query = {};
        if (doctor) {
            query.doctor = doctor;
        }
        if (email) {
            query.email = email;
        }
        const appointments = await Appointment.find(query).sort({ createdAt: -1 });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update Appointment
const UpdateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment updated successfully", appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { CreateAppointment, GetAppointments, UpdateAppointment };
