"use strict"

import { CollisionService } from "./collision";

it("should correctly identify overlapping appointments", () => {
    const service = new CollisionService();

    const input = JSON.stringify([
        [ "2021-01-01 12:00", 60 ],
        [ "2021-01-01 12:30", 60 ],
    ]);

    const collisions = service.hasCollisions(input);

    expect(collisions).toEqual(true);
});

it("should correctly identify overlap for more than 2 appointments", () => {
    const service = new CollisionService(null, null, 3);

    const input = JSON.stringify([
        [ "2021-01-01 12:00", 60 ],
        [ "2021-01-01 14:30", 60 ],
        [ "2021-01-01 12:30", 60 ],
    ]);

    const collisions = service.hasCollisions(input);

    expect(collisions).toEqual(true);
});

it("should identify specific collisions", () => {
    const service = new CollisionService(null, null, 3);

    const input = JSON.stringify([
        [ "2021-01-01 12:00", 60 ],
        [ "2021-01-01 14:30", 60 ],
        [ "2021-01-01 12:30", 60 ],
    ]);

    const collisions = service.getCollisions(input);

    expect(collisions).toEqual({
        "[\"2021-01-01 12:00\",60]": [
            "[\"2021-01-01 12:30\",60]",
        ],
        "[\"2021-01-01 12:30\",60]": [
            "[\"2021-01-01 12:00\",60]",
        ]
    });
});

it("should return false when no appointments overlap", () => {
    const service = new CollisionService();

    const input = JSON.stringify([
        [ "2021-01-01 12:00", 15 ],
        [ "2021-01-01 12:30", 15 ],
    ]);

    const collisions = service.hasCollisions(input);

    expect(collisions).toEqual(false);
});

