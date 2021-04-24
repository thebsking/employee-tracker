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
        .then((answers) => {
            switch (answers.userOption) {
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

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res,);
        mainMenu();
    });
}

const viewDepartments = () => {
    const query = `SELECT * FROM department`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

const viewRoles = () => {
    const query = `SELECT r.role_id, r.title, r.salary, d.name AS department 
    FROM roles AS r
    JOIN department AS d ON r.department_id = d.department_id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

const addEmployee = async () => {
    const employee = await inquirer
        .prompt([
            { name: 'firstName', message: `What is the employee's first name`, type: 'input' },
            { name: 'lastName', message: `What is the employee's last name?`, type: 'input' }
        ]);

        connection.query(`SELECT roles.role_id, roles.title, department.name AS department, roles.salary FROM roles LEFT JOIN department ON roles.department_id = department.department_id`, async (err, res)=> {
            const allRoles = res.map(({id, title})=> ({
                name: title,
                value: id,
            }
            ))
            const role = await inquirer
            .prompt({
                name: 'role',
                type: 'list',
                message: `What is this employee's role?`,
                choices: allRoles
            })

            employee.role_id = role.role;

            connection.query(`SELECT first_name, last_name FROM employee`, async (err, res)=> {
                const allEmployees = res.map(({id, first_name, last_name})=>(
                    {
                        name: `${first_name} ${last_name}`,
                        value: id
                    }
                ));
                const manager = await inquirer
                .prompt({
                    name: 'manager',
                    type: 'list',
                    message: `Who will this employee report to?`,
                    choices: allEmployees
                })
                employee.manager_id = manager.manager;

                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) Values (?, ?, ?, ?)`, [employee.firstName, employee.lastName, employee.role_id, employee.manager_id], async (err, res) => {
                    if(err) throw err;
                    console.log('employee added');
                    mainMenu();
                })
            })
        }) 
}

const addRole = async () => {

    const newRole = await inquirer
        .prompt({ name: 'role', type: 'input', message: `What is the tile of the role you would like to add?` });

    connection.query(`SELECT * FROM department`, async (err, res) => {
        let allDepts = res.map(({ department_id, name }) => (
            { name: name, value: department_id }
        ))


        const department = await inquirer
            .prompt({ name: 'dept', type: 'list', message: `Which department is this role in?`, choices: allDepts })

        newRole.department_id = department.dept;

        const salary = await inquirer
            .prompt({
                name: 'salary', type: 'number', message: `How much will this role make?`
            })

        const query = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;

        connection.query(query, [newRole.role, salary, newRole.department_id], async (err, res) => {
            if (err) throw err;
            console.log('Role added')
            mainMenu();
        });
    })
}

const addDepartment = () => {
    inquirer
        .prompt({
            name: 'department',
            type: 'input',
            message: 'What is the name of the department you would like to add?'
        })
        .then((answer) => {
            connection.query(`INSERT INTO department (name) VALUES('${answer.department}')`);
            mainMenu();
        })
}

const updateRole = async () => {

   connection.query(`SELECT * FROM employee`, async (err, res)=> {
    const allEmployees = res.map(({id, first_name, last_name}) => (
        {
            name: `${first_name} ${last_name}`,
            value: id
        }
    ))
    

    const whichEmployee = await inquirer
    .prompt({
        name: 'employee',
        type: 'list', 
        message: `Which employee would you like to update?`,
        choices: allEmployees
    })

    const chosenEmployee = whichEmployee.employee;

    connection.query(`SELECT role_id, title FROM roles;`, async (err, res)=> {
        if(err) throw err;
        const allRoles = res.map(({id, title}) => (
            {
                name: title,
                value: id
            }
        ))

        const chosenRole = await inquirer
        .prompt({
            name: 'title',
            type: 'list',
            message: `What should the new role be?`,
            choices: allRoles
        }) 

        const newRole = chosenRole.title;

        connection.query(`UPDATE employee SET role_id= ? WHERE id= ?`, [newRole, chosenEmployee], async (err, res) => {
            if(err) throw err;
            console.log('Employe role updated');
            mainMenu();
        })
    })


   })
}

//start connection
connection.connect((err) => {
    if (err) throw err;
    mainMenu();
});