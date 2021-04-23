DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

CREATE TABLE department (
    department_id int auto_increment,
    name varchar(30),
    primary key (department_id)
);

CREATE TABLE roles (
    role_id int auto_increment,
    title varchar(30),
    salary decimal,
    department_id int,
    primary key (role_id),
    foreign key (department_id) references department (department_id)
);

CREATE TABLE employee (
    id int auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    primary key (id),
    foreign key (role_id) references roles (role_id),
    foreign key (manager_id) references employee (id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Marketing"), ("Finance"), ("Engineering"), ("Admin");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Sales Person", 40000, (SELECT department_id FROM department WHERE name="Sales")),
("Sales Manager", 60000, (SELECT department_id FROM department WHERE name="Sales")),
("Marketing Manager", 65000, (SELECT department_id FROM department WHERE name="Marketing")),
("Marketing Intern", 15000, (SELECT department_id FROM department WHERE name="Marketing")),
("Marketing Specialist", 45000, (SELECT department_id FROM department WHERE name="Marketing")),
("Accountant", 50000, (SELECT department_id FROM department WHERE name="Finance")),
("Accounting Manager", 70000, (SELECT department_id FROM department WHERE name="Finance")),
("JR Engineer", 40000, (SELECT department_id FROM department WHERE name="Engineering")),
("Engineering Manager", 70000, (SELECT department_id FROM department WHERE name="Engineering")),
("Office Manager", 40000, (SELECT department_id FROM department WHERE name="Admin"));

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Sarah", "Wilson", (SELECT role_id FROM roles WHERE title="Office Manager"), null),
("Cat", "Stevens", (SELECT role_id FROM roles WHERE title="Engineering Manager"), 1),
("David", "Smith", (SELECT role_id FROM roles WHERE title="Sales Manager"), 1),
("Kayla", "Davis", (SELECT role_id FROM roles WHERE title="Marketing Manager"), 1),
("Hannah", "Johnson", (SELECT role_id FROM roles WHERE title="Accounting Manager"), 1),
("Brian", "Adams", (SELECT role_id FROM roles WHERE title="Sales Person"), 3),
("Kanye", "West", (SELECT role_id FROM roles WHERE title="Marketing Specialist"), 4),
("Jimmy", "Page", (SELECT role_id FROM roles WHERE title="Marketing Intern"), 7),
("Bobby", "McGee", (SELECT role_id FROM roles WHERE title="Accountant"), 5),
("Kenny", "Chesney", (SELECT role_id FROM roles WHERE title="JR Engineer"), 2),
("Sarah","McLaughlin", (SELECT role_id FROM roles WHERE title="JR Engineer"), 2);