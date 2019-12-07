var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use("/styles",express.static(__dirname + "/styles")); // allows stylesheets
app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/index.html');
});

app.get('/game', function(req, res, next){
    res.sendFile(__dirname + '/game.html');
});

app.get('/scores', function(req, res, next){
    res.sendFile(__dirname + '/scores.html');
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

// server.listen(4200);
server.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});