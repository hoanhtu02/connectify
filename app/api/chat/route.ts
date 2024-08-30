import { NextRequest, NextResponse } from 'next/server';
import { Server } from 'socket.io';
let io: Server | null = null;
export async function GET(req: NextRequest, res: NextResponse) {
    if (!io) {
        io = new Server();
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log('New client connected', socket.id);

            socket.on('message', (data) => {
                console.log('Message received:', data);
                io.emit('message', data);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected', socket.id);
            });
        });

        console.log('Socket.IO server initialized');
    } else {
        console.log('Socket.IO server already running');
    }
    res.end();
}