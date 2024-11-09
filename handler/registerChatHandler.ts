
import { Server, Socket } from "socket.io";
import { SocketEvent } from "@/enums";
import { CreateChatMessage, Message, PrismaClient } from "@prisma/client";
import { logger } from "@/utils/logger";
const userSelect = {
    id: true,
    name: true,
    email: true,
    image: true
}
const { MESSAGE_LOAD, MESSAGE_RECEIVE, MESSAGE_SEND, MESSAGE_SUBMIT } = SocketEvent
const prisma = new PrismaClient();
const log = logger.child({ module: "MESSAGE" });
function registerChatHandler(_server: Server, client: Socket) {
    client.on(MESSAGE_LOAD, async (conversationId, total, page) => {
        try {
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
            log.info("Load message", { conversationId, total, page, messages })
            client.emit(MESSAGE_LOAD, conversationId, total, page, messages)

        } catch (error) {
            log.error("Load message error", error)
        }
    })
    client.on(MESSAGE_SUBMIT, async (message: CreateChatMessage) => {
        try {
            const {
                content,
                conversationId,
                senderId, } = message
            const newMessage = await prisma.message.create({
                data: {
                    content,
                    conversationId,
                    senderId,
                }
            })
            client.emit(MESSAGE_SUBMIT, newMessage)
        } catch (error) {
            console.error(error);
            log.error("Submit message error", error)
        }
    })
    client.on(MESSAGE_SEND, async (message: Message, to: string[]) => {
        try {
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
        } catch (error) {
            console.error(error);
            log.error("Send message error", error)
        }
    })
}

export default registerChatHandler