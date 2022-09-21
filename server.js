const express = require('express');
require('console.table');
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
        user: 'root',
        password: '',
        database: 'employees'
    },
    console.log(`Connected to the employees database.`)
);

// db.query(`
// SELECT role.id,
// role.title, 
// role.salary,
// department.department_name AS department
// FROM role 
// INNER JOIN department ON role.department_id = department.id
// `, (err, employees) => {
//     if (err) console.log(err);
//     console.table(employees);
// });

// LEFT JOIN role ON role.department_id = department.name 

db.query(`
SELECT
  e.id,
  CONCAT(e.first_name, ' ', e.last_name) AS name,
  role.title,
  role.salary,
  CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM employee e
LEFT JOIN role
ON e.role_id = role.id
LEFT JOIN employee m
ON e.manager_id = m.id
`, (err, employees) => {
  if (err) console.log(err);
  console.table(employees);
});


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

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

