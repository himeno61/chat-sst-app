import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

import { APIGatewayProxyHandler } from "aws-lambda";
import {ChatApp} from "@chat-sst-app/core/database/schema";

export const main: APIGatewayProxyHandler = async (event) => {
    const connectionId = event.requestContext.connectionId;
    if(!connectionId){
        return {statusCode: 400, body:"Bad request" };
    }
    
    await ChatApp.entities.chatConnection.delete({id:connectionId });

    return { statusCode: 200, body: "Disconnected" };
};