# Appointment collision developer challenge

* Given the starting time and duration (in minutes) of two appointments, determine if they collide.

## Dependencies

* Node v18 LTS

## Setup:

1. Clone this repository
2. Run `npm install` to install dependencies

## Running the tests:

* Run `npm test` to run the tests

## Running the application:

* Run `npm run collision-check "[[\"{start date/time}}\", {duration}], [\"{start date/time}\", {duration}]]"` to run the application
* e.g. `npm run collision-check "[[\"2020-01-01 00:00\", 60], [\"2020-01-01 00:30\", 60]]"`

## Notes:

* The application will print `true` if the appointments collide, and `false` if they do not.
* Appointment times must be in the format `YYYY-MM-DD HH:MM`
* Durations must be in minutes as an integer
* Appointment times are in the local timezone of the machine running the application
