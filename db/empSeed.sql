DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

CREATE TABLE employee (
    id int auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    primary key (id)
);

CREATE TABLE role (
    id int auto_increment,
    title varchar(30),
    salary decimal,
    department_id int,
    primary key (id)
);

CREATE TABLE department (
    id int auto_increment,
    name varchar(30),
    primary key (id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Marketing"), ("Engineering"), ("Administration");

