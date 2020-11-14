const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "Employee_Tracker"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

function start() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "start",
                choices: [
                    "Add Employee",
                    "View all Employees",
                    "Add Department",
                    "View all Departments",
                    "Add Roles",
                    "View all Roles",
                    "Update Employee Role",
                    "Exit"
                ]
            }
        ])
        .then(function (res) {
            switch (res.start) {

                case "Add Employee":
                    addEmployee();
                    break;

                case "View all Employees":
                    viewAllEmployees();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "View all Departments":
                    viewAllDept();
                    break;

                case "Add Roles":
                    addRole();
                    break;

                case "View all Roles":
                    viewAllRoles();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        })
}

function viewAllEmployees() {

    connection.query("SELECT employee.first_name, employee.last_name from employee",
        function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
            start();
        });
};

function viewAllDept() {
    connection.query("SELECT * from department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};


function viewAllRoles() {
    connection.query("SELECT roles.title from roles",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });
};

function addEmployee() {
    //Log entry 
    console.log("Adding employee name");
    inquirer.prompt([
        {
            type: "input",
            message: "First Name: ",
            name: "first_name",
        },
        {
            type: "input",
            message: "Last Name: ",
            name: "last_name",
        },
        {
            type: "input",
            message: "Role ID: ",
            name: "role_id",
        }
    ]).then(
        function (res) {
            const query = connection.query(
                "INSERT INTO employee SET ?",
                res,
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee has been added");
                    viewAllEmployees();
                }
            );
        });
};

function addDepartment() {
    console.log("Adding Department");
    inquirer.prompt([
        {
            type: "input",
            message: "New Department: ",
            name: "name",
        }
    ]).then(
        function (res) {
            const query = connection.query(
                "INSERT INTO department SET ?",
                res,
                function (err, res) {
                    if (err) throw err;
                    console.log("New Department has been added");
                    viewAllDept();
                }
            );
        });
};

function addRole() {
    console.log("Adding Role");

    //Set varable for department to grab list from DB
    var department = [];
    connection.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                res[i].first_name + " " + res[i].last_name
                department.push({ name: res[i].name, value: res[i].id });
                //console.log("Updated departments");
            }
            inquirer.prompt([
                {
                    type: "input",
                    message: "New role",
                    name: "title"
                },
                {
                    type: "input",
                    message: "Role Salary: ",
                    name: "salary"
                },
                {
                    type: "list",
                    name: "department",
                    message: "what department?",
                    choices: department
                }

            ]).then(
                function (res) {
                    const query = connection.query(
                        "INSERT INTO roles SET ?",
                        {
                            title: res.title,
                            salary: res.salary,
                            department_id: res.department
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.log("New Role has been added");
                            viewAllRoles();
                        }
                    )
                })
        })
}

function updateEmployeeRole() {
    console.log("Updated Employee Role");
    var employee = [];
    connection.query("SELECT first_name, last_name, id FROM employee",
        function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                res[i].first_name + " " + res[i].last_name + " " + res[i].id
                employee.push({ name: res[i].first_name + " " + res[i].last_name, value: res[i].id });
                //console.log("Updated departments");
            } inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employeeName",
                        message: "Select name to update",
                        choices: employee
                    },
                    {
                        type: "input",
                        name: "roles",
                        message: "What is your new role?"
                    }
                ]).then(function (res) {
                    connection.query(`UPDATE employee SET role_id = ${res.roles} WHERE id = ${res.employeeName}`,
                        function (err, res) {
                            console.log(res);
                            start()
                        })
                }
                );
        })
}
