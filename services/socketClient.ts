import { io } from 'socket.io-client';

class SocketClient {
    socket = io()
    connect() {
        return new Promise((resolve, reject) => {
            this.socket.on('connect', () => resolve(true));
            this.socket.on('connect_error', (error) => reject(error));
        });
    }

    disconnect() {
        return new Promise((resolve) => {
            this.socket?.disconnect();
            resolve(true);
        });
    }
}

export const socketClient = new SocketClient();
export const client = socketClient.socket;    