//set dependencies
const express = require('express');
const routes = require('./routes');
const connection = require('./config/connection');

const app = express();
const PORT = process.env.port || 3005;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);


//start db connection
connection.connect((err) => {
    if (err) throw err;
    startMenu()
})