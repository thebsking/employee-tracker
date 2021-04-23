//set dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//inquirer functions
const mainMenu = () => {
    inquirer
    .prompt({
        name: 'userOption',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all departments', 'View all roles', 'Add employee', 'Add role', 'Add department', 'Exit']       
    })
    .then((answers)=> {
        switch (answers.userOption){
            case 'View all employees':
                viewEmployees();
                break;
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Exit':
                connection.end()
                break;
        }
    })
}

const viewEmployees = () => {
   const query = 'SELECT * FROM employee';

}

const viewDepartments = () => {

}

const viewRoles = () => {

}

const addEmployee = () => {

}

const addRole = () => {

}

const addDepartment = () => {

}

//start connection
connection.connect((err)=> {
    if(err) throw err;
    mainMenu();
});