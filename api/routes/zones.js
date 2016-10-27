var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var serverSettings = require('../server-settings');
var db = mongojs(serverSettings.getConnectionString(), ['zones'])

//GET
//api/zones
router.get('/zones', function (req, res, next) {
    db.zones.find(function (err, zones) {
        if (err) {
            res.send(err);
        }
        res.json(zones);
    });
});

//GET {id}
//api/zones/id
router.get('/zones/:id', function (req, res, next) {
    db.zones.findOne({ _id: req.params.id }, function (err, zone) {
        if (err) {
            res.send(err);
        }
        res.json(zone);
    });
});

module.exports = router;