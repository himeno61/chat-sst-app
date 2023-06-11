import {StackContext, use, WebSocketApi} from "sst/constructs";
import {StorageStack} from "./StorageStack";

export function WebsocketStack({ stack }: StackContext) {
    const { database } = use(StorageStack);

    // Create the WebSocket API
    const webSocketApi = new WebSocketApi(stack, "WebsocketApi", {
        defaults: {
            function: {
                bind: [database],
            },
        },
        routes: {
            $connect: "packages/functions/src/connect.main",
            $disconnect: "packages/functions/src/disconnect.main",
            sendmessage: "packages/functions/src/sendMessage.main",
        },

    });

    // Show the API endpoint in the output
    stack.addOutputs({
        WebsocketApiEndpoint: webSocketApi.url,
    });
}