//set dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');

//create db connection
const connection = mysql.createConnection({
    host: 'localhost', 
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});





//start db connection
connection.connect((err) => {
    if (err) throw err;
    //put function here
})