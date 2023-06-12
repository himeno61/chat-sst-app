import { APIGatewayProxyHandler } from "aws-lambda";
import {ChatApp} from "@chat-sst-app/core/database/schema";
import { v4 as uuidv4 } from "uuid";


export const main: APIGatewayProxyHandler = async (event) =>{
    if(!event.body){
        return { statusCode: 400, body: "Bad request" };
    }
    const messageData = JSON.parse(event.body);


    const messagesCreateResult = await ChatApp.entities.message.create({
        id: uuidv4(),
        senderId: messageData.username,
        message: messageData.message
    }).go();

    console.log(`New message was created: ${JSON.stringify(messagesCreateResult.data)}`);
    return { statusCode: 200, body: JSON.stringify(messagesCreateResult.data) };
};