
export interface WebsocketMessage {
    id: string
    userName: string,
    message: string
}

export function getParsedMessage(websocketMessage: WebsocketMessage):string{
    const data = {
        action: "sendmessage",
        data: JSON.stringify(websocketMessage)
    }
    return JSON.stringify(data);
}