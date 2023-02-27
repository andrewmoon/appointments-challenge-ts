"use strict"

import { AppointmentData } from "../../models/appointment";
import { AppointmentValidator } from "./appointment";

describe("appointment-validator provides correct results", () => {
    const cases = [
        [
            "where date/length are valid",
            ["2023-01-01 06:30", 30],
            true,
            ""
        ],
        [
            "where date is wrong format",
            ["2023-01-01 0b:30", 30],
            false,
            "Appointment date/time must be in YYYY-MM-DD HH:MM format"
        ],
        [
            "where date is invalid",
            ["2023-44-44 01:30", 30],
            false,
            "Appointment date/time must be a valid date/time."
        ],
        [
            "where length is not an integer",
            ["2023-01-12 21:30", 30.5],
            false,
            "Length must be an integer representation of minutes"
        ],
        [
            "where length is not provided",
            ["2023-01-12 21:30", undefined],
            false,
            "Appointment length is required in appointment index 1 as an integer number of minutes"
        ],
        [
            "where time is not provided",
            ["", 1],
            false,
            "Appointment date/time is required in appointment index 0 in format YYYY-MM-DD HH:MM"
        ],
        [
            "where input is not an array",
            4,
            false,
            "Appointment must be an array of length 2"
        ],
        [
            "where input is an array of wrong length",
            ["2023-01-12 21:30", 1, 2],
            false,
            "Appointment must be an array of length 2"
        ],
    ];

    test.each(cases)("%s", (name: string, appointment: AppointmentData, success: boolean, error: string) => {
        const validator = new AppointmentValidator();

        if (success) {
            expect(() => validator.validateAppointment(appointment)).not.toThrow();
        } else {
            expect(() => validator.validateAppointment(appointment)).toThrow(error);
        }
    });
})

it("can handle errors when processing multiple appointments", () => {
    const validator = new AppointmentValidator();

    const input: AppointmentData[] = [
        ["2023-01-01 06:30", 30],
        ["2023-01-01 06:3a", 30],
    ];

    expect(() => validator.validate(input))
        .toThrow("Error: \"Appointment date/time must be in YYYY-MM-DD HH:MM format\" in appointment index 1");
});

it("throws an error when too few appointments are received", () => {
    const validator = new AppointmentValidator();

    const input: AppointmentData[] = [
        ["2023-01-01 06:30", 30],
    ];

    expect(() => validator
        .validate(input))
        .toThrow("At least 2 appointments are required");
});

it("should reject more than 2 appointments by default", () => {
    const validator = new AppointmentValidator();

    const input: AppointmentData[] = [
        ["2023-01-01 06:30", 30],
        ["2023-01-01 06:30", 30],
        ["2023-01-01 06:30", 30],
    ];

    expect(() => validator.validate(input))
        .toThrow("Error: maximum number of appointments is 2");
});
