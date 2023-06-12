import {  ApiGatewayManagementApi } from "aws-sdk";


import { APIGatewayProxyHandler } from "aws-lambda";
import {ChatApp} from "@chat-sst-app/core/database/schema";
import {ChatConnection} from "@chat-sst-app/core/database/entities/chatConnection";

export const main: APIGatewayProxyHandler = async (event) => {
    const messageData = JSON.parse(event.body).data;
    const { stage, domainName } = event.requestContext;

    // Get all the connections
    const chatConnections = await ChatApp.entities.chatConnection.find({}).go();

    const apiGateway = new ApiGatewayManagementApi({
        endpoint: `${domainName}/${stage}`,
    });
    console.log(`data: ${messageData}`);

    ChatApp.entities.message.create({});


    const postToConnection = async function (connection: ChatConnection) {
        try {
            // Send the message to the given client
            await apiGateway
                .postToConnection({ ConnectionId: connection.id, Data: messageData })
                .promise();
        } catch (e: any) {
            if (e.statusCode === 410) {
                // Remove stale connections
                await ChatApp.entities.chatConnection.delete({id:connection.id });
            }
        }
    };

    if(chatConnections.data){
        await Promise.all(chatConnections.data.map(postToConnection));
    }

    return { statusCode: 200, body: "Message sent" };
};