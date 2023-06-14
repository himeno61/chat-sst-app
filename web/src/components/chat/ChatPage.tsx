import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getParsedMessage, WebsocketMessage} from "@chat-sst-app/core/src/messages/message.ts";
import ChatMessages from "./ChatMessages.tsx";
import {v4 as uuidv4} from "uuid";
import ChatTopBar from "./ChatTopBar.tsx";
import ChatFooter from "./ChatFooter.tsx";
import {messagesApiUrl, wssApiUrl} from "../../config.ts";
import {Message} from "@chat-sst-app/core/src/database/entities/messages.ts";

const ChatPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state.userName;
    const ws = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<WebsocketMessage[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const lastElementRef = useRef<HTMLDivElement>(null);


    function handleNewMessage(websocketMessage: WebsocketMessage) {
        console.log(`Received message: ${JSON.stringify(websocketMessage)}`);
        const findResult = messages.find(wsMessage => wsMessage.id === websocketMessage.id);
        const ids = messages.map(m => m.id);
        console.log(`ids of messages: ${ids}`)
        if (findResult) {
            console.log(`Item with id: ${websocketMessage.id} already in the table`);
            return;
        } else {
            console.log("else");
            setMessages([...messages, websocketMessage]);
        }
    };

    useEffect(() => {
        if (!location.state || username === "") {
            navigate("/");
        }

        ws.current = new WebSocket(wssApiUrl);

        fetch(messagesApiUrl)
            .then(response => response.text())
            .then((response) => {
                if (response) {
                    const loadedMessages = JSON.parse(response).data as Message[];
                    const parsedMessages = loadedMessages.map(m => {
                        return ({
                            id: m.id,
                            userName: m.senderId,
                            message: m.message
                        });
                    });
                    const diff = parsedMessages.filter(parsedMessage => !messages.some(websocketMessage => {
                        return parsedMessage.id === websocketMessage.id
                    }))
                    setMessages(parsedMessages.concat(diff));
                }
            })
            .catch(err => console.log(err))

        const wsCurrent = ws.current;

        return () => {
            if (wsCurrent?.readyState === 1)
                wsCurrent?.close();
        };
    }, []);

    useEffect(()=>{
        if(!ws.current) return;

        ws.current.onopen = () => {
            console.log("opened");
            setIsConnected(true);
        };

        ws.current.onclose = () => {
            console.log("ws closed");
        }

        ws.current.onmessage = (message) => {
            if (message.data) {
                const websocketMessage = JSON.parse(message.data) as WebsocketMessage;
                handleNewMessage(websocketMessage);
            }
        }
        ws.current.onerror = (e) => {
            console.log("error");
            console.log(e);
        }
    },[ws,messages]);

    function disconnect() {
        console.log("disconnect button")
        ws.current?.close();
        navigate("/");
    }

    function sendData(message: string) {
        const websocketMessage: WebsocketMessage = {
            id: uuidv4(),
            userName: username,
            message: message
        }
        console.log(`message before being send: ${JSON.stringify(websocketMessage)}`);
        setMessages(messages.concat([websocketMessage]));
        ws.current?.send(getParsedMessage(websocketMessage));
    }

    if (!isConnected) {
        return (<>
            <h1>Connecting</h1>
        </>);
    } else {
        return (
            <div className="chat">
                <ChatTopBar username={username} disconnect={disconnect}/>
                <ChatMessages messages={messages} username={username} lastMessageRef={lastElementRef}/>
                <ChatFooter sendMessage={sendData}/>
            </div>);
    }
};

export default ChatPage;