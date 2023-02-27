"use strict"

import { DateFormatter } from "./date-formatter";

describe("can correctly format dates", () => {
    const cases = [
        [
            new Date("2020-01-01 00:01:00"),
            "2020-01-01 00:01"
        ],
        [
            new Date("1921-12-30 23:55:00"),
            "1921-12-30 23:55"
        ],
    ];

    test.each(cases)("%s", (date: Date, expected: string) => {
        const formatter = new DateFormatter();

        expect(formatter.format(date)).toEqual(expected);
    });
});



