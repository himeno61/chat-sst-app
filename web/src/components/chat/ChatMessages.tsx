import { WebsocketMessage} from "@chat-sst-app/core/src/messages/message.ts";
import ChatMessage from "./ChatMessage.tsx";

interface ChatMessagesProps {
    messages: WebsocketMessage[]
    username: string
}

const ChatMessages = (props: ChatMessagesProps) => {
    const {messages,username} = props;

    return (
        <>
            <div className={"chat-messages-box"}>
                {messages.map((message) =>{
                    return (
                        <ChatMessage username={username} message={message}/>
                    );
                }

                )}
            </div>
        </>
    );
}

export default ChatMessages;