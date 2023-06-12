import {Api, StackContext, use} from "sst/constructs";
import {StorageStack} from "./StorageStack";

export function MessagesApiStack({ stack }: StackContext){
    const { database } = use(StorageStack);


    const api = new Api(stack, "MessagesApi", {
        defaults: {
            function: {
                bind: [database]
            }
        },
        routes: {
            "GET /messages": "packages/functions/src/messages/list.handler",
            "POST /notes": "packages/functions/src/messages/create.handler",
        },
    });

    // Show the API endpoint in the output
    stack.addOutputs({
        MessagesApiEndpoint: api.url,
    });
}