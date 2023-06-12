import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getParsedMessage, WebsocketMessage} from "@chat-sst-app/core/src/messages/message.ts";
import ChatMessages from "./ChatMessages.tsx";
import {v4 as uuidv4} from "uuid";
import ChatTopBar from "./ChatTopBar.tsx";
import ChatFooter from "./ChatFooter.tsx";


const ChatPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state.userName;
    const ws = new WebSocket(import.meta.env.VITE_APP_WSS_URL);
    const [messages, setMessages] = useState<WebsocketMessage[]>([]);
    const [isConnected, setIsConnected] = useState(false);

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
                console.log(message.data);
                const websocketMessage = JSON.parse(message.data) as WebsocketMessage;
                if (!messages.find(message => message.id === websocketMessage.id)) {
                    setMessages([...messages, websocketMessage]);
                }
            }
        }
        ws.onerror = () => {
            console.log("error");
            alert("Error with connection occured");
            navigate("/")
        }
        return () => {
            if (ws.readyState === 1) {
                ws.close();
            }
        };
    }, []);


    function disconnect() {
        ws.close();
        navigate("/");
    }

    function sendData(message: string) {
        const websocketMessage: WebsocketMessage = {
            id: uuidv4(),
            userName: username,
            message: message
        }
        ws.send(getParsedMessage(websocketMessage));
        setMessages([...messages, websocketMessage]);
    }

    if (!isConnected) {
        return (<>
            <h1>Connecting</h1>
        </>);
    } else {
        return (
            <div className="chat">
                <ChatTopBar username={username} disconnect={disconnect}/>
                <ChatMessages messages={messages}/>
                <ChatFooter sendMessage={sendData}/>
            </div>);
    }
};

export default ChatPage;