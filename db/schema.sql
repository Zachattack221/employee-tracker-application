DROP DATABASE IF EXISTS tracker-db;

CREATE DATABASE tracker-db;
USE tracker-db;

/* TODO: verify if auto increment necessary for all tables */
/* TODO: add foreign key connections, remember to ON DELETE SET NULL */

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    /* manager intentionally left to default to null if employee has no manager */
    manager_id INT 
);