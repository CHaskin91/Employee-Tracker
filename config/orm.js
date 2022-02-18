const connection = require('./connection.js');

const orm = {
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

    
}

module.exports = orm;