import {StackContext, StaticSite, use} from "sst/constructs";
import {WebsocketStack} from "./WebsocketStack";
import {MessagesApiStack} from "./MessagesApiStack";


const FrontendStack =  ({ stack }: StackContext) => {
    const {webSocketApi} = use(WebsocketStack);
    const {messagesApi} = use(MessagesApiStack);

    // Define our React app
    const site = new StaticSite(stack, "ReactSite", {
        path: "web",
        buildOutput: "dist",
        buildCommand: "yarn build",
        environment: {
            VITE_APP_WSS_URL: webSocketApi.customDomainUrl || webSocketApi.url,
            VITE_APP_API_URL: messagesApi.customDomainUrl || messagesApi.url,
        },
    });

    stack.addOutputs({
        SiteUrl: site.url || site.customDomainUrl
    });

}

export default FrontendStack;