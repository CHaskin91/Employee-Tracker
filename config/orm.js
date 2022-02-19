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
viewEmployees: function() {
    return new Promise(function(resolve, reject) {
        const queryString = 'SELECT employees.id, first_name, last_name, title, salary, name, manager_id FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id';
        connection.query(queryString, function(err, result) {
            if (err) {
                return reject(err);
            }
            let newTable = [];
            for (let i=0; i<result.length; i++) {
                let manager_name = "";
                if (result[i].manager_id !== null) {
                    for (let j=0; j<result.length; j++) {
                        if (result[j].id === result[i].manager_id) {
                            manager_name = result[j].first_name + " " + result[j].last_name;
                        }
                    }
                } else {
                    manager_name = "Not Available";
                }
                const tableElement = {
                    "Employee ID": result[i].id,
                    "First Name": result[i].first_name,
                    "Last Name": result[i].last_name,
                    "Title": result[i].title,
                    "Salary": result[i].salary,
                    "Department": result[i].name,
                    "Manager": manager_name
                };
                newTable.push(tableElement);
            }
            console.table(newTable);
            return resolve();
        });
    });
},
getEmployees: function() {
    return new Promise(function(resolve, reject) {
        const queryString = "SELECT * FROM employees";
        connection.query(queryString, function(err, result) {
            if (err) {
                return reject(err);
            }
            const empArray = [];
            for (let i=0; i<result.length; i++) {
                const empObj = {
                    id: result[i].id,
                    name: result[i].first_name + " " + result[i].last_name
                };
                empArray.push(empObj);
            }
            return resolve(empArray);
        });
    });
},
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
viewRoles: function() {
    return new Promise(function(resolve, reject) {
        const queryString = "SELECT roles.id, title, salary, name FROM roles LEFT JOIN departments ON roles.department_id = departments.id";
        connection.query(queryString, function(err, result) {
            if (err) {
                return reject(err);
            }
            const newTable = [];
            for (let i=0; i<result.length; i++) {
                const roleObj = {
                    "ID": result[i].id,
                    "Title": result[i].title,
                    "Salary": result[i].salary,
                    "Department": result[i].name
                };
                newTable.push(roleObj);
            }
            console.table(newTable);
            return resolve();
        });
    });
},
getRoles: function() {
    return new Promise(function(resolve, reject) {
        const queryString = "SELECT * FROM roles";
        connection.query(queryString, function(err,result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
},
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
viewDepartments: function() {
    return new Promise(function(resolve, reject) {
        const queryString = "SELECT * FROM departments";
        connection.query(queryString, function(err, result) {
            if (err) {
                return reject(err);
            }
            console.table(result);
            return resolve();
        });
    });
},
getDepartments: function() {
    return new Promise(function(resolve, reject) {
        const queryString = "SELECT * FROM departments";
        connection.query(queryString, function(err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
},
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

}

module.exports = orm;