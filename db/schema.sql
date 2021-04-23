DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

CREATE TABLE department (
    department_id int auto_increment,
    name varchar(30),
    primary key (department_id)
);

CREATE TABLE role (
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
    foreign key (role_id) references role (role_id),
    foreign key (manager_id) references employee (id)
);