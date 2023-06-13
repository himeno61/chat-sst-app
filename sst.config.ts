import { SSTConfig } from "sst";
import {WebsocketStack} from "./stacks/WebsocketStack";
import {StorageStack} from "./stacks/StorageStack";
import FrontendStack from "./stacks/FrontendStack";
import {MessagesApiStack} from "./stacks/MessagesApiStack";

export default {
  config(_input) {
    return {
      name: "chat-sst-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(WebsocketStack).stack(MessagesApiStack).stack(FrontendStack);
  }
} satisfies SSTConfig;
