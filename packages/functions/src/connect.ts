import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

import { APIGatewayProxyHandler } from "aws-lambda";
import {ChatApp} from "@chat-sst-app/core/database/schema";

export const main: APIGatewayProxyHandler = async (event) => {
    const connectionId = event.requestContext.connectionId;
    console.log(`Connection id: ${event.requestContext.connectionId}`);
    if(!connectionId){
        return {statusCode: 400, body:"Bad request" };
    }
    const chatConnection = await ChatApp.entities.chatConnection.create({
        id: connectionId
    })
        .go();

    return { statusCode: 200, body: JSON.stringify(chatConnection.data) };
};