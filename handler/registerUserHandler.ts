import { Server, Socket } from "socket.io";
import { FriendStatus, PrismaClient } from "@prisma/client";
import { SocketEvent } from "@/enums";

const {
    USER_SEARCH_FRIEND,
    SEARCH_FRIEND_RESULT,
    SEND_REQUEST_FRIEND,
    RECEIVE_REQUEST_FRIEND,
    RESPONSE_REQUEST_FRIEND
} = SocketEvent
const userSelect = {
    id: true,
    name: true,
    email: true,
    image: true
}
const prisma = new PrismaClient();

async function registerUserHandler(server: Server, client: Socket) {
    const [friends, requestsFromFriend] = await getFriends(client.user.id!);
    client.emit("initState", { friends, pendingAcceptFriends: requestsFromFriend.map(f => f.CurrentUser) });
    client.on(USER_SEARCH_FRIEND, async (data) => {
        if (!data) return client.emit(SEARCH_FRIEND_RESULT, []);
        // #region search friend
        const result = await prisma.user.findMany({
            where: {
                email: {
                    contains: data,
                },
                id: {
                    not: client.user.id
                }

            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true
            }
        });
        // #endregion
        client.emit(SEARCH_FRIEND_RESULT, result);
    });
    client.on(SEND_REQUEST_FRIEND, async (friendId) => {
        const { id } = client.user;
        if (!id || !friendId) return;
        const friend = await prisma.friend.create({
            data: {
                userId: id,
                friendId,
                status: FriendStatus.PENDING
            },
            include: {
                Friend: {
                    select: {
                        id: true,
                        image: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        server.to(`notification:room:${friendId}`).emit(RECEIVE_REQUEST_FRIEND, friend);
        return client
    })
    client.on(RESPONSE_REQUEST_FRIEND, async (isAccept, id) => {
        if (isAccept) await prisma.friend.update({
            where: {
                id
            },
            data: {
                status: FriendStatus.ACCEPTED
            },
        });
        else await prisma.friend.delete({ where: { id } })
        return client
    })
}

//#region init friends, pending accept friends and request friends
async function getFriends(userId: string) {
    return await prisma.$transaction([
        // get friends
        prisma.friend.findMany({
            where: {
                userId,
            },
            select: {
                Friend: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
                status: true,
            }
        }),
        // get pending accept friends
        prisma.friend.findMany({
            where: {
                friendId: userId,
                status: FriendStatus.PENDING
            },
            select: {
                CurrentUser: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        }),
    ])
}
// #endregion
export default registerUserHandler
