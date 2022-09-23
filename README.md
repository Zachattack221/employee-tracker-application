# employee-tracker-application

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Visuals](#visuals)
4. [License](#license)

## Description
[GitHub Repository]()
[Video Walkthrough](https://drive.google.com/file/d/1SUQinhfsyiIi1YnH0uyLxQHZKmnI9VTL/view)
The goal of the Employee Tracker application is to provide the user with a contained enviornment to edit and compose a collection of employee information. Leveraging mysql and express this app creates a seeded mock database that can preform queries to access or change specific data pertaining to employees. 

## Installation
First start with establishing our mock database enviornment. 

Run "mysql -u root" to instantiate the mysql shell. Once in this shell, you will need to first run "SOURCE db/schema.sql;" to establish our db structure. 

Following this, still within the mysql shell, run "SOURCE db/seeds.sql;" to seed the created tables with provided values. At this point you may type Exit to leave mysql. 

Now within your terminal, at the root level of the application, run "npm i" to pull in the remaining dependencies (mysql2, console.table, inquirer8.2.4, and express). 

When all packages have installed, simply run "npm run start"  or "node server.js" to initialize process.


## Visuals
![Viewing Departments and Roles](./images/FirstVisual.png)
![View All Employees](./images/SecondVisual.png)

## License
This application is licensed with the MIT License.