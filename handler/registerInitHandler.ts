import { Server, Socket } from "socket.io";
import { SocketEvent } from "@/enums";
import { PrismaClient } from "@prisma/client";
const userSelect = {
    id: true,
    name: true,
    email: true,
    image: true
}
const prisma = new PrismaClient();

async function registerInitHandler(server: Server, client: Socket) {
    const [friends, requestsFromFriend] = await getFriends(client.user.id!);
    const conversations = await prisma.conversation.findMany({
        where: {
            userId: client.user.id
        },
        include: {
            Messages: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    User: {
                        select: userSelect
                    }
                },
                take: 10,
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })
    client.emit("initState", { friends, pendingAcceptFriends: requestsFromFriend.map(f => f.CurrentUser), conversations });
}

export default registerInitHandler

//#region init friends, pending accept friends and request friends
async function getFriends(userId: string) {
    return await prisma.$transaction([
        // get friends
        prisma.friend.findMany({
            where: {
                userId,
            },
            include: {
                Friend: {
                    select: userSelect
                },
            }
        }),
        // get pending accept friends
        prisma.friend.findMany({
            where: {
                friendId: userId,
                status: FriendStatus.PENDING
            },
            include: {
                CurrentUser: {
                    select: userSelect
                },
            }
        }),
    ])
}
// #endregion