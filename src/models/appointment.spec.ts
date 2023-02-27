"use strict"

import { Appointment } from "./appointment"

it("appointment shows correct bounds", () => {
    const appointment = new Appointment("2023-01-01 06:00", 26);

    const bounds = appointment.getBounds();

    expect(bounds).toEqual([
        (new Date("2023-01-01 06:00")).getTime(),
        (new Date("2023-01-01 06:26")).getTime()
    ]);
});

describe("appointment shows correct overlap", () => {
    const cases = [
        [
            "where appointment is before",
            new Appointment("2023-01-01 06:00", 30),
            new Appointment("2023-01-01 06:30", 30),
            false
        ],
        [
            "where appointment is after",
            new Appointment("2023-01-01 06:30", 30),
            new Appointment("2023-01-01 06:00", 30),
            false
        ],
        [
            "where appointment overlaps completely",
            new Appointment("2023-01-01 06:00", 20),
            new Appointment("2023-01-01 06:00", 20),
            true
        ],
        [
            "where appointment overlaps before",
            new Appointment("2023-01-01 06:00", 20),
            new Appointment("2023-01-01 06:10", 20),
            true
        ],
        [
            "where appointment overlaps after",
            new Appointment("2023-01-01 06:10", 20),
            new Appointment("2023-01-01 06:00", 20),
            true
        ],
        [
            "where appointment runs across year",
            new Appointment("2022-12-31 23:59", 20),
            new Appointment("2023-01-01 00:20", 20),
            false
        ],
        [
            "where appointment overlaps across year",
            new Appointment("2022-12-31 23:59", 20),
            new Appointment("2023-01-01 00:18", 20),
            true
        ]
    ];

    test.each(cases)("%s", (name: string, appointment: Appointment, other: Appointment, expected: boolean) => {
        const overlaps = appointment.overlaps(other);

        expect(overlaps).toEqual(expected);
    });
})

it("appointment converts back to string", () => {
    const appointment = new Appointment("2023-01-01 06:00", 26);

    const str = appointment.toString();

    expect(str).toEqual("[\"2023-01-01 06:00\",26]");
});
