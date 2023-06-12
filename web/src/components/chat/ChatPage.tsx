import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getParsedMessage, WebsocketMessage} from "@chat-sst-app/core/src/messages/message.ts";
import ChatMessages from "./ChatMessages.tsx";
import { v4 as uuidv4 } from "uuid";


const ChatPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = location.state.userName;
    const ws = new WebSocket(import.meta.env.VITE_APP_WSS_URL);
    const [messages, setMessages] = useState<WebsocketMessage[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!location.state || userName === "") {
            navigate("/");
        }

        ws.onopen = () =>{
            setIsConnected(true);
        };

        ws.onmessage = (message) => {
            if (message.data) {
                console.log(message.data);
                const websocketMessage = JSON.parse(message.data) as WebsocketMessage;
                setMessages([...messages,websocketMessage]);
            }
        }
        ws.onerror = ()=>{
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

    function sendData () {
        const message: WebsocketMessage = {
            id: uuidv4(),
            userName: userName,
            message: "witajce w najszej bajce"
        }
        ws.send(getParsedMessage(message));
    }

    if(!isConnected){
        return (<>
            <h1>Connecting</h1>
        </>);
    }else{
        return (<>
            <button onClick={ disconnect }>Disconnect</button>
            <button onClick={ sendData }>Send data</button>
            <ChatMessages messages={messages}/>
        </>);
    }
};

export default ChatPage;