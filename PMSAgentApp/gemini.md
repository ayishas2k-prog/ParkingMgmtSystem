# Project

## Description

This project is a mobile app to created using IONIC and Angular using Capacitor for calling APIs and other Mobile related features such as capturing photo, there is an api app which is already built. This mobile application is a agent application who may be a security officer at the In/Out Gate who will scan the vehicle number plates to capture In/Out of the vehicle to the parking within the premises. This app captures In time and the out time of the vechile so that it can calculate the duration of the vehicle parked and get the cost of parking. Since its agent app, it will login using email and password and uses JWT across the app to communicate with the api. 

Features such as Agent Registration, Parking Slots, Parking Locations, Parking Gates and Cost can be managed by Admin Agent only, the Login API response payload will have isAdmin bit to identify the Admin Agent.  

## Features

### Login - This is the entry module of the application, where user logs in using email id and password and and also selects the Gate Number from where the agent is stationed. The Gate can be either IN or OUT or it can be a single gate with both IN and OUT. Once logged in the app, the agent need not to login again unless the password is changed or the user is revoked.

### Vehicle Scanning - This module will enable the agent to scan the vehicle where the image is captured and sent to api. the api will take the image as input sends to Azure Computer Vision API and recognizes the Number Plate of the vehicle and gets the Number plate. If the number is in the required format (which is given as list of reg ex in configuration) then it will call an api to register the "Vehicle IN" as provided in the payload below. The API will register the "Vehicle IN" and assign a parking slot. If the Agent is logged in as OUT gate, then the "Vehicle Out" will be registered after checking the "Vehicle IN". and displays the amount to be received.

### Find Vehicle - This module will allow the user enter the vehicle number and find whether it is parked inside and get the location and time which it is in and the vehicle owner details if available. 

### Locations (Create / Update) - Locations within the premises and the way markings related to the Location. Each location will have a Character which will used to prefix the parking slots.

### Parking Slots (Create / Update) - Number of parking slots within the selected Location and the parking identification numbers such as 50 50 to 99 to denote 50 parkings spaces. and it will prefixed with the Location Characters.

### Cost (Create / Update) - This module is to update the cost of parking, based on hourly (sperate night Charges) , Daily weekly and monthly. This will be use full in calculating the cost of parking.


## Table / Entity Models

### Login Tables for Internal user (Email Auth) as well as end-user who will use (GoogleAuth or Email Auth)

### Vehicle in/out register
id 
InTime
OutTime
VehicleNumber
VehicleInImage 
VehicleOutImage
InGate
OutGate
Created
Updated
Duration
Cost

### Vehicle Info
id
VehicleNumber
OwnerName
Make
Model
Color
Seats
Location
MobileNumber
EmailId

### Parking Gates
Id
GateNumber
GateType   (IN/OUT/BOTH)
IsActive 

### Parking Slot Info
Id
SlotNumber
VehicleNumber
InTime
OutTime

### Parking Slots
Id
SlotNumber
Floor
SlotLocation
SlotLocationWayMarkings

### Parking Locations
Id
Location
LocationWayMarkings
LocationPremises
LocationPrefixCharacter

## Project Guidelines

### Code Style
- Use camelCase for variable names
- Indent with 2 spaces

### Tools
- Use ESLint for linting

### Rules
- All functions must include JSDoc comments
- Avoid using global variables

### Availabe EndPoints
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
- `GET /api/parking/location/info`: Get all parking location info entries.
- `POST /api/parking/location/info`: Create a new parking location info entry.
- `GET /api/parking/location/info/:locationNumber`: Get a parking location info entry by location number.
- `PUT /api/parking/location/info/:id`: Update a parking location info entry by id.
- `GET /api/parking/gate/info`: Get all parking Gate info entries.
- `POST /api/parking/gate/info`: Create a new parking Gate info entry.
- `GET /api/parking/gate/info/:gateNumber`: Get a parking Gate info entry by gate number.
- `PUT /api/parking/gate/info/:id`: Update a parking Gate info entry by id.

### Testing

- Write unit tests for all new features