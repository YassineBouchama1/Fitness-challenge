-- create database
CREATE DATABASE IF NOT EXISTS clickfit_db;
USE clickfit_db;

-- Create users table
CREATE TABLE users (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    `password` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    `type` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    `active` TINYINT DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- create storef procedure for adding users
DELIMITER //
CREATE PROCEDURE `addUser`(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_type VARCHAR(255)
)
BEGIN
    INSERT INTO users (email, password, type, active)
    VALUES (p_email, p_password, p_type, 1);
END //
DELIMITER ;



CALL addUser('bouchamajob@gmail.com', 'yassinebouchama', 'user');
