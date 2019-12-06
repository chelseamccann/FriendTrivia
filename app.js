var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use("/styles",express.static(__dirname + "/styles")); // allows stylesheet
app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client){ // listening for connections
    console.log('Client connected...'); // once a connection is received, it reports this message to the console

    client.on('join', function(data){ // waits for a message from the client for 'join' - then log it to the console
        console.log(data);
        // client.emit('messages', 'Hello from server'); // sends a message back to the client that just connect
    });

    client.on('messages', function(data){
        client.emit('broad', data);
        client.broadcast.emit('broad', data);
    });

});

server.listen(4200);