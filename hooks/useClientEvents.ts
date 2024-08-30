import { SocketEvent } from "@/types";
import { Socket } from "socket.io-client";
const { USER_RESULT_SEARCH_FRIEND } = SocketEvent
function useClientEvents() {
    return function (socket: Socket) {
        socket.on(USER_RESULT_SEARCH_FRIEND, (data) => {
            console.log(data);
        });
    }
}

export default useClientEvents
