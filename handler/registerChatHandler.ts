
import { Server, Socket } from "socket.io";
import { SocketEvent } from "@/enums";
import { PrismaClient } from "@prisma/client";
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
                Attachments: true,
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
    client.on(MESSAGE_SEND, async (conversationId, messageType, content, attachment: File | null) => {
        // if (attachment){
        //     await prisma.attachment.create({
        //         data: {
        //             thumbUrl
        //         }
        //     })
        // }
    })
    client.on(MESSAGE_RECEIVE, async (message) => {
        // if (attachment){
        //     await prisma.attachment.create({
        //         data: {
        //             thumbUrl
        //         }
        //     })
        // }
    })
}

export default registerChatHandler