
import { Server, Socket } from "socket.io";
import { SocketEvent } from "@/enums";
import { FriendStatus, PrismaClient } from "@prisma/client";
import { getManyByUserId } from "@/handler/chat/getConversation";
const userSelect = {
    id: true,
    name: true,
    email: true,
    image: true
}
const { INIT_STATE } = SocketEvent
const prisma = new PrismaClient();

async function registerChatHandler(server: Server, client: Socket) { }

export default registerChatHandler