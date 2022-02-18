const orm = require('./config/orm');
const inquirer = require('inquirer');

// This function generates the top-level choices for the user. Upon selecting any of them, a new function is executed
// specific to that choice.  Upon completion of the selected task, this function is called again.
function mainMenu() {
    console.log("Welcome to Employee Tracker!\n")
    inquirer.prompt({
        type: "list",
        message: "Please choose what you would like to do.",
        choices: [
            "View all Employees",
            "View all Departments",
            "View all Roles",
            "Add an Employee",
            "Add a Department",
            "Add a Role",
            "Update Role",
            "Quit"
        ],
        name: "choice"
    }).then(function({ choice }) {
        if (choice === "View all Employees") {
            orm.viewEmployees()
            .then(function() {
                console.log("\n");
                mainMenu();
            });
        } else if (choice === "View all Departments") {
            orm.viewDepartments()
            .then(function() {
                console.log("\n");
                mainMenu();
            });
        } else if (choice === "View all Roles") {
            orm.viewRoles()
            .then(function() {
                console.log("\n");
                mainMenu();
            });
        } else if (choice === "Add an Employee") {
            addEmployeePrompt();
        } else if (choice === "Add a Department") {
            addDepartmentPrompt();
        } else if (choice === "Add a Role") {
            addRolePrompt();
        } else if (choice === "Update Role") {
            updateRolePrompt();
        } else {
            orm.endConnection();
        }
    });
}

// note for below

mainMenu();