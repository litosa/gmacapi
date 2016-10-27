var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var serverSettings = require('../server-settings');
var db = mongojs(serverSettings.getConnectionString(), ['rooms'])


//GET {id}
//api/rooms/id
router.get('/rooms/:id', function (req, res, next) {
    db.rooms.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, room) {
        if (err) {
            res.send(err);
        }
        res.json(room);
    });
});

module.exports = router;