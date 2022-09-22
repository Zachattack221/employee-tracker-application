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

// location to push changed content to eventually, may be unnecessary 
// possibleNewDepartments = []


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

const viewAllDep = () => {
    db.query(`
    SELECT department.department_name AS department, department.id AS id FROM department`, (err, departments) => {
        if (err) console.log(err);
        console.table(departments);
        mainPrompts();
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

// set up function structure for remaining choices, triggered from prompt module

const addDep = () => {
    prompt([
        {
        type: 'input',
        name: 'newDepartment',
        message: 'Please enter the new department name.'
        }
    ])
    .then((answer) => {
    db.query(`INSERT INTO department (department_name) VALUES (?)`, answer.newDepartment, (err, newDepartment) => {
        if (err) console.log(err);
        viewAllDep();
    });
});
};



const addRole = () => {
    prompt([
        {
        type: 'input',
        name: 'newRole',
        message: 'Please enter the new role.'
        }
        {
        type: 'number',
        name: 'newSalary',
        message: 'Please enter the salary for this new role.'
        }
        {
        type: 'rawlist',
        name: 'newDept',
        message: 'Please enter the new department for this role.',
        // TODO: have choices populate with a dynamically filled array of existing departments
        choices: ""
        }
    ])
    .then((answer) => {
    db.query(``,answer.newRole, (err, newRole) => {
        if (err) console.log(err);
        // console.table(newRole);
        mainPrompts();
    });
};




const updateEmp = () => {
    db.query(``, (err, updatedEmployees) => {
        if (err) console.log(err);
        console.table(updatedEmployees);
        mainPrompts();
    });
};



// const addEmp = () => {
//     prompt([
//         {
//         type: 'input',
//         name: 'firstName',
//         message: 'Please enter an employee first name:'
//         },
//         {
//         type: 'input',
//         name: 'lastName',
//         message: 'Please enter an employee last name:'
//         },
//         {
//         type: 'list',
//         name: 'role',
//         message: 'Please select an employee role',
//         // TODO: add option dynamically
//         choices: ""
//     },
//     {
//         type: 'list',
//         name: 'manager',
//         message: 'Please select the current employee\'s manager if applicable',
//         // TODO: add option dynamically
//         choices: ""
//         },
// // TODO: convert to async 
//     ]).then()
//     db.query(``, (err, addedEmployees) => {
//         if (err) console.log(err);
//         console.table(addedEmployees);
//         mainPrompts();
//     });
// };


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


mainPrompts();