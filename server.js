const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "USYDAug@",
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
                    "Remove Employee",
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

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Add Department":
                    addDept();
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

    connection.query("SELECT employee.first_name, employee.last_name FROM employee",
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
        startUp();
    });
};


function viewAllRoles() {
    connection.query("SELECT * from roles", function (err, res) {
        if (err) throw err;
        console.table(res);
        startUp();
    });
};