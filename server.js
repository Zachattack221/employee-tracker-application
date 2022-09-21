const express = require('express');
require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TODO: add additional functionality: Update Employee Manger, View Employees by Manager, View Employees by Department, Delete Departments,Delete Roles, Delete Employees, View Total Utilized Budget

// location to push changed content to eventually
possibleNewTeam = []

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees'
    },
    console.log(`Connected to the employees database.`)
);

const prompt = inquirer.createPromptModule();

const mainPrompts = () => {
    prompt([
        {
            type: 'rawlist',
            name: 'choices',
            message: 'Please select an option:',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update Employee Role',
                'Exit'
            ]
        }
    ]).then((answers) => {
        const { choices } = answers;
        if (choices === 'View All Departments') {
            viewAllDep();
        }
        if (choices === 'View All Roles') {
            viewAllRoles();
        }
        if (choices === 'View All Employees') {
            viewAllEmp();
        }
        if (choices === 'Add a Department') {
            addDep();
        }
        if (choices === 'Add a Role') {
            addRole();
        }
        if (choices === 'Add an Employee') {
            addEmp();
        }
        if (choices === 'Update Employee Role') {
            updateEmp();
        }
        // if (choices === 'Exit') {
        //     return "Thank you!"
        // }
    });
};

const viewAllRoles = () => {
    db.query(`
    SELECT role.id,
    role.title, 
    department.department_name AS department,
    role.salary
    FROM role 
    INNER JOIN department ON role.department_id = department.id
    `, (err, roles) => {
        if (err) console.log(err);
        console.table(roles);
        mainPrompts();
    });
};

const viewAllEmp = () => {
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
        mainPrompts();
    });
};



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


mainPrompts()