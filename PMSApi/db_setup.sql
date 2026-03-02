CREATE DATABASE IF NOT EXISTS npr_api;

USE npr_api;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  googleId VARCHAR(255),
  isInternal BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `gates` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `GateName` varchar(45) DEFAULT NULL,
  `GateType` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
);



CREATE TABLE `vehicle_inout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `InTime` datetime NOT NULL,
  `OutTime` datetime DEFAULT NULL,
  `VehicleNumber` varchar(25) NOT NULL,
  `VehicleInImage` mediumblob,
  `VehicleOutImage` mediumblob,
  `InGate` varchar(25) NOT NULL,
  `OutGate` varchar(25) DEFAULT NULL,
  `Created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Duration` int DEFAULT NULL,
  `Cost` decimal(10,2) DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  `vehicle_in_outcol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS vehicle_info (
  id INT AUTO_INCREMENT PRIMARY KEY,
  VehicleNumber VARCHAR(255) NOT NULL,
  OwnerName VARCHAR(255),
  Make VARCHAR(255),
  Model VARCHAR(255),
  Color VARCHAR(255),
  Seats INT,
  Location VARCHAR(255),
  MobileNumber VARCHAR(255),
  EmailId VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS parking_slots (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  SlotNumber VARCHAR(255) NOT NULL,
  Floor VARCHAR(255),
  SlotLocation VARCHAR(255),
  SlotLocationWayMarkings TEXT
);

CREATE TABLE IF NOT EXISTS parking_slot_info (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  SlotNumber VARCHAR(255) NOT NULL,
  VehicleNumber VARCHAR(255),
  InTime DATETIME,
  OutTime DATETIME
);

-- Internal User (for gate security personnel)
INSERT INTO users (email, password, isInternal) VALUES ('gate.security@example.com', '$2b$10$5LEANKTtjhQ5k3lIfbhLYuwTswNXLSilipH.nIqBAxNZTgqbfkSgq', true);

-- End-User (vehicle owner)
INSERT INTO users (email, password, isInternal) VALUES ('vehicle.owner@example.com', '$2b$10$5LEANKTtjhQ5k3lIfbhLYuwTswNXLSilipH.nIqBAxNZTgqbfkSgq', false);

CREATE TABLE IF NOT EXISTS User_Payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT NOT NULL,
  VehicleId INT NOT NULL,
  Amount DECIMAL(10, 2) NOT NULL,
  PaymentMethod VARCHAR(50),
  TransactionId VARCHAR(100),
  ReferenceId VARCHAR(100),
  IsInitiated BOOLEAN DEFAULT false,
  IsSuccess BOOLEAN DEFAULT false,
  CreatedDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (UserId) REFERENCES users(id),
  FOREIGN KEY (VehicleId) REFERENCES vehicle_info(id)
);

CREATE TABLE IF NOT EXISTS Notifications (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  IsRead BOOLEAN DEFAULT false,
  UserId INT NOT NULL,
  VehicleId INT,
  Message TEXT NOT NULL,
  PaymentId INT,
  CreatedDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedDateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (UserId) REFERENCES users(id),
  FOREIGN KEY (VehicleId) REFERENCES vehicle_info(id),
  FOREIGN KEY (PaymentId) REFERENCES User_Payments(id)
);

CREATE TABLE IF NOT EXISTS User_Vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT NOT NULL,
  VehicleId INT NOT NULL,
  FOREIGN KEY (UserId) REFERENCES users(id),
  FOREIGN KEY (VehicleId) REFERENCES vehicle_info(id)
);
