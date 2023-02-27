"use strict";

import { CollisionService } from "./services/collision";

const input = process.argv.slice(2);

if (input.length === 0) {
    console.log("Error: please provide two datetime and duration pairs as a JSON string to check appointment collision.");
    console.log("Usage: npm run collision-check \"[[\\\"{datetime}\\\", duration], [\\\"{datetime}\\\", duration]]\"");
    console.log("Output: true if appointments collide, false if they do not.");
    console.log("Example: npm run collision-check \"[[\\\"2020-01-01 12:00', 60], [\\\"2020-01-01 12:00\\\", 60]]\"")

    process.exit(1);
}

const service = new CollisionService();

try {
    const collisions = service.hasCollisions(input[0]);

    console.log(collisions);
} catch (e) {
    console.error(e.message);
}

