import { WebsocketMessage} from "@chat-sst-app/core/src/messages/message.ts";

interface ChatMessagesProps {
    messages: WebsocketMessage[]
}

const ChatMessages = (props: ChatMessagesProps) => {
    const {messages} = props;
    return (
        <>
            <div className={"chat-messages-box"}>
                {messages.map((message) =>
                    <div id={message.id} className={"chat-message"}>
                        <p>{message.userName}</p>
                        <p>{message.message}</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default ChatMessages;