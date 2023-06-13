import { APIGatewayProxyHandler } from "aws-lambda";
import {ChatApp} from "@chat-sst-app/core/database/schema";

export const main: APIGatewayProxyHandler = async (event) =>{
    const messagesFindResult = await ChatApp.entities.message.find({}).go();

    const response = {data: messagesFindResult.data}

    return { statusCode: 200, body: JSON.stringify(response) };
};