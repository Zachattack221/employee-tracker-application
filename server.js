const express = require('express');
const cTable = require('console.table');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const prompt = inquirer.createPromptModule();
// prompt()


const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL Username
        user: 'root',
        password: '',
        database: 'employees'
    },
    console.log(`Connected to the tracker-db database.`)
);

// TODO: create functions/query requests for items below:

// view all departments, 
// view all roles, 
// view all employees, 
// add a department, 
// add a role, 
// add an employee, 
// and update an employee role


// simple query, placeholder for content

// db.query('SELECT * FROM _____', function (err, results) {
//     // 'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     if (err) return console.log(err);
//     [
//         'Page',
//         45
//     ],
//         console.log(results); // results contains rows returned by server
// }
// );

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});