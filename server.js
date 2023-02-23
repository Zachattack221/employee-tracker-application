const express = require('express');
require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
        if (choices === 'Exit') {
            console.log("Thank you!");
            process.exit();
        }
    });
};
// Setting up queries within functions to quickly request employee/role/dept. datasets

const viewAllDep = () => {
    db.query(`
    SELECT department.department_name AS department, department.id AS id FROM department  ORDER BY department.id ASC`, (err, departments) => {
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
    ORDER BY role.id ASC
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
    ORDER BY e.id ASC
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
    db.promise().query('SELECT title, salary, id FROM role').then(function ([roleResults, options]) {
        const role = roleResults.map(role => { return { name: role.title, value: role.salary, value: role.id } })
        db.promise().query('SELECT department_name, id FROM department').then(function ([deptResults, options]) {
            const departments = deptResults.map(departments => { return { name: departments.department_name, value: departments.id } });
            prompt([
                {
                    type: 'input',
                    name: 'newRole',
                    message: 'Please enter the new role.'
                },
                {
                    type: 'input',
                    name: 'newSalary',
                    message: 'Please enter the salary for this new role.'
                },
                {
                    type: 'list',
                    name: 'newDept',
                    message: 'What is the department for this role?',
                    choices: departments
                },
            ])
                .then((answer) => {
                    db.promise().query(`
        INSERT INTO role (title, salary, department_id)
        VALUES (?,?,?)`, [answer.newRole, answer.newSalary, answer.newDept]).then(function ([res, options]) {
                     console.log('Added Successfully!');
                        mainPrompts();
                    });
                })
        });
    });
};

const updateEmp = () => {
    db.promise().query('SELECT first_name, last_name, id FROM employee').then(function ([results, fields]) {
        const employees = results.map(employee => { return { name: employee.first_name + " " + employee.last_name, value: employee.id } })
        db.promise().query('SELECT title, id FROM role').then(function ([roleResults, options]) {
            const roles = roleResults.map(role => { return { name: role.title, value: role.id } })
            inquirer.prompt([
                {
                    name: "empName",
                    type: "list",
                    message: "Who is the employee?",
                    choices: employees
                },
                {
                    name: "empRole",
                    type: "list",
                    message: "What is the employee's new role?",
                    choices: roles
                }
            ]).then(function (response) {
                db.promise().query('UPDATE employee SET role_id = ? WHERE employee.id = ?',
                    [response.empRole, response.empName]).then(function ([results, options]) {
                        console.log("Added Successfully")
                        mainPrompts();
                    });
            });
        });
    });
};

const addEmp = () => {
    db.promise().query('SELECT first_name, last_name, id FROM employee').then(function ([results, options]) {
        const managers = results.map(employee => { return { name: employee.first_name + " " + employee.last_name, value: employee.id } })
        db.promise().query('SELECT title, id FROM role').then(function ([roleResults, options]) {
            const roles = roleResults.map(role => { return { name: role.title, value: role.id } })
            prompt([
                {
                    type: 'input',
                    name: 'empFirstName',
                    message: 'Please enter an employee first name:'
                },
                {
                    type: 'input',
                    name: 'empLastName',
                    message: 'Please enter an employee last name:'
                },
                {
                    type: 'list',
                    name: 'empRole',
                    message: 'Please select an employee role',
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'empManager',
                    message: 'Please select the current employee\'s manager if applicable',
                    choices: managers
                },
            ]).then((answers) => {
                db.promise().query('INSERT INTO employee (first_name,last_name,role_id,manager_id)VALUES(?,?,?,?)', [answers.empFirstName, answers.empLastName, answers.empRole, answers.empManager]).then(function ([results, options]) {
                    console.table("Successfully Added");
                    mainPrompts();
                });
            });
        });
    });
};

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});


mainPrompts();
