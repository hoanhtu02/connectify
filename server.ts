import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import registerUserHandler from "@/handler/registerUserHandler";
import { User } from "next-auth";
import registerInitHandler from "@/handler/registerInitHandler";
import registerChatHandler from "@/handler/registerChatHandler";
process.on("unhandledRejection", (err) => {
    console.error(err);
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.error(err);
    process.exit(1);
});
const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT ?? "3000");
const app = next({ dev, port });
const handler = app.getRequestHandler();
app.prepare().then(async () => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer);
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error("Authentication error"));
        }
        socket.user = token as User;
        next();
    });
    io.on("connection", async (socket) => {
        console.log("a user connected");
        socket.join(`notification:room:${socket.user.id}`);

        await registerInitHandler(io, socket);

        // friend (add, remove, block, unblock)
        registerUserHandler(io, socket);

        // chat 
        registerChatHandler(io, socket)
        socket.on("error", (error) => {
            console.error(error);
        });
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`);
        });
});
declare module "socket.io" {
    interface Socket {
        user: User;
    }
}