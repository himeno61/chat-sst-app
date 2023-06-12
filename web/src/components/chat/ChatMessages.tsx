import { WebsocketMessage} from "@chat-sst-app/core/src/messages/message.ts";

interface ChatMessagesProps {
    messages: WebsocketMessage[]
}

const ChatMessages = (props: ChatMessagesProps) => {
    const {messages} = props;
    return (
        <>
            <header>
                <p>Hangout with Colleagues</p>
            </header>

            <div>
                {messages.map((message) =>
                    <div id={message.id}>
                        <p>${message.userName}</p>
                        <div >
                            <p>{message.message}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ChatMessages;