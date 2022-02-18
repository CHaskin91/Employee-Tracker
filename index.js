const inquirer = require('inquirer');

function mainMenu() {
    console.log("Welcome to Employee Tracker!")
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
    })
}

mainMenu();