const orm = require('./config/orm.js');
const inquirer = require('inquirer');

// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
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
    }).then(function ({ choice }) {
        if (choice === "View all Employees") {
            orm.viewEmployees()
                .then(function () {
                    console.log("\n");
                    mainMenu();
                });
        } else if (choice === "View all Departments") {
            orm.viewDepartments()
                .then(function () {
                    console.log("\n");
                    mainMenu();
                });
        } else if (choice === "View all Roles") {
            orm.viewRoles()
                .then(function () {
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

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployeePrompt() {
    orm.getEmployees()
        .then(function (res) {
            const managerArray = [];
            for (let i = 0; i < res.length; i++) {
                managerArray.push(res[i].name);
            }
            managerArray.push("none");
            orm.getRoles()
                .then(function (response) {
                    const roleTitleArray = [];
                    for (let i = 0; i < response.length; i++) {
                        roleTitleArray.push(response[i].title);
                    }
                    inquirer.prompt([{
                        type: "input",
                        message: "Enter employee's first name",
                        name: "firstName"
                    },
                    {
                        type: "input",
                        message: "Enter employee's last name",
                        name: "lastName"
                    },
                    {
                        type: "list",
                        message: "Select employee's role",
                        choices: roleTitleArray,
                        name: "role"
                    },
                    {
                        type: "list",
                        message: "Select employee's manager",
                        choices: managerArray,
                        name: "manager"
                    }]).then(function ({ firstName, lastName, role, manager }) {
                        const roleId = response[roleTitleArray.indexOf(role)].id;
                        if (manager === "none") {
                            orm.addEmployee(firstName, lastName, roleId)
                                .then(function () {
                                    console.log("\n");
                                    mainMenu();
                                });
                        } else {
                            const managerId = res[managerArray.indexOf(manager)].id;
                            orm.addEmployee(firstName, lastName, roleId, managerId)
                                .then(function () {
                                    console.log("\n");
                                    mainMenu();
                                });
                        }
                    });
                });
        });
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartmentPrompt() {
    orm.getDepartments()
        .then(function (response) {
            const deptArray = [];
            for (let i = 0; i < response.length; i++) {
                deptArray.push(response[i].name);
            }
            inquirer.prompt({
                type: "input",
                message: "Enter the name of the department you would like to add",
                name: "deptName"
            }).then(function ({ deptName }) {
                if (deptArray.includes(deptName)) {
                    console.log("There is already a department with that name!\n");
                    mainMenu();
                } else {
                    orm.addDepartment(deptName)
                        .then(function () {
                            console.log("\n");
                            mainMenu();
                        });
                }
            });
        });
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRolePrompt() {
    orm.getRoles()
        .then(function (roles) {
            const roleArray = [];
            for (let i = 0; i < roles.length; i++) {
                roleArray.push(roles[i].title);
            }
            orm.getDepartments()
                .then(function (deptArray) {
                    const deptNames = [];
                    for (let i = 0; i < deptArray.length; i++) {
                        deptNames.push(deptArray[i].name);
                    }
                    inquirer.prompt([{
                        type: "input",
                        message: "Enter the name of the Role you would like to add",
                        name: "title"
                    },
                    {
                        type: "input",
                        message: "Enter the Annual Salary of the new Role",
                        name: "salary"
                    },
                    {
                        type: "list",
                        message: "Select the Department in which the new Role will work",
                        choices: deptNames,
                        name: "department"
                    }]).then(function ({ title, salary, department }) {
                        const deptId = deptArray[deptNames.indexOf(department)].id;
                        if (roleArray.includes(title)) {
                            console.log("Error - that Title already exists!\n");
                            mainMenu();
                        } else {
                            orm.addRole(title, salary, deptId)
                                .then(function () {
                                    console.log("\n");
                                    mainMenu();
                                });
                        }
                    });
                });
        });
}



mainMenu();