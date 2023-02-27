"use strict"

import { AppointmentData } from "../models/appointment";
import { AppointmentFactoryInterface } from "../factories/api/appointment";
import { AppointmentFactory } from "../factories/appointment";
import { AppointmentValidatorInterface } from "../utils/validators/api/appointment";
import { AppointmentValidator } from "../utils/validators/appointment";
import { AppointmentInterface } from "../models/api/appointment";
import { CollisionServiceInterface, AppointmentCollision } from "./api/collision";

export class CollisionService implements CollisionServiceInterface
{
    private appointment_validator: AppointmentValidatorInterface;
    private appointment_factory: AppointmentFactoryInterface;
    private max_appointments: number;

    private readonly MAX_APPOINTMENTS = 2;

    constructor(
        validator: AppointmentValidatorInterface|null = null,
        factory: AppointmentFactoryInterface|null = null,
        max_appointments: number|null = null
    ) {
        this.appointment_validator = validator || new AppointmentValidator(max_appointments || this.MAX_APPOINTMENTS);
        this.appointment_factory = factory || new AppointmentFactory();
    }

    private getAppointments(appointment_data: AppointmentData[]): AppointmentInterface[] {
        return this.appointment_factory.getAppointments(appointment_data);
    }

    public getCollisions(appointment_input: string): AppointmentCollision {
        // Takes a JSON string of [["YYYY-MM-DD HH:MM", duration], ...] appointment pairs
        const appointment_data: unknown = JSON.parse(appointment_input);

        this.appointment_validator.validate(appointment_data);

        const appointments: AppointmentInterface[] = this.getAppointments(appointment_data as AppointmentData[]);

        const appointment_collisions = {} as AppointmentCollision;

        appointments.forEach((appointment, index) => {
            const collisions = appointments.filter((other, other_index) => {
                return index !== other_index && appointment.overlaps(other);
            }).map((collision) => collision.toString());

            if (collisions.length > 0) {
                appointment_collisions[appointment.toString()] = collisions;
            }
        });

        return appointment_collisions;
    }

    public hasCollisions(appointment_input: string): boolean {
        const collisions = this.getCollisions(appointment_input);

        return Object.keys(collisions).length > 0;
    }
}

