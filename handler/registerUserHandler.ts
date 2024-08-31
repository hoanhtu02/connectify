import { Server, Socket } from "socket.io";
import { Friend, FriendStatus, PrismaClient } from "@prisma/client";
import { SocketEvent } from "@/enums";
import { handlerFriendAccept, handlerFriendReject } from "@/handler/user/handlerFriend";

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

function registerUserHandler(server: Server, client: Socket) {
    client.on(USER_SEARCH_FRIEND, async (data) => {
        if (!data) return client.emit(SEARCH_FRIEND_RESULT, []);
        const result = await prisma.user.findMany({
            where: {
                email: {
                    equals: data,
                },
                id: {
                    not: client.user.id
                }

            },
            select: userSelect
        });
        client.emit(SEARCH_FRIEND_RESULT, result);
    });
    client.on(SEND_REQUEST_FRIEND, async (friendId) => {
        const { id } = client.user;
        if (!id || !friendId) return;
        const friend = await prisma.friend.create({
            data: {
                senderId: id,
                receiverId: friendId,
                status: FriendStatus.PENDING
            },
            include: {
                Receiver: {
                    select: userSelect
                },
                Sender: {
                    select: userSelect
                }
            }
        });
        client.emit(SEND_REQUEST_FRIEND, friend);
        server.to(`notification:room:${friendId}`).emit(RECEIVE_REQUEST_FRIEND, friend);
        return client
    })
    client.on(RESPONSE_REQUEST_FRIEND, async ({ isAccept, friend }: { isAccept: boolean; friend: Friend }) => {
        let conversation;
        if (isAccept) {
            conversation = await handlerFriendAccept(friend)
        }
        else conversation = await handlerFriendReject(friend)
        server.to(`notification:room:${friend.senderId}`).emit(RESPONSE_REQUEST_FRIEND, isAccept, friend, conversation);
        server.to(`notification:room:${friend.receiverId}`).emit(RESPONSE_REQUEST_FRIEND, isAccept, friend, conversation);

        return client
    })
}

export default registerUserHandler
