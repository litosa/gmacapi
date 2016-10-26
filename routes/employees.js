var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var serverSettings = require('../server-settings');
var db = mongojs(serverSettings.getConnectionString(), ['employees'])

//GET
//api/employees
router.get('/employees', function (req, res, next) {
    db.employees.find(function (err, employees) {
        if (err) {
            res.send(err);
        }
        res.json(employees);
    });
});

//GET {id}
//api/employees/id
router.get('/employees/:id', function (req, res, next) {
    db.employees.findOne({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send(err);
        }
        res.json(employee);
    });
});

//POST
//api/employees
router.post('/employees', function (req, res, next) {
    var employee = req.body;
    // if (!employee.department) {
    //     res.status(400);
    //     res.json({
    //         "error": "Bad Data"
    //     });
    // }
    // else {
        employee.currentRoom = "Inget";
        employee.currentZone = "Hemma";
        employee.isHiding = false;
        db.employees.save(employee, function (err, employee) {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        })
    // }
});


//PUT {id}
//api/employees/id
router.put('/employees/:id', function (req, res, next) {
    var employee = req.body;
    var updemployee = {};

    if (employee.userName) {
        updemployee.userName = employee.userName;
    }

    if (employee.email) {
        updemployee.email = employee.email;
    }

    if (employee.firstName) {
        updemployee.firstName = employee.firstName;
    }

    if (employee.lastName) {
        updemployee.lastName = employee.lastName;
    }

    if (employee.department) {
        updemployee.department = employee.department;
    }

    if (employee.currentZone) {
        updemployee.currentZone = employee.currentZone;
    }

    if (employee.currentRoom) {
        updemployee.currentRoom = employee.currentRoom;
    }

    if (employee.isHiding) {
        updemployee.isHiding = employee.isHiding;
    }

    if (employee.isInBuilding) {
        updemployee.isInBuilding = employee.isInBuilding;
    }

    if (!updemployee) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    }

    else {
        db.employees.update({ _id: req.params.id }, updemployee, {}, function (err, employee) {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    }
});

module.exports = router;