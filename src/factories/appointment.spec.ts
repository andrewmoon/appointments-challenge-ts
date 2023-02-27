"use strict"

import { AppointmentFactory } from "./appointment";

it("can create appointment objects", () => {
    const appointment_factory = new AppointmentFactory();
    const appointments = appointment_factory.getAppointments([
        ["2021-01-01 00:00", 10],
        ["2021-01-02 00:00", 10],
    ]);

    expect(appointments[0].getBounds()).toEqual([
        1609419600000,
        1609420200000
    ]);
    expect(appointments[1].getBounds()).toEqual([
        1609506000000,
        1609506600000
    ]);
});
