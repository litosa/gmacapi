var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var serverSettings = require('../server-settings');
var db = mongojs(serverSettings.getConnectionString(), ['beacons'])
var server = require('../server');

router.get('/beacons', (req, res, next) => {
    db.beacons.find(function (err, beacons) {
        if (err) {
            res.send(err);
        }
        res.json(beacons);
    });
});

//GET {id}
//api/beacons/id
router.get('/beacons/:id', function (req, res, next) {
    db.beacons.findOne({ _id: +req.params.id }, function (err, beacon) {
        if (err) {
            res.send(err);
        }
        res.json(beacon);
    });
});

//POST
//api/beacons
router.post('/beacons', function (req, res, next) {
    var beacon = req.body;
    db.beacons.save(beacon, function (err, beacon) {
        if (err) {
            res.send(err);
        }
        res.json(beacon);
    })
});

module.exports = router;