"use strict"

import { AppointmentData } from "../../models/appointment";

export interface AppointmentValidatorInterface {
    public validateAppointment(appointment: AppointmentData|unknown): void;
    public validate(appointment: AppointmentData[]|unknown): void;
}
