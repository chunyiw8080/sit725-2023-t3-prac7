const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let userCount = 0;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html', 'index.html'));
});

io.on('connection', (socket) => {
    userCount++;
    console.log('a user connected, current user count: ', userCount);

    socket.on('disconnect', () => {
        userCount--;
        console.log('user disconnected, current user count: ', userCount);
    });

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
