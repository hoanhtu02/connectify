
import { Server, Socket } from "socket.io";
import { SocketEvent } from "@/enums";
import { Message, PrismaClient } from "@prisma/client";
const userSelect = {
    id: true,
    name: true,
    email: true,
    image: true
}
const { MESSAGE_LOAD, MESSAGE_RECEIVE, MESSAGE_SEND } = SocketEvent
const prisma = new PrismaClient();

function registerChatHandler(_server: Server, client: Socket) {
    client.on(MESSAGE_LOAD, async (conversationId, total, page) => {
        const totalMessage = total || 10
        const pageMessage = page || 1
        const skip = totalMessage * pageMessage
        const messages = await prisma.message.findMany({
            where: {
                conversationId
            },
            include: {
                MessageAttachments: true,
                SenderMessage: {
                    select: userSelect
                }
            },
            take: totalMessage,
            skip,
        })
        // send back to client
        client.emit(MESSAGE_LOAD, conversationId, total, page, messages)
    })
    client.on(MESSAGE_SEND, async (message: Message, to: string[]) => {
        const newMessage = await prisma.message.findFirst({
            where: {
                id: message.id
            }
        })
        if (!newMessage) return;
        to.forEach((m) => {
            if (m === message.senderId) return;
            client.to(`notification:room:${m}`).emit(MESSAGE_RECEIVE, newMessage)
        })
        const updateStatus = await prisma.message.update({
            where: {
                id: newMessage.id
            },
            data: {
                status: "SENT"
            }
        })
        client.emit(MESSAGE_SEND, updateStatus)
    })
}

export default registerChatHandler