var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var serverSettings = require('../server-settings');
var db = mongojs(serverSettings.getConnectionString(), ['departments'])

//GET
//api/departments
router.get('/departments', function (req, res, next) {
    db.departments.find(function (err, departments) {
        if (err) {
            res.send(err);
        }
        res.json(departments);
    });
});

module.exports = router;