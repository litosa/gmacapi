var app = require('express')();
var port = process.env.PORT || 1337;

var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var employees = require('./routes/employees');
var zones = require('./routes/zones');
var rooms = require('./routes/rooms');
var departments = require('./routes/departments');

var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
    res.send('Hello Gmac!');
})

// app.listen(port);


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', employees);
app.use('/api', zones);
app.use('/api', rooms);
app.use('/api', departments);

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    exports.test = function () {
        console.log(io.emit('message', { type: 'new-message', text: 'hej' }));
        io.emit('message', { type: 'new-message', text: 'hej' });
    };

    socket.on('add-message', (message) => {
        io.emit('message', { type: 'new-message', text: message });
    });

    socket.on('edit-task', (task) => {
        console.log('här!?');
        io.emit('task', { type: 'edited-task', text: task.title });
    });
});

app.listen(port, () => {
    console.log('started on port ' + port);
});