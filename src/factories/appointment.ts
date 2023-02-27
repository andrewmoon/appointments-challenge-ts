"use strict"

import { AppointmentData } from "../models/appointment";
import { AppointmentFactoryInterface } from "./api/appointment";
import { Appointment } from "../models/appointment";
import { AppointmentInterface } from "../models/api/appointment";

export class AppointmentFactory implements AppointmentFactoryInterface {
    public getAppointments(appointment_data: AppointmentData[]): AppointmentInterface[] {
        const appointments = appointment_data.map((appointment) => {
            return new Appointment(appointment[0], appointment[1]);
        });

        return appointments;
    }
}

