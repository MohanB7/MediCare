const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    medicine: { type: String, required: true },
    dosage: { type: String, required: true },
    duration: { type: String, required: true }
});

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date },
    department: { type: String, required: true, trim: true },
    doctor: { type: String, required: true, trim: true },
    date: { type: String, required: true }, // Keeping as string for frontend compatibility, but could be Date
    time: { type: String, required: true },
    reason: { type: String, trim: true },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
        default: "Pending"
    },
    symptoms: { type: String, trim: true },
    diagnosis: { type: String, trim: true },
    advice: { type: String, trim: true },
    prescription: [prescriptionSchema]
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
