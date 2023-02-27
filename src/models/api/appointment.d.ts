"use strict"

export interface AppointmentInterface {
    getBounds(): [number, number];
    overlaps(other: AppointmentInterface): boolean;
    toString(): string;
}

