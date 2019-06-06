CREATE TABLE `admin` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `attendance`.`emp` (
  `name` VARCHAR(100) NOT NULL,
  `date` DATE NOT NULL,
  `checkin` TIME NOT NULL,
  `checkout` TIME NULL,
  `luncho` TIME NULL,
  `lunchr` TIME NULL,
  `present` INT NULL,
  `hours` FLOAT NULL);

  ALTER TABLE `attendance`.`emp` 
ADD COLUMN `password` VARCHAR(100) NOT NULL AFTER `hours`;


CREATE TABLE `attendance`.`account` (
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`username`));

