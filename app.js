let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
const PORT = process.env.PORT || 3000; // port listening for heroku

app.use("/styles",express.static(__dirname + "/styles")); // allows stylesheets
app.use("/javascript",express.static(__dirname + "/javascript")); // allows stylesheets
app.use(express.static(__dirname + '/node_modules'));

// Splash endpoint
app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/index.html');
});

// Play game endpoint
app.get('/game', function(req, res, next){
    res.sendFile(__dirname + '/game.html');
});

// High score endpoint
app.get('/scores', function(req, res, next){
    res.sendFile(__dirname + '/scores.html');
});

// Game over endpoint
app.get('/end', function(req, res, next){
    res.sendFile(__dirname + '/end.html');
});

// listening for connections
io.on('connection', function(client){ 
    // once a connection is received, it reports this message to the console
    console.log('Client connected...'); 

    // waits for a message from the client for 'join' - then log it to the console
    client.on('join', function(data){ 
        console.log(data);
        // sends a message back to the client that just connect
        client.emit('messages', 'Hello from server'); 
    });

    client.on('messages', function(data){
        client.emit('broad', data);
        client.broadcast.emit('broad', data);
    });

});


server.listen(PORT, function(){
    console.log(`listening on ${PORT}`)
});