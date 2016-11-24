var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var serverSettings = require('../server-settings');
var db = mongojs(serverSettings.getConnectionString(), ['employees'])
var server = require('../server');
var jwt = require('express-jwt');

var authCheck = jwt({
    secret: new Buffer(serverSettings.getSecret(), 'base64'),
    audience: serverSettings.getclientId()
});

//GET
//api/employees
// router.get('/employees', authCheck, (req, res, next) => {
//     db.employees.find(function (err, employees) {
//         if (err) {
//             res.send(err);
//         }
//         res.json(employees);
//     });
// });

router.get('/employees', (req, res, next) => {
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
    employee.isHiding = false;
    employee.favorites = [];
    employee.currentZoneId = null;
    employee.currentRoomId = null;

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
    var body = req.body;

    db.employees.findOne({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send(err);
        }

        if (body.firstName) {
            employee.firstName = body.firstName;
        }

        if (body.lastName) {
            employee.lastName = body.lastName;
        }

        if (body.departmentId) {
            employee.departmentId = body.departmentId;
        }

        if (body.imageUrl) {
            employee.imageUrl = body.imageUrl;
        }

        if (body.isHiding != undefined) {
            employee.isHiding = body.isHiding;

            if (employee.isHiding) {
                employee.currentZoneId = null;
                employee.currentRoomId = null;
            }
        }

        if (body.isInBuilding = false) {
            employee.currentZoneId = null;
            employee.currentRoomId = null;
        }

        if (body.currentZoneId && body.currentZoneId !== employee.currentZoneId) {
            if (employee.currentRoomId) {
                employee.currentRoomId = null;
            }
            if (!employee.isHiding) {
                employee.currentZoneId = body.currentZoneId;
            }
        }

        if (body.currentRoomId && body.currentRoomId !== employee.currentRoomId) {
            if (employee.currentZoneId) {
                employee.currentZoneId = null;
            }
            if (!employee.isHiding) {
                employee.currentRoomId = body.currentRoomId;
            }
            //Kolla om användaren har en aktuell bokning på rummet och checka in
        }

        if (body.favorites) {
            employee.favorites = body.favorites;
        }

        if (!body) {
            res.status(400);
            res.json({
                "error": "Bad Data"
            })
        }

        else {
            db.employees.update({ _id: req.params.id }, employee, {}, function (err, response) {
                if (err) {
                    res.send(err);
                }

                server.updateEmployee(employee);

                // res.json(response);
                res.json(employee);
            });
        }
    });
});

module.exports = router;