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
        choices: ['View all employees', 'View all departments', 'View all roles', 'Add employee', 'Add role', 'Add department', 'Update a role', 'Exit']       
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
            case 'Update a role':
                updateRole();
            case 'Exit':
                connection.end()
                break;
        }
    })
}

const viewEmployees = () => {
   const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
   FROM employee AS e
   JOIN roles AS r ON e.role_id = r.role_id
   JOIN department AS d on r.department_id = d.department_id
   LEFT JOIN employee AS m on e.manager_id = m.id
   ORDER BY e.id`;

   connection.query(query, (err, res)=> {
       if (err) throw err;
       console.table(res);
       mainMenu();
   });
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