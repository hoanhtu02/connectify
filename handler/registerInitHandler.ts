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

async function registerInitHandler(server: Server, client: Socket) {
    const [{ friends, friendRequestsReceived, friendRequestSenders }, conversations] = await Promise.all([
        getFriends(client.user.id!),
        getManyByUserId(client.user.id!)
    ])
    client.emit(INIT_STATE, { friends, friendRequestsReceived, friendRequestSenders, conversations });
}

export default registerInitHandler

//#region init friends, pending accept friends and request friends
async function getFriends(userId: string) {
    const allFriends = await prisma.friend.findMany({
        where: {
            OR: [
                {
                    senderId: userId
                },
                {
                    receiverId: userId
                }
            ],
        },
        include: {
            Receiver: {
                select: userSelect
            },
            Sender: {
                select: userSelect
            }
        }
    })
    const friends = allFriends.filter((f) => f.status === FriendStatus.ACCEPTED);
    const friendRequestsReceived = allFriends.filter((f) => f.status === FriendStatus.PENDING && f.receiverId === userId);
    const friendRequestSenders = allFriends.filter((f) => f.status === FriendStatus.PENDING && f.senderId === userId);
    return { friends, friendRequestsReceived, friendRequestSenders };
}
// #endregion