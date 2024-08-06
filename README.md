# Flight Path Tracker Microservice

This microservice sorts and tracks a person's flight path based on provided flight records.

## API Endpoint

### POST /calculate

Calculates the ordered flight path from unordered flight records.

#### Request

- **URL**: `/calculate`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "flights": [["SFO", "EWR"], ["ATL", "EWR"], ["SFO", "ATL"]]
  }
  ```

#### Response

- **Success**: `200 OK`
  ```json
  ["SFO", "EWR"]
  ```

- **Error**: `400 Bad Request`
  ```json
  {
    "error": "Flights should be an array of arrays"
  }
  ```

## Running the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `node src/index.js`
4. The service will be available at `http://localhost:8080`

## Testing the API

You can use tools like `curl` or Postman to test the API.

Example `curl` command:
```sh
curl -X POST http://localhost:8080/calculate -H "Content-Type: application/json" -d '{"flights": [["SFO", "EWR"], ["ATL", "EWR"], ["SFO", "ATL"]]}'
```

## Development Time

I spent approximately 2-3 hours developing this microservice. An interesting idea to expand this project could be to integrate with real-time flight data APIs to dynamically track and update flight paths.
