INSERT INTO department (department_name)
VALUES
('Engineering'), 
('Finace'),
('Legal'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1), 
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 130000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

/* added mock employee content, defaulted manager_id to NULL temporarily */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jason', 'Bateman', 1, 1),
('Michael', 'Cera', 2, NULL),
('Jessica', 'Walter', 3, 2),
('Will', 'Arnet', 4, NULL),
('David', 'Cross', 5, 3),
('Tony', 'Hale', 6, NULL),
('Portia', 'DeRossi', 7, 4),
('Ron', 'Howard', 8, NULL);

