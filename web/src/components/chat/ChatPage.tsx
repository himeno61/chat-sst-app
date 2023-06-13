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
    const ws = new WebSocket(wssApiUrl);
    const [messages, setMessages] = useState<WebsocketMessage[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const lastElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        return () => {
            if (ws.readyState === 1) {
                console.log("closing on exit");
                ws.close();
            }
        };
    }, []);

    useEffect(() => {
        console.log("state changed");
        if(ws.readyState === ws.CLOSED || ws.readyState === ws.CLOSING){
            ws.close();
            alert("Error with connection occured");
            navigate("/")
        }else if(ws.readyState ===ws.CONNECTING){
            setIsConnected(false);
        }
    }, [ws.readyState]);

    useEffect(() => {
        if (!location.state || username === "") {
            navigate("/");
        }


        ws.onopen = () => {
            console.log("opened");
            setIsConnected(true);
        };

        ws.onmessage = (message) => {
            if (message.data) {
                const websocketMessage = JSON.parse(message.data) as WebsocketMessage;
                console.log(`Received message: ${message.data}`);
                const findResult = messages.find(wsMessage => wsMessage.id === websocketMessage.id);
                const ids = messages.map(m => m.id);
                console.log(`ids of messages: ${ids}`)
                if (findResult) {
                    console.log(`Item with id: ${websocketMessage.id} already in the table`);
                    return;
                } else {
                    console.log("else");
                    setMessages(messages.concat([websocketMessage]));
                }
            }
        }
        ws.onerror = () => {
            console.log("error");
            alert("Error with connection occured");
            ws.close();
            navigate("/")
        }

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

    }, []);


    function disconnect() {
        console.log("disconnect button")
        ws.close();
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
        ws.send(getParsedMessage(websocketMessage));
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