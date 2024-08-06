const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.post('/calculate', (req, res) => {
    const flights = req.body.flights;

    if (!Array.isArray(flights)) {
        return res.status(400).send({error: 'Flights should be an array of arrays'});
    }

    const flightMap = new Map();
    const reverseMap = new Map();

    flights.forEach(([src, dst]) => {
        flightMap.set(src, dst);
        reverseMap.set(dst, src);
    });

    // Find the starting point of the flight path
    // We need to find a source (src) that has no corresponding destination (dst) in the reverseMap
    let start = null;

    for (const [src, dst] of flightMap) { // Iterate through all entries in the flightMap
        // Check if the source (src) does not exist as a destination (dst) in the reverseMap
        if (!reverseMap.has(src)) {
            start = src; // If found, this source is the starting point
            break; // Exit the loop once the starting point is found
        }
    }

    // Detailed explanation:
    // flightMap is a Map where each key is a source (src) and the corresponding value is a destination (dst).
    // reverseMap is a Map where each key is a destination (dst) and the corresponding value is a source (src).
    // To find the starting point of the flight path, we need a source that is not a destination of any other flight.
    // This means we look for a source (src) in flightMap that is not present as a key in reverseMap.

    if (!start) {
        return res.status(400).send({error: 'Invalid flight path'});
    }

    const path = [];
    // Construct the flight path starting from the identified starting point
    while (start) { // Continue looping as long as 'start' is not null
        path.push(start); // Add the current starting point to the flight path
        start = flightMap.get(start); // Move to the next destination by getting the value corresponding to the current starting point in flightMap
        // When 'start' becomes null (i.e., there is no further destination), the loop will terminate
    }
    // Detailed explanation:
    // 'path' is an array that will store the sequence of cities representing the flight path.
    // 'while (start)' loop will run as long as 'start' has a value.
    // Inside the loop:
    // - The current city (stored in 'start') is added to the 'path' array.
    // - The next city in the sequence is determined by looking up the current city in 'flightMap'.
    // - 'flightMap.get(start)' retrieves the next city (destination) corresponding to the current city (source).
    // - This process continues until there are no more destinations (i.e., 'flightMap.get(start)' returns null).
    // The result is a complete flight path stored in the 'path' array, starting from the initial source city to the final destination.

    res.send(path);
});

app.listen(port, () => {
    console.log(`Flight path tracker microservice listening at http://localhost:${port}`);
});
