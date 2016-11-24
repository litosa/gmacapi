var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var serverSettings = require('../server-settings');
var db = mongojs(serverSettings.getConnectionString(), ['images'])

//GET {id}
//api/images/id
router.get('/images/:id', function (req, res, next) {
    db.images.findOne({ _id: req.params.id }, function (err, image) {
        if (err) {
            res.send(err);
        }
        res.json(image);
    });
});

module.exports = router;