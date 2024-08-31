import { Friend, FriendStatus, PrismaClient } from "@prisma/client"
import { getOneByUserId } from "@/handler/chat/getConversation"
const prisma = new PrismaClient()
export async function handlerFriendAccept(friend: Friend) {
    const [_, createdConversation] = await prisma.$transaction([
        prisma.friend.update({
            where: {
                id: friend.id
            },
            data: {
                status: FriendStatus.ACCEPTED
            },
        }),
        prisma.conversation.create({
            data: {
                creatorId: friend.senderId,
            },
        })
    ])
    await prisma.participant.createMany({
        data: [
            {
                userId: friend.senderId,
                conversationId: createdConversation.id
            },
            {
                userId: friend.receiverId,
                conversationId: createdConversation.id
            }
        ]
    })
    const conversation = await getOneByUserId(friend.senderId)
    return conversation
}
export async function handlerFriendReject(friend: Friend) {
    const conversation = await getOneByUserId(friend.senderId)
    await prisma.$transaction([
        prisma.friend.deleteMany({ where: { id: friend.id } }),
        // prisma.conversation.deleteMany({ where: { id: conversation?.id } }),
        // prisma.participant.deleteMany({ where: { conversationId: conversation?.id } }),
    ])
    return conversation
}