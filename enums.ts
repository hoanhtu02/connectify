export enum SocketEvent {
    INIT_STATE = "init-state",
    USER_SEARCH_FRIEND = "user:search-friends",
    SEARCH_FRIEND_RESULT = "user:search-friends-result",
    SEND_REQUEST_FRIEND = "user:send-request-friend",
    RECEIVE_REQUEST_FRIEND = "user:receive_request_friend",
    REMOVE_FRIEND = "user:remove-friend",
    RESPONSE_REQUEST_FRIEND = "user:response-request-friend",
    MESSAGE_LOAD = "chat:message-load"
} 