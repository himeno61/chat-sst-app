import {Api, StackContext, use} from "sst/constructs";
import {StorageStack} from "./StorageStack";

export function MessagesApiStack({ stack }: StackContext){
    const { database } = use(StorageStack);


    const messagesApi = new Api(stack, "MessagesApi", {
        defaults: {
            function: {
                bind: [database]
            }
        },
        routes: {
            "GET /messages": "packages/functions/src/messages/list.main",
            "POST /messages": "packages/functions/src/messages/create.main",
        },
    });

    // Show the API endpoint in the output
    stack.addOutputs({
        MessagesApiEndpoint: messagesApi.url,
    });

    return {
        messagesApi
    }
}