"use strict"

import { AppointmentInterface } from "./api/appointment";
import { DateFormatterInterface } from "../utils/api/date-formatter";
import { DateFormatter } from "../utils/date-formatter";

export type AppointmentData = [string, number];

export class Appointment implements AppointmentInterface {
    private time: Date;
    private duration: number;
    private date_formatter: DateFormatterInterface;

    constructor(
        time: string,
        duration: number,
        date_formatter: DateFormatterInterface|null = null
    ) {
        this.time = new Date(time);
        this.duration = duration;
        this.date_formatter = date_formatter || new DateFormatter();
    }

    private getDurationInMilliseconds(): number {
        return this.duration * 60 * 1000;
    }

    private getEndTime(): Date {
        const start_epoch = this.time.getTime();
        const end_date = new Date(start_epoch + this.getDurationInMilliseconds());

        return end_date;
    }

    public getBounds(): [number, number] {
        const start_epoch = this.time.getTime();
        const end_epoch = this.getEndTime().getTime();

        return [start_epoch, end_epoch];
    }

    public overlaps(other: AppointmentInterface): boolean {
        const bounds = this.getBounds();
        const other_bounds = other.getBounds();

        return (bounds[0] < other_bounds[1] && bounds[1] > other_bounds[0]);
    }

    public toString(): string {
        return JSON.stringify([
            this.date_formatter.format(this.time),
            this.duration
        ]);
    }
}
