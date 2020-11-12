INSERT into department (name)
VALUES ("Sales");
INSERT into department (name)
VALUES ("Engineering");
INSERT into department (name)
VALUES ("Finance");
INSERT into department (name)
VALUES ("Legal");
INSERT into department (name)
VALUES ("Manager");

select * from department;

INSERT into roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT into roles (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);
INSERT into roles (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT into roles (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT into roles (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT into roles (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);
INSERT into roles (title, salary, department_id)
VALUES ("Lawyer", 190000, 5);

select * from roles;

INSERT into employee (first_name, last_name, role_id)
values ("John", "Doe", 3); 
INSERT into employee (first_name, last_name, role_id)
values ("Mike", "Chan", 4);
INSERT into employee (first_name, last_name, role_id)
values ("Ashley", "Rodriguez", 5);
INSERT into employee (first_name, last_name, role_id)
values ("Kevin", "Tupik", 6);
INSERT into employee (first_name, last_name, role_id)
values ("Sarah", "Lourd", 7);
INSERT into employee (first_name, last_name, role_id)
values ("Tom", "Allen", 8);

select * from employee;
