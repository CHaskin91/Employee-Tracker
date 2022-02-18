const connection = require('./connection.js');

const orm = {
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
    addDepartment: function(deptName) {
        return new Promise(function(resolve, reject) {
            const queryString = `INSERT INTO departments (name) VALUES (?)`;
            connection.query(queryString, deptName, function(err, result) {
                if (err) {
                    return reject(err);
                }
                console.log("Department was added successfully!");
                return resolve();
            });
        });
    },

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
    addRole: function(roleTitle, roleSalary, deptId) {
        return new Promise(function(resolve, reject) {
            const queryString = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
            connection.query(queryString, [roleTitle, roleSalary, deptId], function (err, result) {
                if (err) {
                    return reject(err);
                }
                console.log("Role was added successfully!");
                return resolve();
            });
        });
    },

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    addEmployee: function(firstName, lastName, roleId, mgrId) {
        return new Promise(function(resolve, reject) {
            const queryString = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            connection.query(queryString, [firstName, lastName, roleId, mgrId], function(err, result) {
                if (err) {
                    return reject(err);
                }
                console.log("Employee added successfully!");
                return resolve();
            });
        });
    },

// WHEN I choose to view employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to


}

module.exports = orm;