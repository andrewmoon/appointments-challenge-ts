"use strict"

import { AppointmentData } from "../../models/appointment";
import { AppointmentInterface } from "../models/api/appointment";

export type AppointmentCollision = { [key: string]: string[] };

export interface CollisionServiceInterface {
    public getCollisions(appointment_input: string): AppointmentCollision;
    public hasCollisions(appointment_input: string): boolean;
}
