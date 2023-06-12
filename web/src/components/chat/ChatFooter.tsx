import {useState} from "react";

interface ChatFooterProps {
    sendMessage: (message: string) => void
}

const ChatFooter = (props: ChatFooterProps) => {
    const {sendMessage} = props;
    const [message,setMessage] = useState<string|undefined>(undefined);
    return (
        <div className={"chat-footer"}>
            <input type="text"
                   minLength={6}
                   name="message"
                   id='message'
                   value={message}
                   onChange={e => setMessage(e.target.value)}
            />
            <button onClick={()=> {
                if(message && message.length>0) {
                    sendMessage(message);
                    setMessage(undefined);
                }
            }}>Send data</button>
        </div>
    );
};

export default ChatFooter;