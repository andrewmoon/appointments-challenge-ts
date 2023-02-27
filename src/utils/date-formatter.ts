"use strict"

export class DateFormatter {
    private getDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1)
            .toString()
            .padStart(2, "0");
        const day = date.getDate()
            .toString()
            .padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    private getTime(date: Date): string {
        const hours = date.getHours()
            .toString()
            .padStart(2, "0");
        const minutes = date.getMinutes()
            .toString()
            .padStart(2, "0");

        return `${hours}:${minutes}`;
    }

    public format(date: Date): string {
        return `${this.getDate(date)} ${this.getTime(date)}`;
    }
}
