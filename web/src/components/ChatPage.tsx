import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const ChatPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = location.state.userName;
    const ws = new WebSocket("wss://ouk6ztr8i7.execute-api.us-east-1.amazonaws.com/lukasz");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!location.state || userName === "") {
            navigate("/");
        }

        ws.onmessage = (message) => {
            if (message.data) {
                const parsedData = JSON.parse(message.data)

                // setFooEvents(parsedData.cotton.price)
            }
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

    return (<>
        <button onClick={ disconnect }>Disconnect</button>
    </>);

};

export default ChatPage;