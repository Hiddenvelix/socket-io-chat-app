import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);


app.use(express.static('../client'));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnect');
    });

    socket.on('chat message', (data) => {
        socket.broadcast.emit('chat message', data);
        console.log(data)
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});