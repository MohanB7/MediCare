const express = require('express');
const router = express.Router();
const { CreateAppointment, GetAppointments, UpdateAppointment } = require("../Controllers/appointmentcontroller");

router.post("/", CreateAppointment);
router.get("/", GetAppointments);
router.put("/:id", UpdateAppointment);

module.exports = router;
