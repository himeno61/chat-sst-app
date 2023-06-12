import { WebsocketMessage} from "@chat-sst-app/core/src/messages/message.ts";
import ChatMessage from "./ChatMessage.tsx";
import React, {useEffect} from "react";

interface ChatMessagesProps {
    messages: WebsocketMessage[]
    username: string
    lastMessageRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages = (props: ChatMessagesProps) => {
    const {messages,username,lastMessageRef} = props;

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
            <div ref={lastMessageRef} />
        </>
    );
}

export default ChatMessages;