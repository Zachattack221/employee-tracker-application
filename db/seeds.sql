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
('Jason', 'Bateman', 1, NULL),
('Michael', 'Cera', 2, 1),
('Jessica', 'Walter', 3, NULL),
('Will', 'Arnet', 4, 3),
('David', 'Cross', 5, NULL),
('Tony', 'Hale', 6, 5),
('Portia', 'DeRossi', 7, NULL),
('Ron', 'Howard', 8, 7);

