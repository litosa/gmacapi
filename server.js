var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var employees = require('./routes/employees');
var zones = require('./routes/zones');
var rooms = require('./routes/rooms');
var departments = require('./routes/departments');
var beacons = require('./routes/beacons');
var images = require('./routes/images');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 1337;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', employees);
app.use('/api', zones);
app.use('/api', rooms);
app.use('/api', departments);
app.use('/api', beacons);
app.use('/api', images);

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    exports.updateEmployee = function (employee) {
        io.emit('update-employee', employee);
    };
});

http.listen(port, () => {
    console.log('started on port ' + port);
});