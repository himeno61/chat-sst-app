import { Service } from "electrodb";
import {Configuration} from "./dynamo";
import {Message} from "./entities/messages";
import {ChatConnection} from "./entities/chatConnection";


export const ChatApp = new Service(
    {
        message: Message,
        chatConnection: ChatConnection
    },
    Configuration
);
