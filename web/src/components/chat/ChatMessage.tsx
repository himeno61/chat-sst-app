import {WebsocketMessage} from "@chat-sst-app/core/src/messages/message.ts";

interface ChatMessageProps {
    username: string;
    message: WebsocketMessage
}

const ChatMessage = (props: ChatMessageProps) => {
    const {username, message} = props;

    const isOwnMessage = message.userName === username;

    return (
        <div id={message.id} className={"chat-message"}>
            <p>{isOwnMessage ? "You" : message.userName}</p>
            <p>{message.message}</p>
        </div>
    );
}

export default ChatMessage;