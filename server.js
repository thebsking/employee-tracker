//set dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');

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
                //what to do
                break;
            case 'View all roles':
                //what to do
                break;
            case 'Add employee':
                //what to do
                break;
            case 'Add role':
                //what to do
                break;
            case 'Add department':
                //what to do
                break;
            case 'Exit':
                connection.end()
                break;
        }
    })
}

const viewEmployees = () => {
    app.get('/employee')
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