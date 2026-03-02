# NPR API

This project is a back-end for a number plate recognition system. It provides various endpoints to update and retrieve data. This backend is being developed using Node.js and Express.js with JWT authentication.

## Prerequisites

- Node.js
- MySQL

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Set up the database:**
    - Create a MySQL database named `npr_api`.
    - Create the following tables:
        - `users`
        - `vehicle_in_out`
        - `vehicle_info`
        - `parking_slot_info`
        - `parking_slots`
4. **Set up environment variables:**
    - Create a `.env` file in the root of the project.
    - Add the following environment variables:
        ```
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=your_database_password
        DB_NAME=npr_api
        JWT_SECRET=your_jwt_secret
        ```
5. **Run the application:**
    ```bash
    npm start
    ```
    The application will be running on `http://localhost:3000`.

## Scripts

- `npm start`: Starts the application.
- `npm run dev`: Starts the application in development mode using nodemon.
- `npm test`: Runs the tests.

## API Endpoints

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login a user.
- `GET /api/vehicles/inout`: Get all vehicle in/out entries.
- `POST /api/vehicles/inout`: Create a new vehicle in/out entry.
- `GET /api/vehicles/inout/:id`: Get a vehicle in/out entry by id.
- `PUT /api/vehicles/inout/:id`: Update a vehicle in/out entry by id.
- `DELETE /api/vehicles/inout/:id`: Delete a vehicle in/out entry by id.
- `GET /api/vehicles/info`: Get all vehicle info entries.
- `POST /api/vehicles/info`: Create a new vehicle info entry.
- `GET /api/vehicles/info/:vehicleNumber`: Get a vehicle info entry by vehicle number.
- `PUT /api/vehicles/info/:id`: Update a vehicle info entry by id.
- `DELETE /api/vehicles/info/:id`: Delete a vehicle info entry by id.
- `GET /api/parking/slots/info`: Get all parking slot info entries.
- `POST /api/parking/slots/info`: Create a new parking slot info entry.
- `GET /api/parking/slots/info/:slotNumber`: Get a parking slot info entry by slot number.
- `PUT /api/parking/slots/info/:id`: Update a parking slot info entry by id.
- `DELETE /api/parking/slots/info/:id`: Delete a parking slot info entry by id.
- `GET /api/parking/slots`: Get all parking slot entries.
- `POST /api/parking/slots`: Create a new parking slot entry.
- `GET /api/parking/slots/:id`: Get a parking slot entry by id.
- `PUT /api/parking/slots/:id`: Update a parking slot entry by id.
- `DELETE /api/parking/slots/:id`: Delete a parking slot entry by id.
