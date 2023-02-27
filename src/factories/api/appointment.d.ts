"use strict"

export interface AppointmentFactoryInterface {
    public getAppointments(appointment_data: AppointmentData[]): AppointmentInterface[];
}

