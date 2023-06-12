import {StackContext, StaticSite, use} from "sst/constructs";
import {WebsocketStack} from "./WebsocketStack";


const FrontendStack =  ({ stack }: StackContext) => {
    const {webSocketApi} = use(WebsocketStack);

    // Define our React app
    const site = new StaticSite(stack, "ReactSite", {
        path: "web",
        buildOutput: "dist",
        buildCommand: "yarn build",
        environment: {
            VITE_APP_WSS_URL: webSocketApi.customDomainUrl || webSocketApi.url,
        },
    });

    stack.addOutputs({
        SiteUrl: site.url
    });

}

export default FrontendStack;