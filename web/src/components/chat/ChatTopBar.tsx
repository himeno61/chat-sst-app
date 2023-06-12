interface ChatTopBarProps {
    username: string;
    disconnect: ()=>void;
}
const ChatTopBar = (props: ChatTopBarProps) =>{
    const {username,disconnect} = props;

    return (
        <div className={"chat-top-bar"}>
            <p style={{float: "left"}}>
                Welcome {username}
            </p>
            <button style={{float: "right"}} onClick={disconnect}>Disconnect</button>
        </div>
    );
};

export default ChatTopBar;