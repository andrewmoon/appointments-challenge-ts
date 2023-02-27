"use strict"

import { AppointmentData } from "../../models/appointment";

export class AppointmentValidator {
    private max_appointments: number;

    constructor(max_appointments: number = 2) {
        this.max_appointments = max_appointments;
    }

    public validateAppointment(appointment: AppointmentData | unknown) {
        if (!Array.isArray(appointment) || appointment.length !== 2) {
            throw new Error("Appointment must be an array of length 2");
        }

        const time = appointment[0];
        const length = appointment[1];

        if (time === undefined || time === null || time === "") {
            throw new Error("Appointment date/time is required in appointment index 0 in format YYYY-MM-DD HH:MM");
        }

        if (String(time).match(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}$/) === null) {
            throw new Error("Appointment date/time must be in YYYY-MM-DD HH:MM format");
        }

        let date = new Date(time);

        if (date.toString() === "Invalid Date") {
            throw new Error("Appointment date/time must be a valid date/time.");
        }

        if (length === undefined || length === null) {
            throw new Error("Appointment length is required in appointment index 1 as an integer number of minutes");
        }

        if (!Number.isInteger(length)) {
            throw new Error("Length must be an integer representation of minutes");
        }
    }

    public validate(appointments: AppointmentData[]) {
        appointments.forEach((appointment, index) => {
            try {
                this.validateAppointment(appointment);
            } catch (e) {
                throw new Error("Error: \"" + e.message + "\" in appointment index " + index);
            }
        });

        if (appointments.length > this.max_appointments) {
            throw new Error("Error: maximum number of appointments is " + this.max_appointments);
        }

        if (appointments.length < 2) {
            throw new Error("At least 2 appointments are required");
        }
    }
}
